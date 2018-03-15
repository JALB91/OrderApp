import React, { Component } from 'react';
import {
    Platform,
    Text,
    View
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Loading from '../../components/Loading/Loading';
import Login from '../../components/Login/Login';
import Button from '../../components/Button/Button';
import Utils from '../../utils/utils';
import styles from './styles';
const server = require('../../config/server');


export default class HomeScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            'ready': false,
            'logged': false
        };

        setTimeout(() => {
            this.setState({'ready': true});
        }, 1000);
    }

    getTitle() {
        return (
            <Text style = {{ fontSize: 30, margin: 50 }}>Home Screen</Text>
        )
    }

    getButton(name) {
        return (
            <Button
                style = {styles.button}
                onPress = {() => this.props.navigation.navigate(name)} 
                title = {'Go to ' + name} 
                titleStyle = {{ fontSize: 18 }}
            />
        )
    }

    login(username, password) {
        this.setState({'ready': false});
        server.login(username, password).then(result => {
            console.log(result);
            this.setState({logged: result ? true : false});
            this.setState({ready: true});
        });
    }
  
    render() {
        return (
            <View style = {{ flex: 2, alignItems: 'center', justifyContent: 'center', padding: 10 }}>
                { Utils.renderif(!this.state['ready'], <Loading />) }
                { Utils.renderif(this.state['ready'] && !this.state['logged'], <Login onLogin={this.login.bind(this)} />) }
                { Utils.renderif(this.state.logged, this.getButton('Products')) }
            </View>
        );
    }
}