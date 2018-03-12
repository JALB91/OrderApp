import React, { Component } from 'react';
import {
    Platform,
    Text,
    View
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Button from '../../components/Button/Button';
import styles from './styles';

export default class HomeScreen extends Component {
    constructor(props) {
        super(props);
    }
  
    render() {
        return (
            <View style = {{ flex: 2, alignItems: 'center', padding: 10 }}>
                <Text style = {{ fontSize: 30, margin: 50 }}>Home Screen</Text>
                <Button
                    style = {styles.button}
                    onPress = {() => this.props.navigation.navigate('Products')} 
                    title = {'Go to Products'} 
                    titleStyle = {{ fontSize: 18 }}
                />
                <Button 
                    style = {styles.button}
                    onPress = {() => this.props.navigation.navigate('Orders')}
                    title = {'Go to Orders'}
                    titleStyle = {{ fontSize: 18 }}
                />
            </View>    
        );
    }
}