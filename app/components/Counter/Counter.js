import React, { Component } from 'react';
import {
    Text,
    View
} from 'react-native';
import Button from '../Button';
import styles from './styles';
import utils from '../../utils';

export default class Counter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            quantity: this.props.startingQuantity
        }
    }

    add() {
        this.state.quantity = Math.min(this.props.max, this.state.quantity + 1);
        this.setState(this.state);
        if (this.props.onAdd) {
            this.props.onAdd(this.state.quantity);
        }
    }

    remove() {
        this.state.quantity = Math.max(this.props.min, this.state.quantity - 1);
        this.setState(this.state);
        if (this.props.onRemove) {
            this.props.onRemove(this.state.quantity);
        }
    }

    getRemoveButton() {
        return (
            <Button
            style= {styles.itemButton}
            text= '-'
            onPress= {this.remove.bind(this)}
            />
        );
    }

    getAddButton() {
        return (
            <Button
            style= {styles.itemButton}
            text= '+'
            onPress= {this.add.bind(this)}
            />
        );
    }

    render() {
        return (
            <View style= {{ flex: 0.25, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                <Text> {this.state.quantity} </Text>
                { utils.renderif(this.props.canIncrease, this.getRemoveButton())}
                { utils.renderif(this.props.canDecrease, this.getAddButton())}
            </View>
        )
    }
}

Counter.defaultProps = {
    startingQuantity: 0,
    canIncrease: true,
    canDecrease: true,
    min: 0,
    max: 3
}