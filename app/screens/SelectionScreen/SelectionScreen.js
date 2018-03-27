import React, { Component } from 'react';
import {
    Platform,
    Text,
    View
} from 'react-native';
import Button from '../../components/Button';
import Selection from '../../components/Selection';
import utils from '../../utils';
import styles from './styles';


export default class SelectionScreen extends Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = ({navigation}) => {
        const params = navigation.state.params || {};

        return {
            title: 'Selection'
        }
    }

    getSelection() {
        const { params } = this.props.navigation.state;
        return (
            <Selection
            selection={params.selection}
            canSelect={true}
            />
        );
    }

    onConfirm() {

    }

    onCancel() {
        
    }

    getButtons() {
        return (
            <View>
            </View>
        );
    }

    render() {
        return (
            <View style = {{ flex: 1, justifyContent: 'center', padding: 10 }}>
                { this.getSelection() }
                { this.getButtons() }
            </View>
        );
    }
}