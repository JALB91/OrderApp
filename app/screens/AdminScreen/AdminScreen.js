import React, { Component } from 'react';
import {
    Platform,
    Text,
    FlatList,
    View
} from 'react-native';
import OrdProduct from '../../components/OrdProduct';
import OrdAccount from '../../components/OrdAccount';
import Button from '../../components/Button';
import utils from '../../utils';
import user from '../../models/user';
import timeslots from '../../models/timeslots';
import * as api from '../../utils/api';
import styles from './styles';


export default class AdminScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            refreshing: true,
            ordByAccount: true,
            data: []
        };
    }

    static navigationOptions = ({navigation}) => {
        const params = navigation.state.params || {};

        return {
            title: 'Admin'
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        this.setState({refreshing: true});

        if (this.state.ordByAccount) {
            api.getOrdersListByAcc()
            .then(result => {
                this.setState({data: result, refreshing: false});
            })
            .catch(reason => {
                console.warn(reason);
                this.setState({data: [], refreshing: false});
            });
        } else {
            api.getOrdersListByProd()
            .then(result => {
                this.setState({data: result, refreshing: false});
            })
            .catch(reason => {
                console.warn(reason);
                this.setState({data: [], refreshing: false});
            });
        }
    }

    toggleChecked(item) {
        if (!item.checked) {
            if (this.state.ordByAccount) {
                api.checkOrderByIdOrder(item['id_ord']);
            } else {
                api.checkProduct(item);
            }
        } else {
            if (this.state.ordByAccount) {
                api.uncheckOrderByIdOrder(item['id_ord']);
            } else {
                api.uncheckProduct(item);
            }
        }

        this.fetchData();
    }

    renderButtons() {
        return (
            <View style={{alignSelf: 'stretch', flexDirection: 'row'}}>
                <Button
                style={{flex: 1}}
                text={'By Prod'}
                onPress={() => {
                    this.state.ordByAccount = false;
                    this.state.data = [];
                    this.setState({ordByAccount: false, data: [], refreshing: true});
                    this.fetchData();
                }}
                />
                <Button 
                style={{flex: 1}}
                text={'By Acc'}
                onPress={() => {
                    this.state.ordByAccount = true;
                    this.state.data = [];
                    this.setState({ordByAccount: true, data: [], refreshing: true});
                    this.fetchData();
                }}
                />
            </View>
        );
    }

    renderItem(item) {
        if (this.state.ordByAccount) {
            return (
                <OrdAccount
                ordAccount={item}
                toggleChecked={() => this.toggleChecked(item)}
                />
            );
        } else {
            return (
                <OrdProduct
                ordProduct={item}
                toggleChecked={() => this.toggleChecked(item)}
                />
            );
        }
    }

    renderProducts() {
        return (
            <View style={{flex: 1}}>
                <FlatList
                data={this.state.data}
                renderItem={({item}) => this.renderItem(item)}
                onRefresh={() => this.fetchData()}
                refreshing={this.state.refreshing}
                />
            </View>
        );
    }
  
    render() {
        return (
            <View style={styles.view}>
                { this.renderButtons() }
                { this.renderProducts() }
            </View>
        );
    }
}