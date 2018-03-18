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
import * as server from '../../config/server';

export default class MenusScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sections: [ { title: 'Menu', data: [] } ]
        };

        server.getMenusList().then(function(result) {
            this.updateMenusList(result);
        }.bind(this), function(reason) {
            console.error(reason);
        });
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

    goToCart() {
        this.props.navigation.navigate('Cart');
    }

    updateMenusList(menus) {
        let sections = this.state.sections;
        menus.forEach(menu => {
            menu.quantity = 0;
            menu.selected = false;
            sections[0]['data'].push(menu);
        });
        this.setState({'sections': sections});
    }

    render() {
        return (
            <View style={styles.container}>
                <SectionList
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