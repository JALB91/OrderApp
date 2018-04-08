import React, { Component } from 'react';
import {
    TouchableOpacity,
    Image,
    Text
} from 'react-native';
import PropTypes from 'prop-types';
import utils from '../../utils';
import styles from './styles';

export default class Button extends Component {
    constructor(props) {
        super(props);
    }

    getText() {
        return (
            <Text style={[styles.text, this.props.textStyle]}>
                {this.props.text}
            </Text>
        )
    }

    getImage() {
        return (
            <Image
            source={this.props.imgUri}
            style={this.props.imgStyle}
            />
        )
    }

    render() {
        return (
            <TouchableOpacity 
            style={[styles.button, this.props.style]}
            onPress={this.props.enabled ? this.props.onPress : null}
            >
                { utils.renderif(this.props.text, this.getText()) }
                { utils.renderif(this.props.imgUri, this.getImage())}
                { this.props.children }
            </TouchableOpacity>
        );
    }
}

Button.propTypes = {
    onPress: PropTypes.func,
    enabled: PropTypes.bool
}

Button.defaultProps = {
    onPress: null,
    enabled: true
}