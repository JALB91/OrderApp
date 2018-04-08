import React, { Component } from 'react';
import {
    Platform,
    Text,
    View,
    FlatList,
    Image
} from 'react-native';
import Menu from '../../components/Menu';
import Button from '../../components/Button';
import Cart from '../../components/Cart';
import styles from './styles';
import utils from '../../utils';
import cart from '../../models/cart';
import * as api from '../../utils/api';

export default class MenusScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            refreshing: true,
            menus: []
        };
    }

    static navigationOptions = ({navigation}) => {
        const params = navigation.state.params || {};

        return {
            title: 'Menus',
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

    componentDidMount() {
        this.focusListener = this.props.navigation.addListener('willFocus', payload => {
            this.forceUpdate();
        });
        this.fetchMenusList();
    }

    componentWillUnmount() {
        if (this.focusListener) {
            this.focusListener.remove();
        }
    }

    goToCart() {
        this.props.navigation.navigate('Cart');
    }

    fetchMenusList() {
        this.setState({refreshing: true});

        api.getMenusList()
        .then(result => {
            this.updateMenusList(result);
        })
        .catch(reason => {
            console.warn(reason);
        });
    }

    updateMenusList(menus) {
        cart.menus = menus;
        menus.forEach(menu => {
            this.state.menus.push(menu);
        });
        this.setState({menus: this.state.menus, refreshing: false});
    }

    getTitle() {
        return (
            <View style={styles.titleContainer}>
                <Text style={styles.title}>
                    Menus
                </Text>
            </View>
        );
    }

    render() {
        return (
            <View style={styles.view}>
                { this.getTitle() }
                <FlatList
                onRefresh={this.fetchMenusList.bind(this)}
                refreshing={this.state.refreshing}
                data={this.state.menus}
                renderItem= {({item}) => 
                    <Menu 
                    menu={item}
                    selections={cart.selections.filter(sel => sel.menu.id === item.id)}
                    />
                }
                keyExtractor={(item, index) => item.descr}
                />
            </View>
        );
    }
}