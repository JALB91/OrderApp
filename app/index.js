import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import HomeScreen from './screens/HomeScreen';
import ProductsScreen from './screens/ProductsScreen';
import MenusScreen from './screens/MenusScreen';
import OrdersScreen from './screens/OrdersScreen';
import AccountScreen from './screens/AccountScreen';
import CartScreen from './screens/CartScreen';

const Navigator = StackNavigator({
    Home: HomeScreen,
    Products: ProductsScreen,
    Menus: MenusScreen,
    Orders: OrdersScreen,
    Account: AccountScreen,
    Cart: CartScreen
}, {
    navigationOptions: {
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        }
    }
});

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <Navigator />;
    }
}
