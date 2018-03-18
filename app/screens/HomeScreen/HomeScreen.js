import React, { Component } from 'react';
import {
    Platform,
    Text,
    View
} from 'react-native';
import Cart from '../../components/Cart';
import Loading from '../../components/Loading';
import Login from '../../components/Login';
import Button from '../../components/Button';
import utils from '../../utils';
import * as server from '../../config/server';
import user from '../../client/user';
import styles from './styles';


export default class HomeScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ready: false,
            logged: false
        };
    }

    static navigationOptions = ({navigation}) => {
        const params = navigation.state.params || {};

        return {
            title: 'Home',
            headerRight: (
                utils.renderif(params.enableCart, <Cart onPress={params.goToCart} />)
            )
        }
    }

    componentWillMount() {
        this.props.navigation.setParams({
            goToCart: this.goToCart.bind(this),
            enableCart: (this.state.logged && this.state.ready)
        });
    }

    componentDidMount() {
        user.init().then(result => {
            this.setState({ready: true, logged: result});
            this.props.navigation.setParams({
                enableCart: (this.state.logged && this.state.ready)
            });
        }, reason => {
            this.setState({ready: true, logged: false});
        });
    }

    goToCart() {
        this.props.navigation.navigate('Cart');
    }

    login(username, password) {
        this.setState({'ready': false});
        server.login(username, password).then(result => {
            this.setState({logged: result ? true : false});
            this.setState({ready: true});
            user.setUserData(username, password);
            user.setUserID(logged);
            this.props.navigation.setParams({
                enableCart: (this.state.logged && this.state.ready)
            });
        });
    }

    getButton(name) {
        return (
            <Button
            style = {styles.button}
            onPress = {() => this.props.navigation.navigate(name)} 
            text = {name} 
            textStyle = {{ fontSize: 18 }}
            />
        )
    }
  
    render() {
        return (
            <View style = {{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 10 }}>
                { utils.renderif(!this.state.ready, <Loading />) }
                { utils.renderif(this.state.ready && !this.state.logged, <Login onLogin={this.login.bind(this)} />) }
                { utils.renderif(this.state.logged, this.getButton('Products')) }
                { utils.renderif(this.state.logged, this.getButton('Menus')) }
                { utils.renderif(this.state.logged, this.getButton('Orders')) }
                { utils.renderif(this.state.logged, this.getButton('Account')) }
            </View>
        );
    }
}