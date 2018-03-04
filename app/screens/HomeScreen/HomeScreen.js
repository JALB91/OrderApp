import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class HomeScreen extends Component {
    constructor(props) {
      super(props);
    }
  
    render() {
      return (
        <View>
            <Text>Home Screen</Text>
            <Button
            title="Go to Products"
            onPress={() => this.props.navigation.navigate('Products')}
            />
            <Button
            title="Go to Orders"
            onPress={() => this.props.navigation.navigate('Orders')}
            />
        </View>    
      );
    }
}