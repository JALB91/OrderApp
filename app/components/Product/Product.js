import React, { Component } from 'react';
import {
    View,
    Text,
    Image
} from 'react-native';
import Button from '../Button';
import styles from './styles';
import cart from '../../client/cart';
import utils from '../../utils';

export default class Product extends Component {
    constructor(props) {
        super(props);

        this.state = {
            quantity: this.props.startingQuantity || 0
        }
    }

    getNewImage() {
        return (
            <Image
            source = {require('../../../assets/new-256.png')}
            style ={{ position: 'absolute', top: - 5, left: - 10, width: 20, height: 20 }}
            />
        )
    }

    addProduct() {
        this.state.quantity = Math.min(3, this.state.quantity + 1);
        this.setState(this.state);
        cart.addProduct(this.props.product.id);
    }

    removeProduct() {
        this.state.quantity = Math.max(0, this.state.quantity - 1);
        this.setState(this.state);
        cart.removeProduct(this.props.product.id);
    }

    render() {
        return (
            <View style={styles.itemContainer}>
                <View style= {{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}>
                    <Image source= {{ uri: this.props.product.getImageUri() }} style= {{ width: 50, height: 50 }} />
                    { utils.renderif(this.props.product.isNew, this.getNewImage()) }
                    <Text style= {styles.item}> {this.props.product.descr} </Text>
                </View>
                <View style= {{ flex: 2, flexDirection: 'row', justifyContent: 'center' }}>
                    <Text style= {styles.item}> ${this.props.product.price} </Text>
                </View>
                <View style= {{ flex: 0.25, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <Text> {this.state.quantity} </Text>
                    <Button 
                    style= {styles.itemButton}
                    text= '-' 
                    onPress= {this.removeProduct.bind(this)}
                    />
                    <Button 
                    style= {styles.itemButton} 
                    text= '+'
                    onPress= {this.addProduct.bind(this)}
                    />
                </View>
            </View>
        );
    }
}