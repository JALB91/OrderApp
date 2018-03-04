import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native';

export default class Button extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableOpacity style= {this.props.style} onPress= {this.props.onPress}>
                <Text style= {this.props.titleStyle}> {this.props.title} </Text>
            </TouchableOpacity>
        );
    }
}