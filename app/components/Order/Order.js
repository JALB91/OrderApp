import React, { Component } from 'react';
import {
    View,
    Text,
    SectionList
} from 'react-native';
import Button from '../Button';
import Product from '../Product';
import Menu from '../Menu';
import utils from '../../utils';
import styles from './styles';

export default class Order extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sections: [
                {title: 'Menus', active: true, data: props.menus || []},
                {title: 'Products', active: true, data: props.products || []}
            ]
        }
    }

    isProduct(item) {
        return this.props.products.indexOf(item) >= 0;
    }

    ifMenu(item) {
        return this.props.menus.indexOf(item) >= 0;
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
            <View style={{ flex: 1, paddingTop: 20 }}>
                <SectionList
                    sections={this.state.sections}
                    renderItem={({ item }) =>
                        utils.renderif(this.isItemActive(item), this.renderItem(item))
                    }
                    renderSectionHeader={({ section }) =>
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
        )
    }
}