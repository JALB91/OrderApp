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
            <View style={{flex: 1, alignContent: 'center', padding: 5, margin: 5, borderWidth: 5, borderRadius: 5, borderColor: 'rgba(0,0,0,1.0)'}}>
                <Order order={order} />
            </View>
        )
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <FlatList
                data={this.state.data}
                keyExtractor={(item, index) => item.id}
                refreshing={this.state.loading}
                onRefresh={this.fetchOrdersList.bind(this)}
                renderItem={({item}) => this.renderOrder(item)}
                />
            </View>
        );
    }
}