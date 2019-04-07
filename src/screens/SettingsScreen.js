import React, {Component} from 'react';
import { View, Text, SafeAreaView, StyleSheet, Linking, Alert } from 'react-native';
import { Overlay, Card, Button } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage'
import {Navigation} from 'react-native-navigation'

export default class SettingsScreen extends Component{

    static options(passProps){
        return{
            topBar : {
                title : {
                    text : "설정",
                    fontFamily : "NanumBarunGothic",
                    alignment : "center"
                }
            }
        }
    }

    constructor(props){
        super(props)
        this.state={
            isVisible : false
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

    removeAllFavorites = async () => {
        try{
            let keys = await AsyncStorage.getAllKeys()
            if(keys.length === 0){
                Alert.alert(
                    '즐겨찾기 한 내용이 존재하지 않습니다.',
                    '',
                    [
                        {text : "OK"}
                    ]
                )
            }else{
                await AsyncStorage.multiRemove(keys);
                Alert.alert(
                    '삭제 완료',
                    '즐겨찾기에 존재하는 모든 목록을 삭제하였습니다.',
                    [
                        {text : "OK"}
                    ],
                    {cancelable : false}
                )
            }
        }catch(error){
            Alert.alert(
                '오류가 발생하였습니다.',
                '즐겨찾기 목록을 삭제하던 도중 오류가 발생하였습니다.',
                [
                    {text : "Report", onPress : () => this.sendReport(error)},
                    {text : 'OK'}
                ],
                {cancelable : false}
            )
        }
    }

    licenseButton = () => {
        this.setState({isVisible : false})
        Navigation.push(this.props.componentId, {
            component : {
                name : "filtering.LicenseScreen"
            }
        })
    }

    render(){
        return(
            <SafeAreaView>
                <View>
                    <Button 
                        title="앱에 대하여"
                        onPress={()=>{this.setState({isVisible : true})}}
                        type="clear"
                    />
                    <Overlay
                        isVisible = {this.state.isVisible}
                        onBackdropPress={() => {this.setState({isVisible : false})}}
                        height="auto"
                        width="auto"
                    >
                        <View style={{fontFamily : "NanumBarunGothic"}}>  
                            <Card title="About">
                                <Text>본 어플리케이션은 "편하게 의약외품(마스크)을 찾고 싶다." 라는 생각으로 만든 어플리케이션입니다. 인터넷이나 편의점, 마트 등에서 구입하는 의약외품들이 인증된 제품인지 검색할 수 있습니다.{'\n'}</Text>
                                <Text> - 본 어플리케이션의 검색 API는 공공데이터 포털을 이용하였습니다. (데이터 갱신주기 일 1회){'\n'}</Text>
                                <Text> - 검색 결과에서 나오지 않는 경우, 검색어를 다시한번 확인해주세요.{'\n'}</Text>
                                <Text style={{fontWeight : "bold"}}> - 주의 : '필터링'앱을 이용함에 따른 어떠한 피해도 본 어플리케이션에서는 보장하지 않습니다. 참고용으로 쓰시고, 의약품/의약외품에 대한 궁금사항은 의사 및 약사에게 문의하십시오.{'\n'}</Text>
                                <Text> - 모든 데이터의 저작권은 식품의약품안전처/공공데이터포털에 있습니다.{'\n'}</Text>
                                <Text> - 본 어플리케이션에는 나눔글꼴이 적용되어있습니다.{'\n'} </Text>
                                <Text>제작자 : 안진홍 / 이메일 : ictechgy@gmail.com</Text>
                            </Card>
                        </View>
                    </Overlay>

                    <Button 
                        title="제작자에게 문의하기(오류 및 버그/개선사항)"
                        type="clear"
                        onPress={()=>
                            Linking.canOpenURL('mailto:ictechgy@gmail.com')
                            .then((supported)=> {
                                if(!supported){
                                    Alert.alert(
                                        '어플리케이션 찾을 수 없음',
                                        '이메일을 보내기 위한 어플리케이션을 찾을 수 없습니다.\n문의사항이 있는 경우 ictechgy@gmail.com으로 문의하여 주세요.',
                                        [
                                            {text : "OK"}
                                        ],
                                        {cancelable : false }
                                    )
                                }else{
                                    return Linking.openURL("mailto:ictechgy@gmail.com")
                                }
                            })
                        }
                    />

                    <Button 
                        title="오픈소스 라이선스"
                        type="clear"
                        onPress={this.licenseButton}
                    />

                </View>
                <View style={{height : "80%", justifyContent : "flex-end"}}>
                    <Button  
                        title="즐겨찾기 전부 삭제"
                        color="red"
                        type="clear"
                        onPress={this.removeAllFavorites}
                        titleStyle={{color : "red"}}
                    />
                </View>
            </SafeAreaView>
        );
    } 
}

const styles = StyleSheet.create({
})