import React, { Component } from 'react';
import { View, Text, SafeAreaView, FlatList, StyleSheet, Linking, Alert } from 'react-native';
import { Navigation } from 'react-native-navigation';
import AsyncStorage from '@react-native-community/async-storage'

export default class FavoriteScreen extends Component {

    constructor(props){
        super(props);
        Navigation.events().bindComponent(this)
        this.state={
            datas : [],
            isExist : false
        }
    }
    
    static options(passProps){
        return{
            topBar : {
                title : {
                    text : "즐겨찾기 한 목록",
                    alignment : "center",
                    fontFamily : "NanumBarunGothic"
                }
            }
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

    _retrieveFavorite = async() => {  //즐겨찾기 한 목록 불러오기
        try{
            const keys = await AsyncStorage.getAllKeys()

            if(keys.length === 0){
                this.setState({
                    isExist : false
                })
                return;
            }

            let temp = []
            for(i=0; i<keys.length; i++){
                const value = await AsyncStorage.getItem(keys[i])
                const parsedValue = JSON.parse(value);
                temp.push(parsedValue)
            }
            
            this.setState({
                isExist : true,
                datas : temp
            })

        }catch(error){
            Alert.alert(
                '오류발생',
                '즐겨찾기 목록을 불러오던 도중 오류가 발생하였습니다.',
                [
                    {text : "Report", onPress : ()=> this.sendReport(error)},
                    {text : "OK"}
                ],
                {cancelable : false}
            )
        }
    }

    async componentDidAppear(){
        await this._retrieveFavorite()
    }

    _pressItem = (index) => {
        Navigation.push(this.props.componentId,{
            component : {
                name : "filtering.DetailScreen",
                passProps : {
                    "itemInfo" : this.state.datas[index]
                },
                options : {
                    bottomTabs : {
                        visible : false
                    }
                }
            }
        })
    }

    render(){
        return(
            <SafeAreaView style={styles.container}>
                {
                    (this.state.isExist)?
                    <FlatList 
                        data={this.state.datas}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={ ({item, index}) => 
                            <Text style={styles.item} onPress={()=>{this._pressItem(index)}}>{item.ITEM_NAME}</Text> 
                        }       
                    />             
                    :
                    <View style={styles.notExist}>
                        <Text style={styles.notExistText}>즐겨찾기가 존재하지 않습니다.</Text>
                    </View>
                }
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        fontFamily : "NanumBarunGothic", 
        justifyContent : "center"  ,
        alignItems: 'center',
    },
    item : {
        fontFamily : "NanumBarunGothic",
        fontSize : 20,
        paddingTop : 20,
        paddingLeft : 15,
        paddingRight : 15
    },
    notExist : {
        flex : 1,
        alignItems : "center",
        justifyContent : "center",
    },
    notExistText : {
        fontSize : 20,
        fontFamily : "NanumBarunGothic"
    }
})