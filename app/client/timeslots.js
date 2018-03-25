import user from './user';
import * as server from '../config/server';
const ts = require('unix-timestamp');
ts.round = true;

class timeslots {
    constructor() {
        this.data = [];
        this.timeout = null;
    }

    async updateTimeSlots() {
        if (!user.isLoggedIn()) {
            return;
        }

        await server.getTimeSlotsListByAccount(user.user_id)
        .then(result => {
            this.data = result;
        })
        .catch(reason => {
            console.log(reason);
            this.data = [];
        });

        this.timeout = setTimeout(this.updateTimeSlots.bind(this), 60000);
    }

    stopUpdate() {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
    }
}

export class timeslot {
    constructor(xml) {
        const prototype = {
            'start_h': 'N_START_H',
            'start_m': 'N_START_M',
            'end_h': 'N_END_H',
            'end_m': 'N_END_M',
            'descr': 'C_DESCRIZIONE'
        };

        Object.keys(prototype).forEach(key => {
            if (xml.hasOwnProperty(prototype[key]) && xml[prototype[key]].hasOwnProperty('_text')) {
                this[key] = xml[prototype[key]]['_text'];
            }
        });
    }
}

export default new timeslots;