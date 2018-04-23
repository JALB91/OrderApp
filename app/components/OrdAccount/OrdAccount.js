import React, { Component } from 'react';
import {
    FlatList,
    View,
    Text
} from 'react-native';
import OrdProduct from '../OrdProduct';
import CheckBox from '../CheckBox';
import Button from '../Button';
import utils from '../../utils';
import styles from './styles';

export default class OrdAccount extends Component {
    constructor(props) {
        super(props);
    }

    getCheckBox() {
        return (
            <CheckBox
            style={styles.checkBox}
            isChecked={this.props.ordAccount.checked}
            onClick={this.props.toggleChecked || (() => {})}
            />
        )
    }

    renderItem(item) {
        return (
            <OrdProduct
            ordProduct={item}
            />
        );
    }

    render() {
        return (
            <View style={styles.itemContainer}>
                <View style={styles.infoContainer}>
                    <Text style={styles.descr}> {this.props.ordAccount.date} </Text>
                    <Text style={styles.descr}> {this.props.ordAccount.timeslot} </Text>
                    <Text style={styles.descr}> {this.props.ordAccount.username} </Text>
                    <Text style={styles.descr}> ${this.props.ordAccount.price} </Text>
                    { this.getCheckBox() }
                </View>
                <View style={{flex: 1, alignSelf: 'stretch'}}>
                    <FlatList
                    data={this.props.ordAccount.ordProducts}
                    renderItem={({item}) => this.renderItem(item)}
                    />
                </View>
            </View>
        );
    }
}