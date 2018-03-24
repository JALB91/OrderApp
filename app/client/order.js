import product from './product';
import menu from './menu';

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
            xml.lista_prodotti_ordinati.Prodotto.forEach(element => {
                this.products.push(new product(element));
            });
        }

        this.menus = [];

        if (xml.hasOwnProperty('lista_menu_ordinati') && xml['lista_menu_ordinati'].hasOwnProperty('Menu')) {
            xml.lista_menu_ordinati.Menu.forEach(element => {
                this.menus.push(new menu(element));
            });
        }
    }
}