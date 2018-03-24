import React, { Component } from 'react';
import {
    Platform,
    Text,
    View,
    SectionList
} from 'react-native';
import Button from '../../components/Button';
import Order from '../../components/Order';
import user from '../../client/user';
import cart from '../../client/cart';
import styles from './styles';
import utils from '../../utils';


export default class CartScreen extends Component {
    constructor(props) {
        super(props);

        const productsQuantity = cart.productsQuantity;
        const products = cart.products;
        this.productsData = [];

        const menusQuantity = cart.menusQuantity;
        const menus = cart.menus;
        this.menusData = [];

        menus.forEach(menu => {
            if (cart.getQuantityForMenuID(menu.id) > 0) {
                this.menusData.push(menu);
            }
        });

        products.forEach(product => {
            if (cart.getQuantityForProductID(product.id) > 0) {
                this.productsData.push(product);
            }
        });
    }

    static navigationOptions = ({navigation}) => {
        const params = navigation.state.params || {};

        return {
            title: 'Cart'
        }
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Order products={this.productsData} menus={this.menusData} />
            </View>
        );
    }
}