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
            refreshing: true,
            sections: [],
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

        server.getProductsList()
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
        const section = this.state.sections.find(section => {
            return section.title === item.cat;
        });
        return section.active;
    }

    render() {
        return (
            <View style={styles.container}>
                <SectionList
                    onRefresh={this.fetchProductsList.bind(this)}
                    refreshing={this.state.refreshing}
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