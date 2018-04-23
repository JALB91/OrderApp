let currID = 0;

export default class ordProduct {
    constructor(xml) {
        const prototype = {
            'date': 'C_DATA',
            'timeslot': 'C_FASCIA_ORARIA_DESCRI',
            'id': 'N_ID_PRODOTTO',
            'descr': 'C_DESCRIZIONE_PRODOTTO',
            'num': 'N_QTA',
            'checked': 'B_CHECKED'
        };

        Object.keys(prototype).forEach(key => {
            if (xml.hasOwnProperty(prototype[key]) && xml[prototype[key]].hasOwnProperty('_text')) {
                this[key] = xml[prototype[key]]['_text'];
            }
        });

        this['key'] = (++currID).toString();
    }
}