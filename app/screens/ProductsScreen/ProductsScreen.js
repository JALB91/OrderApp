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

        settings.getCategoriesList().then(function(result) {
            this.updateCategoriesList(result);
        }.bind(this), function(reason) {
            console.error(reason);
        });

        settings.getProductsList().then(function(result) {
            this.updateProductsList(result);
            settings.getNewsList().then(function(result) {
                this.updateNewsList(result);
            }.bind(this), function(reason) {
                console.error(reason);
            });
        }.bind(this), function(reason) {
            console.error(reason);
        });
    }

    updateCategoriesList(categories) {
        var sections = this.state.sections;
        categories.forEach(category => {
            var isFound = false;
            sections.forEach(section => {
                if (section.title === category.cat) {
                    isFound = true;
                }
            });

            if (!isFound) {
                sections.push({title: category.cat, active: true, data: []});
            }
        });
        this.setState({'sections': sections});
    }

    updateProductsList(products) {
        var sections = this.state.sections;
        products.forEach(product => {
            var isFound = false;
            product.quantity = 0;
            product.isNew = false;

            sections.forEach(section => {
                if (section.title === product.cat) {
                    isFound = true;
                    section.data.push(product);
                }
            });
            
            if (!isFound) {
                sections.push({title: product.cat, active: true, data: [ product ]});
            }
        });
        this.setState({'sections': sections});
    }

    updateNewsList(products) {
        var sections = this.state.sections;
        products.forEach(product => {
            sections.forEach(section => {
                section.data.forEach(item => {
                    if (item.idProd === product.idProd) {
                        item.isNew = true;
                    }
                });
            });
        });
        this.setState({'sections': sections});
    }

    isItemActive(item) {
        var result = true;
        this.state.sections.forEach(section => {
            if (section.title === item.cat) {
                result = section.active;
            }
        });
        return result;
    }

    render() {
      return (
        <View style={styles.container}>
            <SectionList
                sections={this.state.sections}
                renderItem= {
                    ({item}) =>
                    <View style={this.isItemActive(item) ? styles.itemContainerActive : styles.itemContainerInactive}>
                        <View style= {{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}>
                            <Image source= {{ uri: item.imgUri }} style= {{ width: 50, height: 50 }} />
                            <Image 
                            source = {require('../../../assets/new-256.png')} 
                            style = {item.isNew ? { position: 'absolute', top: - 5, left: - 10, width: 20, height: 20 } : { display: 'none' }} />
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
                renderSectionHeader={({section}) => 
                    <Button 
                    style={styles.sectionHeader} 
                    title={section.title} 
                    titleStyle={styles.titleStyle} 
                    onPress={() => { section.active = !section.active; this.setState(this.state); }}
                    />
                }
                keyExtractor={(item, index) => index}
            />
        </View>
      );
    }
}