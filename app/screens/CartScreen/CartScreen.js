import React, { Component } from 'react';
import {
    Platform,
    Text,
    View,
    SectionList,
    Modal,
    FlatList
} from 'react-native';
import Loading from '../../components/Loading';
import Button from '../../components/Button';
import Order from '../../components/Order';
import user from '../../client/user';
import cart from '../../client/cart';
import utils from '../../utils';
import * as server from '../../config/server';
import styles from './styles';
import timeslots from '../../client/timeslots';


export default class CartScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            productsData: [],
            menusData: [],
            pickTimeslot: false,
            timeslot: 0,
            loading: false
        }

        const productsQuantity = cart.productsQuantity;
        const products = cart.products;

        const menusQuantity = cart.menusQuantity;
        const menus = cart.menus;

        menus.forEach(menu => {
            if (cart.getQuantityForMenuId(menu.id) > 0) {
                this.state.menusData.push(menu);
            }
        });

        products.forEach(product => {
            if (cart.getQuantityForProductId(product.id) > 0) {
                this.state.productsData.push(product);
            }
        });
    }

    static navigationOptions = ({navigation}) => {
        const params = navigation.state.params || {};

        return {
            title: 'Cart'
        }
    }

    order() {
        this.setState({ loading: true });
        const products = [];
        const menus = [];
        this.state.productsData.forEach(product => {
            products.push({ 'N_ID_PRODOTTO': product.id, 'N_QTA': cart.getQuantityForProductId(product.id) });
        });
        cart.menus.forEach(menu => {
            
        });
        server.putOrder(user.user_id, timeslots.data[this.state.timeslot], products, menus)
        .then(result => {
            cart.removeAll();
            this.setState({ loading: false, productsData: [], menusData: [] });
        })
        .catch(reason => {
            this.setState({ loading: false });
        });
    }

    renderItem(item) {
        return (
            <Button
                style={{ flex: 1 }}
                onPress={() => this.setState({ pickTimeslot: false, timeslot: timeslots.data.indexOf(item) })}
            >
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
                    {item.descr}
                </Text>
            </Button>
        );
    }

    getTimeslotsPicker() {
        return (
            <Modal visible={this.state.pickTimeslot} onRequestClose={()=>this.setState({pickTimeslot: false})}>
                <View style={{ flex: 1, padding: 25, justifyContent: 'center', alignContent: 'center' }}>
                    <FlatList
                        data={timeslots.data}
                        renderItem={({ item }) => this.renderItem(item)}
                        keyExtractor={(item, index) => item.descr}
                    />
                </View>
            </Modal>
        )
    }

    getOrderButton() {
        return (
            <View style={{flex: 1}}>
                <Button
                text='Order'
                onPress={this.order.bind(this)}
                />
            </View>
        )
    }

    render() {
        return (
            <View style={{flex: 1}}>
                {utils.renderif(this.state.loading, <Loading />)}
                <Order order={{products: this.state.productsData, menus: this.state.menusData, descr: timeslots.data[this.state.timeslot].descr}} />
                {utils.renderif(this.state.productsData.length || this.state.menusData.length, <Button onPress={()=>this.setState({pickTimeslot: true})} text='Timeslots' />)}
                {this.getTimeslotsPicker()}
                {utils.renderif(this.state.productsData.length || this.state.menusData.length, this.getOrderButton())}
            </View>
        );
    }
}