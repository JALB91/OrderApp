import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    FlatList
} from 'react-native';
import { withNavigation } from 'react-navigation';
import Button from '../Button';
import styles from './styles';
import Product from '../Product';
import Selection from '../Selection';
import selection from '../../client/selection';
import cart from '../../client/cart';
import utils from '../../utils';

class Menu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: false,
            selections: cart.selections
        }
    }

    addSelection() {
        const sel = new selection({menu: this.props.menu});
        cart.addSelection(sel);
        this.props.navigation.navigate('Selection', { selection: sel, isAdded: true })
    }

    removeSelection(selection) {
        cart.removeSelection(selection);
        this.state.selections.splice(this.state.selections.indexOf(selection));
        this.setState({selections: this.state.selections});
    }

    modifySelection(selection) {
        this.props.navigation.navigate('Selection', { selection: selection, isAdded: false });
    }

    getAddButton() {
        return (
            <View>
                <Button
                style={styles.itemButton}
                onPress={this.addSelection.bind(this)}
                text='+'
                />
            </View>
        );
    }

    getMenuItem() {
        return (
            <View style={styles.itemContainer}>
                <View style= {{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}>
                    <Button
                    imgUri={{ uri: this.props.menu.getImageUri() }}
                    imgStyle={{ width: 50, height: 50 }}
                    onPress={() => this.setState({selected: !this.state.selected})}
                    />
                    <Text style= {styles.item}>
                        {this.props.menu.descr}
                    </Text>
                </View>
                <View style= {{ flex: 2, flexDirection: 'row', justifyContent: 'center' }}>
                    <Text style= {styles.item}> ${this.props.menu.price} </Text>
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
                renderItem={({item}) => <Text> {item.descr} </Text>}
                keyExtractor={(item, index) => item.id.toString()}
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
                data={this.state.selections}
                renderItem={({item}) => this.renderSelection(item)}
                keyExtractor={(item, index) => item.cart_id.toString()}
                />
            </View>
        )
    }

    render() {
        return (
            <View>
                { this.getMenuItem() }
                { utils.renderif(this.state.selected, this.getProducts()) }
                { utils.renderif(this.state.selections.length, this.getSelections()) }
            </View>
        );
    }
}

Menu.defaultProps = {
    canAdd: true
}

export default withNavigation(Menu);