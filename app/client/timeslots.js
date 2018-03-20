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
            if (result instanceof Array) {
                result.forEach(value1 => {
                    const found = this.data.find(value2 => value1.isEqual(value2));
                    if (!found) {
                        this.data.push(value1);
                    } else {
                        found.validUntil = value1.validUntil;
                    }
                })
            }
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

    getActiveTimeslot() {
        for (let i = this.data.length - 1; i >= 0; i--) {
            if (ts.now() > this.data[i].validUntil || this.data.validUntil - ts.now() > 60*10 + 10) {
                this.data.splice(i, 1);
            }
        }
        return this.data;
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

        this.validUntil = ts.now() + 60*10;
    }

    isEqual(timeslot) {
        const keys = ['start_h', 'start_m', 'end_h', 'end_m'];
        keys.forEach(key => {
            if (!timeslot.hasOwnProperty(key) || timeslot[key] !== this[key]) {
                return false;
            }
            return true;
        })
    }
}

export default new timeslots;