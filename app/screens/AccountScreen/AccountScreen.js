import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Loading from '../../components/Loading';
import Button from '../../components/Button';
import * as api from '../../utils/api';
import user from '../../models/user';
import utils from '../../utils';
import styles from './styles';

export default class AccountScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            changePassword: false,
            oldPassword: '',
            newPassword: '',
            warning: ''
        };
    }

    static navigationOptions = ({navigation}) => {
        const params = navigation.state.params || {};

        return {
            title: 'Account'
        }
    }

    changePassword() {
        this.setState({ loading: true });
        api.changePassword(user.user_id, user.username, this.state.oldPassword, this.state.newPassword)
        .then(() => {
            this.setState({ loading: false });
        })
        .catch(reason => {
            this.setState({ loading: false });
        });
    }

    getChangePasswordButton() {
        return (
            <Button
                onPress={() => this.setState({ changePassword: true })}
                text='Change Password'
            />
        );
    }

    getChangePasswordView() {
        return (
            <View>
                <TextInput
                    style={styles.input}
                    multiline={false}
                    onChangeText={text => this.setState({oldPassword: text})}
                    placeholder='Old Password'
                    secureTextEntry={true}
                />
                <TextInput
                    style={styles.input}
                    multiline={false}
                    onChangeText={text => this.setState({newPassword: text})}
                    placeholder='New Password'
                    secureTextEntry={true}
                />
                <Button
                    onPress={() => this.setState({changePassword: false, warning: '', newPassword: '', oldPassword: ''})}
                    text='Back'
                />
                <Button
                    enabled={!this.state.warning.length}
                    onPress={this.changePassword.bind(this)}
                    text='Change Password'
                />
            </View>
        );
    }

    getLogoutButton() {
        return (
            <Button
                onPress={() => {
                    user.logout();
                    const resetAction = NavigationActions.reset({
                        index: 0,
                        actions: [NavigationActions.navigate({ routeName: 'Home' })],
                    });
                    this.props.navigation.dispatch(resetAction);
                }}
                text='Logout'
            />
        )
    }

    getWarningMessage() {
        return (
            <Text style={styles.warning}>
                {this.state.warning}
            </Text>
        );
    }

    render() {
        if ((this.state.oldPassword.length > 0 && this.state.oldPassword.length < 8) ||
            (this.state.newPassword.length > 0 && this.state.newPassword.length < 8)) {
            this.state.warning = 'Password contains less than 8 characters';
        } else if (this.state.newPassword.indexOf(' ') >= 0 || this.state.oldPassword.indexOf(' ') >= 0) {
            this.state.warning = 'Password contains spaces';
        } else if (this.state.newPassword.length > 0 && this.state.newPassword === this.state.oldPassword) {
            this.state.warning = 'new_password = old_password';
        } else {
            this.state.warning = '';
        }
        // this.setState({warning: this.state.warning});
        return (
            <View style={styles.view}>
                {utils.renderif(!this.state.loading && this.state.warning.length, this.getWarningMessage())}
                {utils.renderif(this.state.changePassword, this.getChangePasswordView())}
                {utils.renderif(!this.state.changePassword, this.getChangePasswordButton())}
                {utils.renderif(!this.state.changePassword, this.getLogoutButton())}
                {utils.renderif(this.state.loading, <Loading />)}
            </View>
        )
    }
}