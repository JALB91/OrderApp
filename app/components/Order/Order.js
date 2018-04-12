import React, { Component } from 'react';
import {
    View,
    Text,
    SectionList,
    Modal
} from 'react-native';
import Button from '../Button';
import Product from '../Product';
import Menu from '../Menu';
import utils from '../../utils';
import timeslots from '../../models/timeslots';
import styles from './styles';

export default class Order extends Component {
    constructor(props) {
        super(props);

        const productsData = [];

        this.props.order.products.forEach(product => {
            const item = productsData.find(prod => prod.id === product.id);
            if (item) {
                item.quantity++;
            } else {
                product.quantity = 1;
                productsData.push(product);
            }
        });

        this.state = {
            sections: [
                {title: 'Menus', active: true, data: this.props.order.selections},
                {title: 'Products', active: true, data: productsData}
            ]
        }        
    }

    isProduct(item) {
        return this.props.order.products.find(prod => prod.id === item.id);
    }

    isMenu(item) {
        return this.props.order.selections.indexOf(item) >= 0;
    }

    isItemActive(item) {
        const title = this.isProduct(item) ? 'Products' : 'Menus';
        const section = this.state.sections.find(section => {
            return section.title === title;
        });
        return section.active;
    }

    renderItem(item) {
        if (this.isProduct(item)) {
            return (
                <Product
                    product={item}
                    canModify={false}
                    startingQuantity={item.quantity}
                />
            );
        } else if (this.isMenu(item)) {
            return (
                <Menu
                    menu={item.menu}
                    canAdd={false}
                    selections={[item]}
                />
            );
        }

        return null;
    }

    getTimeslot() {
        return (
            <Text style={styles.timeslotText}>
                {this.props.order.descr}
            </Text>
        );
    }

    render() {
        return (
            <View style={styles.view}>
                <SectionList
                    sections={this.state.sections}
                    renderItem={({ item }) => utils.renderif(this.isItemActive(item), this.renderItem(item))}
                    renderSectionHeader={({ section }) =>
                        <Button
                            textStyle={styles.titleStyle}
                            style={styles.sectionHeader}
                            text={section.title}
                            onPress={() => {
                                section.active = !section.active;
                                this.setState(this.state);
                            }}
                        />
                    }
                    keyExtractor={(item, index) => `Ord_${index}`}
                />
                {this.getTimeslot()}
            </View>
        )
    }
}

Order.defaultProps = {
    order: {
        products: [],
        menus: [],
        descr: ''
    }
}