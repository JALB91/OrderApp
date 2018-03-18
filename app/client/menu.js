import Product from './product';

export default class menu {
    constructor(xml) {
        const prototype = {
            'id': 'N_ID_MENU',
            'descr': 'C_DESCRIZIONE',
            'price': 'N_IMPORTO',
            'image': 'N_BYTEARRAY_IMAGE',
            'imageType': 'C_IMAGE_TYPE'
        };

        Object.keys(prototype).forEach(key => {
            if (xml.hasOwnProperty(prototype[key]) && xml[prototype[key]].hasOwnProperty('_text')) {
                this[key] = xml[prototype[key]]['_text'];
            }
        });

        this.products = [];

        if (xml.hasOwnProperty('lista_menu_prod')) {
            xml.lista_menu_prod.MenuProd.forEach(element => {
                this.products.push(new Product(element.prod));
            });
        }
    }

    getImageUri() {
        if (this.image && this.imageType) {
            return `data: ${this.imageType};base64,${this.image}`;
        }
        return '';
    }
}