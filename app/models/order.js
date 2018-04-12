import product from './product';
import selection from './selection';

export default class order {
    constructor(xml) {
        const prototype = {
            'id': 'C_ID_ORDINE',
            'descr': 'C_FASCIA_ORARIA_DESCRI',
            'price': 'N_IMPORTO_TOTALE_ORDINE'
        };

        Object.keys(prototype).forEach(key => {
            if (xml.hasOwnProperty(prototype[key]) && xml[prototype[key]].hasOwnProperty('_text')) {
                this[key] = xml[prototype[key]]['_text'];
            }
        });

        this.products = [];

        if (xml.hasOwnProperty('lista_prodotti_ordinati') && xml['lista_prodotti_ordinati'].hasOwnProperty('Prodotto')) {
            if (xml['lista_prodotti_ordinati']['Prodotto'] instanceof Array) {
                xml['lista_prodotti_ordinati']['Prodotto'].forEach(element => {
                    this.products.push(new product(element));
                });
            } else {
                this.products.push(new product(xml['lista_prodotti_ordinati']['Prodotto']));
            }
        }

        this.selections = [];

        if (xml.hasOwnProperty('lista_menu_ordinati') && xml['lista_menu_ordinati'].hasOwnProperty('Menu')) {
            if (xml['lista_menu_ordinati']['Menu'] instanceof Array) {
                xml['lista_menu_ordinati']['Menu'].forEach(element => {
                    const selected = [];
                    element['lista_menu_prod'].forEach(prod => {
                        selected.push(new product(prod.prod));
                    });
                    this.selections.push(new selection({xml: element}, selected));
                });
            } else {
                const selected = [];
                xml['lista_menu_ordinati']['Menu']['lista_menu_prod'].forEach(prod => 
                    selected.push(new product(prod.prod))
                );
                this.selections.push(new selection({xml: xml['lista_menu_ordinati']['Menu']['lista_menu_prod']}, selected));
            }
        }
    }
}