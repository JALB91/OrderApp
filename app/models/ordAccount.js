import ordProduct from "./ordProduct";

let currID = 0;

export default class ordAccount {
    constructor(xml) {
        const prototype = {
            'id_acc': 'N_ID_ACCOUNT',
            'username': 'C_USERNAME',
            'price': 'N_IMPORTO_DOVUTO',
            'id_ord': 'C_ID_ORDINE',
            'date': 'C_DATA',
            'timeslot': 'C_FASCIA_ORARIA_DESCRI',
            'checked': 'B_CHECKED'
        };

        Object.keys(prototype).forEach(key => {
            if (xml.hasOwnProperty(prototype[key]) && xml[prototype[key]].hasOwnProperty('_text')) {
                this[key] = xml[prototype[key]]['_text'];
            }
        });

        this.ordProducts = [];
        
        if (xml.hasOwnProperty('lista_prodotti_ordinati') && xml['lista_prodotti_ordinati'].hasOwnProperty('Prodotto_ordinato')) {
            if (xml['lista_prodotti_ordinati']['Prodotto_ordinato'] instanceof Array) {
                xml['lista_prodotti_ordinati']['Prodotto_ordinato'].forEach(ordProd => this['ordProducts'].push(new ordProduct(ordProd)));
            } else {
                this['ordProducts'].push(new ordProduct(xml['lista_prodotti_ordinati']['Prodotto_ordinato']));
            }
        }

        this['key'] = (++currID).toString();
    }
}