import { AsyncStorage } from 'react-native';

class User {
    constructor() {
        this.username = AsyncStorage.getItem('username').then(result => { return result; }, () => { return ''; });
        this.password = AsyncStorage.getItem('password').then(result => { return result; }, () => { return ''; });
        this.user_id = AsyncStorage.getItem('user_id').then(result => { return result; }, () => { return 0; });
    }

    isLoggedIn() {
        return this.user_id > 0;
    }

    setUserID(user_id) {
        AsyncStorage.setItem('user_id', user_id);
        this.user_id = user_id;
    }

    setUsername(username) {
        AsyncStorage.setItem('username', username);
        this.username = username;
    }

    setPassword(password) {
        AsyncStorage.setItem('password', password);
        this.password = password;
    }

    async getUserID() {
        return this.user_id;
    }

    async getUsername() {
        return await AsyncStorage.getItem('username');
    }

    async getPassword() {
        return await AsyncStorage.getItem('password');
    }
}

export default new User;