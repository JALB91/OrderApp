import { AsyncStorage } from 'react-native';
import * as server from '../config/server';

class user {
    constructor() {
        this.username = '';
        this.user_id = 0;
    }

    async fetchData() {
        try {
            await AsyncStorage.multiGet(['username', 'user_id'])
            .then(ret => {
                this.username = ret[0][1] || '';
                this.user_id = parseInt(ret[1][1]) || 0;
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
}

export default new user;