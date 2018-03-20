import React, { Component } from 'react';
import {
    View,
    Text,
    Image
} from 'react-native';
import Counter from '../Counter';
import styles from './styles';
import cart from '../../client/cart';
import utils from '../../utils';

export default class Product extends Component {
    constructor(props) {
        super(props);
    }

    getNewImage() {
        return (
            <Image
            source = {require('../../../assets/new-256.png')}
            style ={{ position: 'absolute', top: - 5, left: - 10, width: 20, height: 20 }}
            />
        )
    }

    getCounter() {
        return (
            <Counter
            startingQuantity={cart.getQuantityForProductID(this.props.product.id)}
            canIncrease={this.props.canIncrease}
            onAdd={() => cart.addProduct(this.props.product.id)}
            onRemove={() => cart.removeProduct(this.props.product.id)}
            />
        )
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
                { this.getCounter() }
            </View>
        );
    }
}

Product.defaultProps = {
    canIncrease: true
}