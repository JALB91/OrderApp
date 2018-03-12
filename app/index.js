import { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import ProductsScreen from './screens/ProductsScreen/ProductsScreen';
import OrdersScreen from './screens/OrdersScreen/OrdersScreen';

const Navigator = StackNavigator({
    Home: HomeScreen,
    Products: ProductsScreen,
    Orders: OrdersScreen
}
);

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <Navigator />;
    }
}
