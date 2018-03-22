import React, { Component } from 'react';
import {
    Platform,
    Text,
    View,
    SectionList,
    Image
} from 'react-native';
import Menu from '../../components/Menu';
import Button from '../../components/Button';
import Cart from '../../components/Cart';
import styles from './styles';
import utils from '../../utils';
import cart from '../../client/cart';
import * as server from '../../config/server';

export default class MenusScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            refreshing: true,
            sections: []
        };
    }

    static navigationOptions = ({navigation}) => {
        const params = navigation.state.params || {};

        return {
            title: 'Menus',
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
        this.fetchMenusList();
    }

    goToCart() {
        this.props.navigation.navigate('Cart');
    }

    fetchMenusList() {
        this.setState({refreshing: true});

        server.getMenusList().then(function(result) {
            this.updateMenusList(result);
        }.bind(this), function(reason) {
            console.error(reason);
        });
    }

    updateMenusList(menus) {
        cart.menus = menus;
        const sections = [{title: 'Menu', data: []}];
        menus.forEach(menu => {
            sections[0]['data'].push(menu);
        });
        this.setState({'sections': sections, refreshing: false});
    }

    render() {
        return (
            <View style={styles.container}>
                <SectionList
                    onRefresh={this.fetchMenusList.bind(this)}
                    refreshing={this.state.refreshing}
                    sections={this.state.sections}
                    renderItem= {({item}) => 
                        <Menu menu={item} />
                    }
                    renderSectionHeader={({section}) =>
                        <Text style={styles.sectionHeader}>
                            {section.title}
                        </Text>
                    }
                    keyExtractor={(item, index) => index}
                />
            </View>
        );
    }
}