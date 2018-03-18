import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class OrdersScreen extends Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = ({navigation}) => {
        const params = navigation.state.params || {};

        return {
            title: 'Orders',
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
        );
    }
}