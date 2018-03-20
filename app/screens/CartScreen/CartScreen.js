import React, { Component } from 'react';
import {
    Platform,
    Text,
    View,
    SectionList
} from 'react-native';
import Button from '../../components/Button';
import Product from '../../components/Product';
import Menu from '../../components/Menu';
import user from '../../client/user';
import cart from '../../client/cart';
import styles from './styles';
import utils from '../../utils';


export default class CartScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sections: []
        };

        const productsQuantity = cart.productsQuantity;
        const products = cart.products;
        const productsData = [];

        const menusQuantity = cart.menusQuantity;
        const menus = cart.menus;
        const menusData = [];

        menus.forEach(menu => {
            if (cart.getQuantityForMenuID(menu.id) > 0) {
                menusData.push(menu);
            }
        });

        products.forEach(product => {
            if (cart.getQuantityForProductID(product.id) > 0) {
                productsData.push(product);
            }
        });

        this.state.sections.push({
            title: 'Menus',
            active: true,
            data: menusData
        });

        this.state.sections.push({
            title: 'Products',
            active: true,
            data: productsData
        });
    }

    static navigationOptions = ({navigation}) => {
        const params = navigation.state.params || {};

        return {
            title: 'Cart'
        }
    }

    isItemActive(item) {
        const title = this.isProduct(item) ? 'Products' : 'Menus';
        const section = this.state.sections.find(section => {
            return section.title === title;
        });
        return section.active;
    }

    isProduct(item) {
        return !item.hasOwnProperty('products');
    }

    isMenu(item) {
        return item.hasOwnProperty('products');
    }

    renderItem(item) {
        if (this.isProduct(item)) {
            return (
                <Product
                product={item}
                canIncrease={false}
                />
            );
        } else {
            return (
                <Menu 
                menu={item}
                canIncrease={false}
                />
            );
        }
    }

    render() {
        return (
            <View style = {{ flex: 1, paddingTop: 20 }}>
                <SectionList
                sections={this.state.sections}
                renderItem={({item}) =>
                    utils.renderif(this.isItemActive(item), this.renderItem(item))
                }
                renderSectionHeader={({section}) => 
                    <Button 
                    style={styles.sectionHeader}
                    text={section.title} 
                    textStyle={styles.titleStyle} 
                    onPress={() => { 
                        section.active = !section.active;
                        this.setState(this.state);
                    }}
                    />
                }
                keyExtractor={(item, index) => index}
                />
            </View>
        );
    }
}