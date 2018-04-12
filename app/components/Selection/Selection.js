import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    SectionList
} from 'react-native';
import { withNavigation } from 'react-navigation';
import Button from '../Button';
import Product from '../Product';
import selection from '../../models/selection';
import cart from '../../models/cart';
import utils from '../../utils';
import styles from './styles';

export default class Selection extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            sections: []
        }
        
        this.updateSectionsData();
        this.updateSelectedItems();
    }

    componentWillReceiveProps(nextProps) {
        this.props = nextProps;
        this.updateSectionsData();
        this.updateSelectedItems();
        this.setState(this.state);
    }

    updateSectionsData() {
        this.state.sections = [];
        if (this.props.canSelect) {
            this.props.selection.menu.products.forEach(product => {
                const section = this.state.sections.find(section => section.title === product.cat);
                if (section) {
                    section.data.push(product);
                } else {
                    this.state.sections.push({title: product.cat, data: [product]});
                }
            });
        } else {
            Object.keys(this.props.selection.selected).forEach(category => {
                const section = this.state.sections.find(section => section.title === category);
                if (!section) {
                    this.state.sections.push({title: category, data: [this.props.selection.selected[category]]});
                }
            });
        }
    }

    updateSelectedItems() {
        this.state.sections.forEach(section => {
            section.data.forEach(product => {
                product.isSelected = this.props.selection.isSelected(product);
            });
        });
    }

    toggleItem(item) {
        if (this.props.selection.isSelected(item)) {
            this.forceUpdate();
            return;
        }
        this.props.selection.setSelected(item);
        cart.updateSelection(this.props.selection);
        
        this.updateSelectedItems();
        this.setState(this.state);
    }

    renderHeader(section) {
        return (
            <Text style={styles.sectionHeader}>
                {section.title}
            </Text>
        );
    }

    renderItem(item) {
        return (
            <Product
            product={item}
            countMode={false}
            selectMode={this.props.canSelect}
            toggleSelect={() => this.toggleItem(item)}
            selected={item.isSelected}
            />
        );
    }

    getProducts() {
        return (
            <SectionList
            sections={this.state.sections}
            renderItem= {({item}) => this.renderItem(item)}
            renderSectionHeader={({section}) => this.renderHeader(section)}
            keyExtractor={(item, index) => `Sel_${index}`}
            />
        );
    }

    getButtons() {
        return (
            <View style={styles.buttons}>
                <Button
                text='Modify'
                onPress={this.props.onModify}
                />
                <Button
                text='Remove'
                onPress={this.props.onRemove}
                />
            </View>
        )
    }

    render() {
        return (
            <View style={styles.view}>
                { utils.renderif(this.props.canRemove, this.getButtons()) }
                { this.getProducts() }  
            </View>
        );
    }
}

Selection.defaultProps = {
    canSelect: false,
    canRemove: false
}