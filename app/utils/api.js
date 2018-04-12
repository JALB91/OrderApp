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


import config from '../config';
import category from '../models/category';
import product from '../models/product';
import menu from '../models/menu';
import { timeslot } from '../models/timeslots';
import order from '../models/order';
const convert = require('xml-js');

function getHeadersForRequestType(requestType) {
    const headers = new Headers();
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

    const headers = getHeadersForRequestType(requestType);
    const body = getBodyForRequestType(requestType, params);

    const options = {ignoreComment: true, spaces: 4, compact: true};
    const xmlBody = convert.js2xml(body, options);

    headers.append('Content-Length', xmlBody.length);

    return await call(headers, xmlBody);
}

export async function login(username, password) {
    const requestType = 'login';

    const headers = getHeadersForRequestType(requestType);
    const body = getBodyForRequestType(requestType, { username, password });

    const options = {ignoreComment: true, spaces: 4, compact: true};
    const xmlBody = convert.js2xml(body, options);

    headers.append('Content-Length', xmlBody.length);

    try {
        const result = await call(headers, xmlBody);
        return result['soap:Envelope']['soap:Body']['loginResponse']['loginResult']['N_ID']['_text'];
    } catch(e) {
        console.warn(e);
        return 0;
    }
}

export async function changePassword(user_id, username, oldPassword, newPassword) {
    const requestType = 'change_user_password';

    const headers = getHeadersForRequestType(requestType);
    const body = getBodyForRequestType(requestType, {'n_id_account': user_id, 'username': username, 'old_password': oldPassword, 'new_password': newPassword});

    const options = {ignoreComment: true, spaces: 4, compact: true};
    const xmlBody = convert.js2xml(body, options);

    headers.append('Content-Length', xmlBody.length);

    try {
        const result = await call(headers, xmlBody);
        return result['soap:Envelope']['soap:Body']['faultstring']['_text'] || '';
    } catch (e) {
        console.warn(e);
        return false;
    }
}

export async function putOrder(user_id, ts_descr, products = null, menus = null) {
    const requestType = 'put_ordine';

    const params = {
        'n_id_account': user_id,
        'c_fascia_oraria_descri': ts_descr
    };

    if (products.length) {
        const productsData = [];
        products.forEach(product => 
            productsData.push(product)
        );
        params['lista_prodotti_selezionati']= {'Prodotto_selezionato': productsData};
    }
    if (menus.length) {
        const menusData = [];
        menus.forEach(menu => 
            menusData.push(menu)
        );
        params['lista_menu_selezionati'] = {'Menu_selezionato': menusData};
    }

    const headers = getHeadersForRequestType(requestType);
    const body = getBodyForRequestType(requestType, params);

    const options = {ignoreComment: true, spaces: 4, compact: true};
    const xmlBody = convert.js2xml(body, options);

    headers.append('Content-Length', xmlBody.length);

    const res = await call(headers, xmlBody);
}

export async function getCategoriesList() {
    let result = await getList('categorie');
    result = result['soap:Envelope']['soap:Body']['get_lista_categorieResponse']['get_lista_categorieResult']['Categoria_prodotti'];

    const list = [];

    result.forEach(element => {
        list.push(new category(element));
    });

    return list;
}

export async function getProductsList() {
    let result = await getList('prodotti');
    result = result['soap:Envelope']['soap:Body']['get_lista_prodottiResponse']['get_lista_prodottiResult']['Prodotto'];

    const list = [];

    result.forEach(element => {
        list.push(new product(element));
    });

    return list;
}

export async function getMenusList() {
    let result = await getList('menu');
    result = result['soap:Envelope']['soap:Body']['get_lista_menuResponse']['get_lista_menuResult']['Menu'];

    const list = [];

    result.forEach((element) => {
        list.push(new menu(element));
    });

    return list;
}

export async function getTimeSlotsListByAccount(user_id) {
    let result = await getList('fasce_orarie_by_account', { n_id_account: user_id });
    result = result['soap:Envelope']['soap:Body']['get_lista_fasce_orarie_by_accountResponse']['get_lista_fasce_orarie_by_accountResult']['FasciaOraria'];

    const list = [];

    if (result instanceof Array) {
        result.forEach(element => {
            list.push(new timeslot(element));
        });
    } else {
        list.push(new timeslot(result));
    }

    return list;
}

export async function getNewsList() {
    let result = await getList('novita');
    result = result['soap:Envelope']['soap:Body']['get_lista_novitaResponse']['get_lista_novitaResult'];

    const list = [];

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

export async function getLastOrdersList(user_id) {
    let result = await getList('ultimi_ordini', { n_id_account: user_id });
    result = result['soap:Envelope']['soap:Body']['get_lista_ultimi_ordiniResponse']['get_lista_ultimi_ordiniResult']['Ultimo_ordine'];

    const list = [];

    if (result instanceof Array) {
        result.forEach(element => {
            list.push(new order(element));
        });
    }

    return list;
}

export async function getSuggestedProductsList(orders) {
    const ordersList = [];

    orders.foreach((value) => {
        ordersList.append({ 'int': value });
    });

    return await getList('prodotti_suggeriti', { 'lista_id_prodotti_acquistati': ordersList });
}