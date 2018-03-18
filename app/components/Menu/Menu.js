import React, { Component } from 'react';
import {
    View,
    Text,
    Image
} from 'react-native';
import Button from '../Button';
import styles from './styles';
import Product from '../Product';
import cart from '../../client/cart';

export default class Menu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            quantity: 0,
            selected: false
        }
    }

    addMenu() {
        this.state.quantity = Math.min(3, this.state.quantity + 1);
        this.setState(this.state);
        cart.addMenu(this.props.menu.id);
    }

    removeMenu() {
        this.state.quantity = Math.max(0, this.state.quantity - 1);
        this.setState(this.state);
        cart.removeMenu(this.props.menu.id);
    }

    render() {
        return (
            <View style={styles.itemContainer}>
                <View style= {{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}>
                    <Image source= {{ uri: this.props.menu.getImageUri() }} style= {{ width: 50, height: 50 }} />
                    <Text style= {styles.item}> {this.props.menu.descr} </Text>
                </View>
                <View style= {{ flex: 2, flexDirection: 'row', justifyContent: 'center' }}>
                    <Text style= {styles.item}> ${this.props.menu.price} </Text>
                </View>
                <View style= {{ flex: 0.25, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <Text> {this.state.quantity} </Text>
                    <Button 
                    style= {styles.itemButton}
                    text= '-'
                    onPress= {this.removeMenu.bind(this)}
                    />
                    <Button
                    style= {styles.itemButton}
                    text= '+'
                    onPress= {this.addMenu.bind(this)}
                    />
                </View>
            </View>
        );
    }
}