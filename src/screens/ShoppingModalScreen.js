import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
import { Navigation } from 'react-native-navigation'

export default class ShoppingModalScreen extends Component {

    constructor(props){
        super(props)
        Navigation.events().bindComponent(this);
    }

    static options(passProps){
        return{
            topBar : {
                title : {
                    text : "네이버 쇼핑보기"
                },
                leftButtons : {
                    id : "closeButton",
                    component : {
                        name : "filtering.CloseButton"
                    }
                }
            }
        }
    }

    render(){
        return(
            <WebView
                source={{uri : "https://msearch.shopping.naver.com/search/all.nhn?query="+ encodeURI(this.props.item_name) +"&cat_id=&frm=NVSHATC"}}
            />
        )
    }
}