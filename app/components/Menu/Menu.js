import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    FlatList
} from 'react-native';
import Button from '../Button';
import styles from './styles';
import Product from '../Product';
import Counter from '../Counter';
import cart from '../../client/cart';
import utils from '../../utils';

export default class Menu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: false
        }
    }

    getCounter() {
        return (
            <Counter
            startingQuantity={cart.getQuantityForMenuID(this.props.menu.id)}
            canIncrease={this.props.canIncrease}
            onAdd={() => cart.addMenu(this.props.menu.id)}
            onRemove={() => cart.removeMenu(this.props.menu.id)}
            />
        )
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
                { this.getCounter() }
            </View>
        );
    }

    getProducts() {
        return (
            <View style={{  }}>
                <FlatList
                data={this.props.menu.products}
                renderItem={({item}) => <Text> {item.descr} </Text>}
                keyExtractor={(item, index) => item.id.toString()}
                />
            </View>
        );
    }

    render() {
        return (
            <View>
                { this.getMenuItem() }
                { utils.renderif(this.state.selected, this.getProducts()) }
            </View>
        );
    }
}

Menu.defaultProps = {
    canIncrease: true
}