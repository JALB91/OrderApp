import React from 'react';
var convert = require('xml-js');

const API_URL = 'https://www.lcpro.it/lcpro/appl/mybar_01/web_services/ws1.asmx';
const TOKEN = 'eT.dfaR34lkfdopiAswriozx:dsjhkj.\\39878\\deoiuoi';

function getHeadersForRequestType(requestType) {
    var headers = new Headers();
    headers.append('Host', 'www.lcpro.it');
    headers.append('Content-Type', 'text/xml; charset=utf-8');
    headers.append('SOAPAction', 'http://lcpro.it/' + requestType);
    return headers;
}

function getBodyForRequestType(requestType, params = null) {
    var body = {
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
                        "_text": TOKEN
                    }
                }
            }
        }
    };

    if (params) {
        for (var key in params) {
            if (params.hasOwnProperty(key)) {
                body['soap:Envelope']['soap:Body'][requestType][key] = params[key];
            }
        }
    }

    return body;
}

async function call(headers, body) {
    try {
        var result = await fetch(API_URL, {
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
    var requestType = 'get_lista_' + itemName;

    var headers = getHeadersForRequestType(requestType);
    var body = getBodyForRequestType(requestType, params);

    var options = {ignoreComment: true, spaces: 4, compact: true};
    var xmlBody = convert.js2xml(body, options);

    headers.append('Content-Length', xmlBody.length);

    return await call(headers, xmlBody);
}

export async function putOrder(order) {
    var requestType = 'put_ordine';

    var headers = getHeadersForRequestType(requestType);
    var body = getBodyForRequestType(requestType, order);

    var options = {ignoreComment: true, spaces: 4, compact: true};
    var xmlBody = convert.js2xml(body, options);

    headers.append('Content-Length', xmlBody.length);

    var result = await call(headers, xmlBody);
}

export async function getCategoriesList() {
    var result = await getList('categorie');
    result = result['soap:Envelope']['soap:Body']['get_lista_categorieResponse']['get_lista_categorieResult']['Categorie'];

    var list = [];

    result.forEach((element) => {
        var product = {
            'cat': element['C_DESCRI']['_text'],
            'idCat': element['N_ID']['_text']
        }

        list.push(product);
    });

    return list;
}

export async function getProductsList() {
    var result = await getList('prodotti');
    result = result['soap:Envelope']['soap:Body']['get_lista_prodottiResponse']['get_lista_prodottiResult']['Prodotti'];

    var list = [];

    result.forEach((element) => {
        var product = {
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
    var result = await getList('fasce_orarie');
    result = result['soap:Envelope']['soap:Body']['get_lista_fasce_orarieResponse']['get_lista_fasce_orarieResult'];

    console.log(result);

    var list = [];

    result.forEach((element) => {
        var product = {
            'cat': element['C_DESCRI']['_text'],
            'idCat': element['N_ID']['_text']
        }

        list.push(product);
    });

    return list;
}

export async function getNewsList() {
    var result = await getList('novita');
    result = result['soap:Envelope']['soap:Body']['get_lista_novitaResponse']['get_lista_novitaResult'];

    var list = [];

    if (result.constructor !== Array) return list;

    result.forEach((element) => {
        var product = {
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
    var ordersList;

    orders.foreach((value) => {
        ordersList.append({ 'int': value });
    });

    return await getList('prodotti_suggeriti', { 'lista_id_prodotti_acquistati': ordersList });
}