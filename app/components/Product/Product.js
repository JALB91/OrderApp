import React, { Component } from 'react';
import {
    View,
    Text,
    Image
} from 'react-native';
import CheckBox from 'react-native-check-box';
import Counter from '../Counter';
import Button from '../Button';
import cart from '../../models/cart';
import utils from '../../utils';
import user from '../../models/user';
import styles from './styles';

export default class Product extends Component {
    constructor(props) {
        super(props);
    }

    getNewImage() {
        return (
            <Image
            source = {require('../../../assets/new-256.png')}
            style ={styles.newImage}
            />
        )
    }

    getCounter() {
        return (
            <Counter
            startingQuantity={this.props.startingQuantity}
            canIncrease={this.props.canModify}
            canDecrease={this.props.canModify}
            onAdd={() => cart.addProduct(this.props.product)}
            onRemove={() => cart.removeProduct(this.props.product)}
            />
        )
    }

    getCheckBox() {
        return (
            <CheckBox
            style={styles.checkBox}
            isChecked={this.props.selected}
            onClick={this.props.toggleSelect || (() => {})}
            />
        )
    }

    addToFavourites() {
        user.addFavouriteProduct(this.props.product.id);
    }

    removeFromFavourites() {
        user.removeFavouriteProduct(this.props.product.id);
    }

    render() {
        return (
            <View style={styles.itemContainer}>
                <View style= {{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}>
                    <Button 
                    imgUri={user.isProductFavourite(this.props.product.id) ? require('../../../assets/star_full.png') : require('../../../assets/star_empty.png')}
                    imgStyle={styles.star}
                    style={styles.starButton}
                    onPress={() => {
                        if (!user.isProductFavourite(this.props.product.id)) {
                            this.addToFavourites();
                        } else {
                            this.removeFromFavourites();
                        }
                        this.forceUpdate();
                    }}
                    />
                    <Image
                    source={{ uri: this.props.product.getImageUri() }}
                    style={styles.itemImage}
                    />
                    { utils.renderif(this.props.product.isNew, this.getNewImage()) }
                    <Text style={styles.text}> {this.props.product.descr} </Text>
                </View>
                <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'center' }}>
                    <Text style={styles.text}> ${this.props.product.price} </Text>
                </View>
                { utils.renderif(this.props.countMode, this.getCounter()) }
                { utils.renderif(this.props.selectMode, this.getCheckBox()) }
            </View>
        );
    }
}

Product.defaultProps = {
    startingQuantity: 0,
    canModify: true,
    countMode: true,
    selectMode: false,
    selected: false,
    toggleSelect: null
}