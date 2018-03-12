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

    let list = [];

    result.forEach((element) => {
        const product = {
            'cat': element['C_CATEGORIA']['_text'],
            'descr': element['C_DESCRI']['_text'],
            'imgUri': 'data:' + element['C_IMAGE_TYPE']['_text'] + ';base64,' + element['N_BYTEARRAY_IMAGE']['_text'],
            'idProd': element['N_ID']['_text'],
            'idCat': element['N_ID_CAT']['_text'],
            'price': element['N_IMPORTO']['_text'],
            'points': element['N_PUNTI']['_text']
        }

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