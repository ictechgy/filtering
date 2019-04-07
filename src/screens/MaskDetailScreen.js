import React, { Component } from 'react';
import { WebView } from 'react-native-webview';

export default class MaskDetailScreen extends Component {

    constructor(props){
        super(props);
        this.state = {
            item_seq : this.props.item_seq
        }
    }

    render(){
        const item_seq = this.state.item_seq
        return(
            <WebView
                source={{uri : "https://nedrug.mfds.go.kr/pbp/CCBBB01/getItemDetail?itemSeq="+item_seq}}
            />
        )
    }
}