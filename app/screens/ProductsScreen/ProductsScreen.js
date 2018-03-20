import React, { Component } from 'react';
import {
    Platform,
    Text,
    View,
    SectionList,
    Image
} from 'react-native';
import Product from '../../components/Product';
import Button from '../../components/Button';
import Cart from '../../components/Cart';
import styles from './styles';
import utils from '../../utils';
import cart from '../../client/cart';
import * as server from '../../config/server';

export default class ProductsScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sections: []
        };

        server.getCategoriesList().then(function(result) {
            this.updateCategoriesList(result);
        }.bind(this), function(reason) {
            console.error(reason);
        });

        server.getProductsList().then(function(result) {
            this.updateProductsList(result);
        }.bind(this), function(reason) {
            console.error(reason);
        });
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

    goToCart() {
        this.props.navigation.navigate('Cart');
    }

    updateCategoriesList(categories) {
        let sections = this.state.sections;
        categories.forEach(category => {
            const section = sections.find(section => {
                return section.title === category.cat;
            });

            if (!section) {
                sections.push({title: category.cat, active: true, data: []});
            }
        });
        this.setState({'sections': sections});
    }

    updateProductsList(products) {
        cart.products = products;
        let sections = this.state.sections;
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
        this.setState({'sections': sections});
    }

    isItemActive(item) {
        const section = this.state.sections.find(section => {
            return section.title === item.cat;
        });
        return section.active;
    }

    render() {
        return (
            <View style={styles.container}>
                <SectionList
                    sections={this.state.sections}
                    renderItem= {({item}) =>
                        utils.renderif(this.isItemActive(item), <Product product={item} />)
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