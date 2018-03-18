import React, { Component } from 'react';
import {
    Platform,
    Text,
    View
} from 'react-native';
import Button from '../../components/Button';
import Utils from '../../utils';
import user from '../../client/user';
import * as server from '../../config/server';


export default class CartScreen extends Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = ({navigation}) => {
        const params = navigation.state.params || {};

        return {
            title: 'Cart'
        }
    }

    render() {
        return (
            <View style = {{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 10 }}>
                
            </View>
        );
    }
}