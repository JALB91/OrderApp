import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Cart from '../../components/Cart';
import utils from '../../utils';
import styles from './styles';

export default class AccountScreen extends Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = ({navigation}) => {
        const params = navigation.state.params || {};

        return {
            title: 'Account',
            headerRight: (
                <Cart onPress={params.goToCart} />
            )
        }
    }

    componentWillMount() {
        this.props.navigation.setParams({
            goToCart: this.goToCart.bind(this)
        });
    }

    goToCart() {
        this.props.navigation.navigate('Cart');
    }

    render() {
        return (
            <View>
            </View>
        )
    }
}