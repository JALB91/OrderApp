import React, { Component } from 'react';
import {
    Platform,
    Text,
    View,
    SectionList,
    Image
} from 'react-native';
import Button from '../../components/Button/Button';
import styles from './styles';
import Utils from '../../utils/utils';
const server = require('../../config/server');

export default class ProductsScreen extends Component {
    constructor(props) {
        super(props);

        console.log(Utils.data);

        this.state = {
            sections: []
        };

        server.getCategoriesList().then(function(result) {
            this.updateCategoriesList(result);
        }.bind(this), function(reason) {
            console.error(reason);
        });

        server.getProductsList().then(function(result) {
            this.updateProductsList(result);
        }.bind(this), function(reason) {
            console.error(reason);
        });
    }

    updateCategoriesList(categories) {
        let sections = this.state.sections;
        categories.forEach(category => {
            const section = sections.find(section => {
                return section.title === category.cat;
            });

            if (!section) {
                sections.push({title: category.cat, active: true, data: []});
            }
        });
        this.setState({'sections': sections});
    }

    updateProductsList(products) {
        let sections = this.state.sections;
        products.forEach(product => {
            product.quantity = 0;
            
            const section = sections.find(section => {
                return section.title === product.cat;
            });
            
            if (!section) {
                sections.push({title: product.cat, active: true, data: [ product ]});
            } else {
                section.data.push(product);
            }
        });
        this.setState({'sections': sections});
    }

    isItemActive(item) {
        const section = this.state.sections.find(section => {
            return section.title === item.cat;
        });
        return section.active;
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
                                    <Image source= {{ uri: item.getImageUri() }} style= {{ width: 50, height: 50 }} />
                                    <Image 
                                        source = {require('../../../assets/new-256.png')}
                                        style = {item['isNew'] ? { position: 'absolute', top: - 5, left: - 10, width: 20, height: 20 } : { display: 'none' }} />
                                    <Text style= {styles.item}> {item['descr']} </Text>
                                </View>
                                <View style= {{ flex: 2, flexDirection: 'row', justifyContent: 'center' }}>
                                    <Text style= {styles.item}> ${item['price']} </Text>
                                </View>
                                <View style= {{ flex: 0.25, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                                    <Text> {item['quantity']} </Text>
                                    <Button style= {styles.itemButton} title= '-' onPress= {() => { item['quantity'] = Math.max(0, item['quantity'] - 1); this.setState(this.state); }}/>
                                    <Button style= {styles.itemButton} title= '+' onPress= {() => { item['quantity']++; this.setState(this.state); }}/>
                                </View>
                            </View>
                    }
                    renderSectionHeader={({section}) => 
                        <Button 
                            style={styles.sectionHeader} 
                            title={section.title} 
                            titleStyle={styles.titleStyle} 
                            onPress={() => { 
                                section.active = !section.active;
                                this.setState(this.state);
                            }}
                        />
                    }
                    keyExtractor={(item, index) => index}
                />
            </View>
        );
    }
}