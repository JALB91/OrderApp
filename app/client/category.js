export default class category {
    constructor(xml) {
        const prototype = {
            'id': 'N_ID',
            'cat': 'C_DESCRI'
        }

        Object.keys(prototype).forEach(key => {
            if (xml.hasOwnProperty(prototype[key]) && xml[prototype[key]].hasOwnProperty('_text')) {
                this[key] = xml[prototype[key]]['_text'];
            }
        });
    }
}