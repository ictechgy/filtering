import React, { Component } from 'react';
import { TouchableOpacity, Image } from 'react-native';

export default class MainTitleIcon extends Component {
    render(){
        return(
            <TouchableOpacity>
                <Image style={{width : 120, height : 35}} source={require('../../assets/images/titleIcon.png')} />
            </TouchableOpacity>
        )
    }
}
