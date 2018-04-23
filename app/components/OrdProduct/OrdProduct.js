import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';
import CheckBox from '../CheckBox';
import Button from '../Button';
import utils from '../../utils';
import styles from './styles';

export default class OrdProduct extends Component {
    constructor(props) {
        super(props);
    }

    getCheckBox() {
        return (
            <CheckBox
            style={styles.checkBox}
            isChecked={this.props.ordProduct.checked}
            onClick={this.props.toggleChecked || (() => {})}
            />
        )
    }

    render() {
        return (
            <View style={styles.itemContainer}>
                <View style={styles.infoContainer}>
                    <Text style={styles.descr}> {this.props.ordProduct.date} </Text>
                    <Text style={styles.descr}> {this.props.ordProduct.timeslot} </Text>
                    <Text style={styles.descr}> {this.props.ordProduct.descr} </Text>
                    <Text style={styles.descr}> {this.props.ordProduct.num} </Text>
                    { utils.renderif(this.props.toggleChecked, this.getCheckBox()) }
                </View>
            </View>
        );
    }
}