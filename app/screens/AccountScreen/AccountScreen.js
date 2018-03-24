import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import utils from '../../utils';
import styles from './styles';

export default class AccountScreen extends Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = ({navigation}) => {
        const params = navigation.state.params || {};

        return {
            title: 'Account'
        }
    }

    render() {
        return (
            <View>
            </View>
        )
    }
}