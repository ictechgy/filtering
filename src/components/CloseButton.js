import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { Icon } from 'react-native-elements'

export default class CloseButton extends Component{

    buttonListener = () => {
        Navigation.dismissAllModals()
    }

    render(){
        return(
            <TouchableOpacity onPress={this.buttonListener}>
                <Icon name="close" />
            </TouchableOpacity>
        )
    }
}