/*
    Products structure
    <N_ID_PRODOTTO>int</N_ID_PRODOTTO>
    <C_CATEGORIA>string</C_CATEGORIA>
    <B_IS_NOVITA>boolean</B_IS_NOVITA>
    <C_DESCRIZIONE_NOVITA>string</C_DESCRIZIONE_NOVITA>
    <C_DESCRIZIONE_PRODOTTO>string</C_DESCRIZIONE_PRODOTTO>
    <N_IMPORTO>double</N_IMPORTO>
    <N_PUNTI>int</N_PUNTI>
    <N_BYTEARRAY_IMAGE>base64Binary</N_BYTEARRAY_IMAGE>
    <C_IMAGE_TYPE>string</C_IMAGE_TYPE>
    <C_NOTE>string</C_NOTE>
*/


import React from 'react';
const convert = require('xml-js');
const config = require('./config');

function getHeadersForRequestType(requestType) {
    let headers = new Headers();
    headers.append('Host', 'www.lcpro.it');
    headers.append('Content-Type', 'text/xml; charset=utf-8');
    headers.append('SOAPAction', 'http://lcpro.it/' + requestType);
    return headers;
}

function getBodyForRequestType(requestType, params = null) {
    const body = {
        "_declaration": {
            "_attributes": {
                "version": "1.0",
                "encoding": "utf-8"
            }
        },
        "soap:Envelope": {
            "_attributes": {
                "xmlns:xsi":  "http://www.w3.org/2001/XMLSchema-instance",
                "xmlns:xsd":  "http://www.w3.org/2001/XMLSchema",
                "xmlns:soap": "http://schemas.xmlsoap.org/soap/envelope/",
            },
            "soap:Body": {
                [requestType]: {
                    "_attributes": {
                        "xmlns": "http://lcpro.it/"
                    },
                    "c_token": {
                        "_text": config.TOKEN
                    }
                }
            }
        }
    };

    if (params) {
        for (const key in params) {
            if (params.hasOwnProperty(key)) {
                body['soap:Envelope']['soap:Body'][requestType][key] = params[key];
            }
        }
    }

    return body;
}

async function call(headers, body) {
    try {
        let result = await fetch(config.API_URL, {
            method: 'POST',
            headers: headers,
            body: body
        });

        result = JSON.parse(convert.xml2json(result._bodyText, {compact: true, spaces: 4, nativeType: true}));

        return result;

    } catch (error) {
        console.error(error);
    }
}

async function getList(itemName, params = null) {
    const requestType = 'get_lista_' + itemName;

    let headers = getHeadersForRequestType(requestType);
    const body = getBodyForRequestType(requestType, params);

    const options = {ignoreComment: true, spaces: 4, compact: true};
    const xmlBody = convert.js2xml(body, options);

    headers.append('Content-Length', xmlBody.length);

    return await call(headers, xmlBody);
}

export async function login(username, password) {
    const requestType = 'login';

    let headers = getHeadersForRequestType(requestType);
    const body = getBodyForRequestType(requestType, { username, password });

    const options = {ignoreComment: true, spaces: 4, compact: true};
    const xmlBody = convert.js2xml(body, options);

    headers.append('Content-Length', xmlBody.length);

    try {
        const result = await call(headers, xmlBody);
        return result['soap:Envelope']['soap:Body']['loginResponse']['loginResult']['_text'];
    }
    catch(e) {
        console.log(e);
        return 0;
    }
}

export async function putOrder(order) {
    const requestType = 'put_ordine';

    let headers = getHeadersForRequestType(requestType);
    const body = getBodyForRequestType(requestType, order);

    const options = {ignoreComment: true, spaces: 4, compact: true};
    const xmlBody = convert.js2xml(body, options);

    headers.append('Content-Length', xmlBody.length);

    const result = await call(headers, xmlBody);
}

export async function getCategoriesList() {
    let result = await getList('categorie');
    result = result['soap:Envelope']['soap:Body']['get_lista_categorieResponse']['get_lista_categorieResult']['Categorie'];

    let list = [];

    result.forEach((element) => {
        const product = {
            'cat': element['C_DESCRI']['_text'],
            'idCat': element['N_ID']['_text']
        }

        list.push(product);
    });

    return list;
}

export async function getProductsList() {
    let result = await getList('prodotti');
    result = result['soap:Envelope']['soap:Body']['get_lista_prodottiResponse']['get_lista_prodottiResult']['Prodotti'];

    const prototype = {
        'id': 'N_ID_PRODOTTO',
        'cat': 'C_CATEGORIA',
        'isNew': 'B_IS_NOVITA',
        'newsDescr': 'C_DESCRIZIONE_NOVITA',
        'descr': 'C_DESCRIZIONE_PRODOTTO',
        'price': 'N_IMPORTO',
        'image': 'N_BYTEARRAY_IMAGE',
        'imageType': 'C_IMAGE_TYPE',
        'notes': 'C_NOTE'
    };
    let list = [];

    result.forEach((element) => {
        const product = {
            getImageUri: function() {
                if (this.hasOwnProperty('image') && this.hasOwnProperty('imageType')) {
                    return 'data:' + this['imageType'] + ';base64,' + this['image'];
                }
                return '';
            }
        };
        
        Object.keys(prototype).forEach(key => {
            if (element.hasOwnProperty(prototype[key]) && element[prototype[key]].hasOwnProperty('_text')) {
                product[key] = element[prototype[key]]['_text'];
            }
        });

        list.push(product);
    });

    return list;
}

export async function getTimeSlotsList() {
    let result = await getList('fasce_orarie');
    result = result['soap:Envelope']['soap:Body']['get_lista_fasce_orarieResponse']['get_lista_fasce_orarieResult'];

    let list = [];

    result.forEach((element) => {
        const product = {
            'cat': element['C_DESCRI']['_text'],
            'idCat': element['N_ID']['_text']
        }

        list.push(product);
    });

    return list;
}

export async function getNewsList() {
    let result = await getList('novita');
    result = result['soap:Envelope']['soap:Body']['get_lista_novitaResponse']['get_lista_novitaResult'];

    let list = [];

    if (result.constructor !== Array) return list;

    result.forEach((element) => {
        const product = {
            'idProd': element['prod']['N_ID']['_text'],
        }

        list.push(product);
    });

    return list;
}

export async function getProductsListByCat(category) {
    return await getList('prodotti_bycat', {'n_id_categoria': category});
}

export async function getSuggestedProductsList(orders) {
    let ordersList;

    orders.foreach((value) => {
        ordersList.append({ 'int': value });
    });

    return await getList('prodotti_suggeriti', { 'lista_id_prodotti_acquistati': ordersList });
}