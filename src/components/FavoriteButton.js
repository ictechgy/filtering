import React, { Component } from 'react';
import { TouchableOpacity, Image, StyleSheet, Alert, Linking } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'

export default class FavoriteButton extends Component {
    constructor(props){
        super(props);
        this.state={
            item : this.props.itemInfo,
            added : false
        }
    }

    sendReport = (error) => {
        Linking.canOpenURL('mailto:ictechgy@gmail.com')
        .then((supported)=> {
            if(!supported){
                Alert.alert(
                    '이메일 어플리케이션을 찾을 수 없음', 
                    '메일을 보낼 어플리케이션을 찾을 수 없습니다.',
                    [
                        {text : 'OK'}
                    ],
                    {cancelable : false}
                );
            }else{
                return Linking.openURL("mailto:ictechgy@gmail.com?subject=error_report&body="+error)
            }
        })
    }

    _checkingData = async() => {
        const itemSeq = this.state.item.ITEM_SEQ

        try{
            const value = await AsyncStorage.getItem(itemSeq)
            if(value === null){
                this.setState({
                    added : false
                })
            }else{
                this.setState({
                    added : true
                })
            }
        }catch(error){
            Alert.alert(
                '오류발생',
                '데이터 체크도중 오류발생',
                [
                    {text: 'Report', onPress : ()=>this.sendReport(error) },
                    {text: 'OK'},
                ],
                {cancelable: false},
              );
              this.setState({ added : false })
        }
    }

    _modifyData = async()=>{
        const item_seq = this.state.item.ITEM_SEQ

        try{
            if(this.state.added){
                await AsyncStorage.removeItem(item_seq)
                Alert.alert(
                    '즐겨찾기에서 삭제되었습니다.',
                    '',
                    [
                      {text: 'OK'},
                    ],
                    {cancelable: true},
                );
                this.setState({
                    added : false
                })
            }else{   //즐겨찾기 추가
                await AsyncStorage.setItem(item_seq, JSON.stringify(this.state.item))
                Alert.alert(
                    '즐겨찾기에 추가되었습니다.',
                    '',
                    [
                      {text: 'OK'},
                    ],
                    {cancelable: true},
                );
                this.setState({
                    added : true
                })
            }
        }catch(error){
            Alert.alert(
                '오류발생',
                '즐겨찾기 추가 도중 오류발생',
                [
                    {text: 'Report', onPress : ()=>this.sendReport(error) },
                    {text: 'OK'},
                ],
                {cancelable: false},
              );
              this.setState({ added : false })
        }
    }

    componentDidMount(){
        this._checkingData();
    }

    render(){
        return(
                <TouchableOpacity onPress={this._modifyData}>
                    {
                        (this.state.added)?
                            <Image source={require('../../assets/images/filledStar.png')} style={styles.filled}/>
                        :
                            <Image source={require('../../assets/images/emptyStar.png')} style={styles.empty}/>
                    }
                </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    filled : {
        tintColor : "#EE3A1F"
    },
    empty : {
        tintColor : "#EE3A1F"
    }
})
