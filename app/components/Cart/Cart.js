import React, { Component } from 'react';
import {
    View,
    Text,
    Image
} from 'react-native';
import Button from '../Button';
import cart from '../../models/cart';
import utils from '../../utils';
import { EventRegister as Event } from 'react-native-event-listeners'

export default class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            total: cart.getTotal()
        }
    }

    componentWillUnmount() {
        if (this.listener) {
            Event.removeEventListener(this.listener);
            this.listener = null;
        }
    }

    componentDidMount() {
        if (!this.listener) {
            this.listener = Event.addEventListener('cartUpdate', this.onCartUpdate.bind(this));
        }
    }
    
    onCartUpdate() {
        this.setState({total: cart.getTotal()});
    }

    getBadge() {
        return (
            <View style={{width: 10, height: 10, borderRadius: 5, backgroundColor: 'red', alignContent: 'center', alignItems: 'center'}}>
                <Text style={{ fontWeight: 'bold', fontSize: 8, color: 'white' }}>
                    { this.state.total }
                </Text>
            </View>
        )
    }

    render() {
        return (
            <View style={{ flex: 1, padding: 15, alignItems: 'center', alignContent: 'center' }}>
                { utils.renderif(this.state.total > 0, this.getBadge()) }
                <Button
                imgUri={require('../../../assets/cart.png')}
                imgStyle={{ width: 25, height: 25 }}
                onPress={this.props.onPress}
                />
            </View>
        )
    }
}