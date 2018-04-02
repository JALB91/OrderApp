import React, { Component } from 'react';
import {
    Platform,
    Text,
    View,
    SectionList,
    Image,
    Picker
} from 'react-native';
import Product from '../../components/Product';
import Button from '../../components/Button';
import Cart from '../../components/Cart';
import styles from './styles';
import utils from '../../utils';
import cart from '../../models/cart';
import user from '../../models/user';
import * as api from '../../utils/api';

export default class ProductsScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            refreshing: true,
            sections: [],
            activeFilter: 0
        };
    }

    static navigationOptions = ({navigation}) => {
        const params = navigation.state.params || {};

        return {
            title: 'Products',
            headerRight: (
                <Cart onPress={params.goToCart} /> 
            )
        }
    }

    componentWillMount() {
        this.props.navigation.setParams({
            goToCart: this.goToCart.bind(this)
        });
    }

    componentDidMount() {
        this.fetchProductsList();
    }

    goToCart() {
        this.props.navigation.navigate('Cart');
    }

    fetchProductsList() {
        this.setState({refreshing: true});

        api.getProductsList()
        .then(function(result) {
            this.updateProductsList(result);
        }
        .bind(this), function(reason) {
            console.error(reason);
        });
    }

    updateProductsList(products) {
        cart.products = products;
        const sections = [];
        products.forEach(product => {
            const section = sections.find(section => {
                return section.title === product.cat;
            });
            
            if (!section) {
                sections.push({title: product.cat, active: true, data: [ product ]});
            } else {
                section.data.push(product);
            }
        });
        this.setState({'sections': sections, refreshing: false});
    }

    isItemActive(item) {
        let isActive = true;

        if (this.state.activeFilter === 1) {    // News filter
            isActive = user.isProductFavourite(item.id);
        }
        else if (this.state.activeFilter === 2) {    // News filter
            isActive = item.isNew;
        }

        const section = this.state.sections.find(section => {
            return section.title === item.cat;
        });

        return section.active && isActive;
    }

    getFilter() {
        return (
            <Picker
            prompt='Filter'
            enabled={!this.state.refreshing}
            selectedValue={this.state.activeFilter}
            onValueChange={value => this.setState({activeFilter: value})}
            mode='dropdown'
            >
            <Picker.Item label='No filter' value={0} />
            <Picker.Item label='Favourite' value={1} />
            <Picker.Item label='News' value={2} />
            </Picker>
        );
    }

    renderProduct(product) {
        return (
            <Product 
            product={product} 
            startingQuantity={cart.getQuantityForProductId(product.id)}
            />
        )
    }

    render() {
        return (
            <View style={styles.container}>
                {this.getFilter()}
                <SectionList
                    onRefresh={this.fetchProductsList.bind(this)}
                    refreshing={this.state.refreshing}
                    sections={this.state.sections}
                    renderItem= {({item}) => utils.renderif(this.isItemActive(item), this.renderProduct(item))}
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