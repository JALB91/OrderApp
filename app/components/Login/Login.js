import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import Button from '../Button';
import styles from './styles';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            'username': '',
            'password': ''
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                style={styles.input}
                multiline={false}
                onChangeText={text => this.setState({'username': text})}
                value={this.state['username']}
                placeholder='Username'
                />
                <TextInput
                style={styles.input}
                multiline={false}
                onChangeText={text => this.setState({'password': text})}
                value={this.state['password']}
                placeholder='Password'
                secureTextEntry={true}
                />
                <Button
                onPress={() => this.props.onLogin(this.state.username, this.state.password)}
                text='Login'
                />
            </View>
        )
    }
}