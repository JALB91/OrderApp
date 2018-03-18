import React, { Component } from 'react';
import {
    View,
    Text,
    Image
} from 'react-native';
import Button from '../Button';
import cart from '../../client/cart';
import utils from '../../utils';

export default class Cart extends Component {
    constructor(props) {
        super(props);
        cart.updateCart = this.onCartUpdate.bind(this);
        this.state = {
            total: cart.getTotal()
        }
    }

    componentWillUnmount() {
        cart.updateCart = null;
    }

    onCartUpdate() {
        this.setState({total: cart.getTotal()});
    }

    getBadge() {
        return (
            <View style={{width: 10, height: 10, borderRadius: 5, backgroundColor: 'red', alignContent: 'center', alignItems: 'center'}}>
                <Text style={{ fontWeight: 'bold', fontSize: 8, color: 'white' }}>
                    { cart.getTotal() }
                </Text>
            </View>
        )
    }

    render() {
        return (
            <View style={{ flex: 1, padding: 25, alignItems: 'center', alignContent: 'center' }}>
                { utils.renderif(cart.getTotal() > 0, this.getBadge()) }
                <Button
                imgUri={require('../../../assets/cart.png')}
                imgStyle={{ width: 25, height: 25 }}
                onPress={this.props.onPress}
                />
            </View>
        )
    }
}