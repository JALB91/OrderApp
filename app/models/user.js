import { AsyncStorage } from 'react-native';
import cart from './cart';
import * as api from '../utils/api';

class user {
    constructor() {
        this.username = '';
        this.user_id = 0;
        this.fav_prod = [];
        this.admin = false;
    }

    async login(username, password) {
        if (!username || !password) {
            return false;
        }

        await api.login(username, password)
        .then(result => {
            if (result.hasOwnProperty('C_USERNAME') && result['C_USERNAME'].hasOwnProperty('_text') &&
                result.hasOwnProperty('C_PASSWORD') && result['C_PASSWORD'].hasOwnProperty('_text') &&
                result['C_USERNAME']['_text'] === username && result['C_PASSWORD']['_text'] === password) {
                    this.username = result['C_USERNAME']['_text'];
            } else {
                return;
            }

            if (result.hasOwnProperty('N_ID') && result['N_ID'].hasOwnProperty('_text')) {
                this.user_id = parseInt(result['N_ID']['_text']);
            } else {
                return;
            }

            if (result.hasOwnProperty('B_ENABLE_MENU_GESTIONE_ORDINI') && result['B_ENABLE_MENU_GESTIONE_ORDINI'].hasOwnProperty('_text')) {
                this.admin = result['B_ENABLE_MENU_GESTIONE_ORDINI']['_text'] === 'true';
            } else {
                return;
            }
        })
        .catch(reason => {
            console.warn(reason);
        });

        await this.setUserData(this.username, this.user_id, [], this.admin);

        return this.isLoggedIn();
    }

    logout() {
        this.setUserData('', 0, [], false);
        cart.removeAll();
    }

    async fetchData() {
        try {
            await AsyncStorage.multiGet(['username', 'user_id', 'fav_prod', 'admin'])
            .then(ret => {
                this.username = ret[0][1] || '';
                this.user_id = parseInt(ret[1][1]) || 0;
                this.fav_prod = JSON.parse(ret[2][1] || '[]');
                this.admin = ret[3][1] === 'true';
            }).catch(err => {
                console.warn(err.message);
            });
        } catch (error) {
            console.warn(error);
        }
    }

    async init() {
        await this.fetchData();
        return this.isLoggedIn();
    }

    isLoggedIn() {
        return this.user_id > 0;
    }

    isAdmin() {
        return this.isLoggedIn() && this.admin;
    }

    async setUserData(username, user_id, fav_prod, admin) {
        const data = [['username', username], ['user_id', user_id.toString()], ['fav_prod', JSON.stringify(fav_prod)], ['admin', admin.toString()]];
        await AsyncStorage.multiSet(data)
        .catch(reason => {
            console.warn(reason);
        });
        this.username = username;
        this.user_id = user_id;
        this.admin = admin;
    }

    isProductFavourite(product_id) {
        return this.fav_prod.indexOf(product_id) >= 0;
    }

    addFavouriteProduct(product_id) {
        if (!this.isProductFavourite(product_id)) {
            this.fav_prod.push(product_id);

            AsyncStorage.setItem('fav_prod', JSON.stringify(this.fav_prod))
            .catch(err => {
                console.warn(err);
            });
        }
    }

    removeFavouriteProduct(product_id) {
        if (this.isProductFavourite(product_id)) {
            this.fav_prod.splice(this.fav_prod.indexOf(product_id), 1);

            AsyncStorage.setItem('fav_prod', JSON.stringify(this.fav_prod))
            .catch(err => {
                console.warn(err);
            });
        }
    }
}

export default new user;