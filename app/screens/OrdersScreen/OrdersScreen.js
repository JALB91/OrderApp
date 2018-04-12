import React, { Component } from 'react';
import {
    Text,
    View,
    FlatList
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Order from '../../components/Order';
import user from '../../models/user';
import * as api from '../../utils/api';
import styles from './styles';

export default class OrdersScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            data: []
        }
    }

    componentDidMount() {
        this.fetchOrdersList();
    }

    static navigationOptions = ({navigation}) => {
        const params = navigation.state.params || {};

        return {
            title: 'Orders'
        }
    }

    fetchOrdersList() {
        api.getLastOrdersList(user.user_id)
        .then(result => {
            this.updateOrdersList(result);
            this.setState({loading: false});
        })
        .catch(reason => {
            console.warn(reason);
            this.setState({loading: false});
        });
    }

    updateOrdersList(orders) {
        this.setState({data: orders});
    }

    renderOrder(order) {
        return (
            <View style={styles.orderContainer}>
                <Order order={order} />
            </View>
        )
    }

    render() {
        return (
            <View style={styles.view}>
                <FlatList
                data={this.state.data}
                keyExtractor={(item, index) => `OrdSc_${item.id}`}
                refreshing={this.state.loading}
                onRefresh={this.fetchOrdersList.bind(this)}
                renderItem={({item}) => this.renderOrder(item)}
                />
            </View>
        );
    }
}