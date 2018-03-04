import React, { Component } from 'react';
import {
  Platform,
  Text,
  View,
  SectionList,
  Image
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Button from '../../components/Button/Button';
import styles from './styles';
const settings = require('../../config/settings');

export default class ProductsScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sections: []
        };
        settings.getProductsList().then(function(result) {
            var sections = [];
            result.forEach(product => {
                var isFound = false;
                product['quantity'] = 0;

                for (i = 0; i < sections.length; i++) {
                    if (sections[i]['title'] === product.cat) {
                        isFound = true;
                        sections[i]['data'].push(product);
                    }
                }
                
                if (!isFound) {
                    sections.push({'title': product.cat, 'data': [ product ]});
                }
            });
            this.setState({'sections': sections});
        }.bind(this), function(reason) {
            console.error(reason);
        });
    }

    render() {
      return (
        <View style={styles.container}>
            <SectionList
                sections={this.state.sections}
                renderItem= {
                    ({item}) =>
                    <View style= {styles.itemContainer}>
                        <View style= {{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}>
                            <Image source= {{ uri: item.imgUri }} style= {{ width: 50, height: 50 }} />
                            <Text style= {styles.item}> {item.descr} </Text>
                        </View>
                        <View style= {{ flex: 2, flexDirection: 'row', justifyContent: 'center' }}>
                            <Text style= {styles.item}> ${item.price} </Text>
                        </View>
                        <View style= {{ flex: 0.25, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                            <Text> {item.quantity} </Text>
                            <Button style= {styles.itemButton} title= '-' onPress= {() => { item.quantity = Math.max(0, item.quantity - 1); this.setState(this.state); }}/>
                            <Button style= {styles.itemButton} title= '+' onPress= {() => { item.quantity++; this.setState(this.state); }}/>
                        </View>
                    </View>
                }
                renderSectionHeader={({section}) => <Text style= {styles.sectionHeader}> {section.title} </Text>}
                keyExtractor={(item, index) => index}
            />
        </View>
      );
    }
}