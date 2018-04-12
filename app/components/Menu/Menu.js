import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    FlatList
} from 'react-native';
import { withNavigation } from 'react-navigation';
import Button from '../Button';
import Product from '../Product';
import Selection from '../Selection';
import selection from '../../models/selection';
import cart from '../../models/cart';
import utils from '../../utils';
import styles from './styles';

class Menu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: false
        }
    }

    addSelection() {
        const sel = new selection({menu: this.props.menu});
        cart.addSelection(sel);
        this.props.navigation.navigate('Selection', { selection: sel, isAdded: true })
    }

    removeSelection(selection) {
        this.props.selections.splice(this.props.selections.indexOf(selection), 1);
        cart.removeSelection(selection);
        this.forceUpdate();
    }

    modifySelection(selection) {
        this.props.navigation.navigate('Selection', { selection: selection, isAdded: false });
        this.listener = this.props.navigation.addListener('willFocus', payload => {
            this.forceUpdate();
            this.listener.remove();
        });
    }

    getAddButton() {
        return (
            <Button
            style={styles.addButton}
            onPress={this.addSelection.bind(this)}
            text='+'
            />
        );
    }

    getMenuItem() {
        return (
            <View style={styles.menuContainer}>
                <View style={styles.menuInfoContainer}>
                    <Button
                    imgStyle={styles.image}
                    imgUri={{ uri: this.props.menu.getImageUri() }}
                    onPress={() => this.setState({selected: !this.state.selected})}
                    />
                    <Text style={[styles.texts, styles.description]}>
                        {this.props.menu.descr}
                    </Text>
                </View>
                <View style={styles.priceContainer}>
                    <Text style={[styles.texts, {padding: 10}]}> ${this.props.menu.price} </Text>
                </View>
                { utils.renderif(this.props.canAdd, this.getAddButton()) }
            </View>
        );
    }

    getProducts() {
        return (
            <View>
                <FlatList
                data={this.props.menu.products}
                renderItem={({item}) => <Text style={[styles.texts, {padding: 2.5}]}> {item.descr} </Text>}
                keyExtractor={(item, index) => `Menu_Prod_${item.id.toString()}`}
                />
            </View>
        );
    }

    renderSelection(selection) {
        return (
            <Selection
            canRemove={this.props.canAdd}
            onRemove={() => this.removeSelection(selection)}
            onModify={() => this.modifySelection(selection)}
            selection={selection}
            />
        )
    }

    getSelections() {
        return (
            <View>
                <FlatList
                data={this.props.selections}
                renderItem={({item}) => this.renderSelection(item)}
                keyExtractor={(item, index) => `Menu_Sel_${item.cart_id.toString()}`}
                />
            </View>
        )
    }

    render() {
        return (
            <View style={styles.view}>
                { this.getMenuItem() }
                { utils.renderif(this.state.selected, this.getProducts()) }
                { utils.renderif(this.props.selections.length, this.getSelections()) }
            </View>
        );
    }
}

Menu.defaultProps = {
    selections: [],
    canAdd: true
}

export default withNavigation(Menu);