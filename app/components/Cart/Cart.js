import React, { Component } from 'react';
import {
    View,
    Text,
    Image
} from 'react-native';
import { EventRegister as Event } from 'react-native-event-listeners'
import Button from '../Button';
import cart from '../../models/cart';
import utils from '../../utils';
import styles from './styles';

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
            <View style={styles.badgeView}>
                <Text style={styles.badgeText}>
                    { this.state.total }
                </Text>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.view}>
                { this.getBadge() }
                <Button
                imgUri={require('../../../assets/cart.png')}
                imgStyle={styles.cartImage}
                style={styles.cartButton}
                onPress={this.props.onPress}
                />
            </View>
        )
    }
}