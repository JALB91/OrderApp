import { AsyncStorage } from 'react-native';
const server = require('../config/server');

class User {
    constructor() {
        this.username = '';
        this.password = '';
        this.user_id = 0;
    }

    async fetchData() {
        try {
            await AsyncStorage.multiGet(['username', 'password']).then(ret => {
                this.username = ret[0][1] || '';
                this.password = ret[1][1] || '';
            }).catch(err => {
                console.warn(err.message);
            });
        } catch (error) {
            console.warn(error);
        }
    }

    async init() {
        await this.fetchData();
        await server.login(this.username, this.password).then(result => {
            this.user_id = result || 0;
        }, function(reason) {
            console.warn(reason);
        });

        return this.isLoggedIn();
    }

    isLoggedIn() {
        return this.user_id > 0;
    }

    setUserID(user_id = 0) {
        this.user_id = user_id;
    }

    setUserData(username, password) {
        AsyncStorage.setItem('username', username).catch(err => {
            console.warn('Error saving: ' + err);
        });
        AsyncStorage.setItem('password', password).catch(err => {
            console.warn('Error saving: ' + err);
        });
        this.username = username;
        this.password = password;
    }
}

export default new User;