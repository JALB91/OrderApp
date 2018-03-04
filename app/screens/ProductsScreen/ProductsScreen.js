import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  SectionList
} from 'react-native';
import { StackNavigator } from 'react-navigation';
var settings = require('../../config/settings')

export default class ProductsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sections: []
        };
        settings.getProductsList().then((result) => {

        });
    }

    render() {
      return (
        <View>
            <SectionList
                sections={this.state.sections}
                renderItem={({item}) => <Text>{item}</Text>}
                renderSectionHeader={({section}) => <Text>{section.title}</Text>}
                keyExtractor={(item, index) => index}
            />
        </View>    
      );
    }
}