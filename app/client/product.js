export default class product {
    constructor(xml) {
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

        Object.keys(prototype).forEach(key => {
            if (xml.hasOwnProperty(prototype[key]) && xml[prototype[key]].hasOwnProperty('_text')) {
                this[key] = xml[prototype[key]]['_text'];
            }
        });
    }

    getImageUri() {
        if (this.image && this.imageType) {
            return `data: ${this.imageType};base64,${this.image}`;
        }
        return '';
    }
}