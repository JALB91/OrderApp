import React, { Component } from 'react';
import { View, Image } from 'react-native';

export default class Img extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Image source={{ uri: this.props.imgUri }} style={{width: 60, height: 60}}/>
        )
    }
}