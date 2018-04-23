import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import HomeScreen from './screens/HomeScreen';
import AdminScreen from './screens/AdminScreen';
import ProductsScreen from './screens/ProductsScreen';
import MenusScreen from './screens/MenusScreen';
import OrdersScreen from './screens/OrdersScreen';
import AccountScreen from './screens/AccountScreen';
import CartScreen from './screens/CartScreen';
import SelectionScreen from './screens/SelectionScreen';
import styles from './styles';

const Navigator = StackNavigator({
    Home: HomeScreen,
    Admin: AdminScreen,
    Products: ProductsScreen,
    Menus: MenusScreen,
    Orders: OrdersScreen,
    Account: AccountScreen,
    Cart: CartScreen,
    Selection: SelectionScreen
}, {
    navigationOptions: {
        headerStyle: {
          backgroundColor: styles.secondaryColor,
        },
        headerTintColor: styles.textsColor,
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
