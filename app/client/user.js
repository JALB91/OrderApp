import { AsyncStorage } from 'react-native';
import * as server from '../config/server';

class user {
    constructor() {
        this.username = '';
        this.user_id = 0;
        this.fav_prod = [];
    }

    async fetchData() {
        try {
            await AsyncStorage.multiGet(['username', 'user_id', 'fav_prod'])
            .then(ret => {
                this.username = ret[0][1] || '';
                this.user_id = parseInt(ret[1][1]) || 0;
                this.fav_prod = JSON.parse(ret[2][1] || '[]');
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

    setUserData(username, user_id) {
        AsyncStorage.setItem('username', username)
        .catch(err => {
            console.warn('Error saving: ' + err);
        });
        AsyncStorage.setItem('user_id', user_id.toString())
        .catch(err => {
            console.warn('Error saving: ' + err);
        });
        this.username = username;
        this.user_id = user_id;
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