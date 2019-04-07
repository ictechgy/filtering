import React, { Component } from 'react';
import { SafeAreaView, FlatList, Platform, Alert, Linking, Text, View, StyleSheet } from 'react-native';
import { SearchBar, ListItem } from 'react-native-elements';
import RNFetchBlob from 'rn-fetch-blob'
import XLSX from 'xlsx'
import { Navigation } from 'react-native-navigation';

export default class MaskListModalScreen extends Component {
    
    static options(passProps){
        return{
            topBar : {
                title : {
                    text : "허가받은 마스크 목록",
                    alignment : "center"
                },
                leftButtons : {
                    id : "closeButton",
                    component : {
                        name : "filtering.CloseButton"
                    }
                },
                rightButtons : {
                    id : "update",
                    component : {
                        name : "filtering.UpdateList"
                    }
                }    
            }
        }
    }

    constructor(props){
        super(props)
        this.state = {
            datas : [],
            searchInput : "",
            fileExist : false
        }
    }
    
    componentDidMount(){
        this.readMaskFile()
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

    readMaskFile = () => {
        try{
            let fileUri = "maskData.xlsx"
            let filePath;
            if ( Platform.OS === 'ios'){
                let arr = fileUri.split('/')
                const dirs = RNFetchBlob.fs.dirs
                filePath = `${dirs.DocumentDir}/${arr[arr.length - 1]}`      
            } else {
                filePath = RNFetchBlob.fs.dirs.DocumentDir+"/maskData.xlsx"
            }                                   

            RNFetchBlob.fs.readFile( filePath , 'base64').then((res) => {
                const workBook = XLSX.read(res, {type : "base64"})
                const workBookJSON = XLSX.utils.sheet_to_json(workBook.Sheets.Sheet0)

                let datas = []
                workBookJSON.forEach((value)=>{
                    datas.push({
                        name : value.제품명,
                        manufacturer : value.업체명,
                        item_seq : value.품목기준코드
                    })
                })

                this.setState({
                    fileExist : true,
                    originDatas : workBookJSON,
                    datas : datas,
                    refinedData : datas
                })

            })
            .catch((error)=>
                Alert.alert(
                    '파일이 존재하지 않습니다.',
                    '오른쪽 위의 버튼을 눌러 파일을 다운받아 주세요.',
                    [
                        {text : "OK"}
                    ],
                    {cancelable : false}
                )
            )

        }catch(error){
            Alert.alert(
                '오류 발생',
                '파일을 불러오던 도중 오류가 발생하였습니다.\n오류가 해결되지 않는 경우 Report버튼을 눌러주십시오.',
                [
                    {text : "Report", onPress : () => this.sendReport(error)},
                    {text : "OK"}
                ],
                {cancelable : false}
            ),
            this.setState({
                fileExist : false
            })
        }
    }

    itemPress = (index) => {
        const data = this.state.refinedData[index]
        const seq = data.item_seq

        Navigation.push(this.props.componentId, {
            component : {
                name : "filtering.MaskDetailScreen",
                passProps : {item_seq : seq}
            }
        })
    }   

    render(){
        return (  
            <SafeAreaView style={{flex : 1}}>
                <SearchBar
                    placeholder="찾고자 하는 마스크명을 입력하여 주세요"
                    lightTheme
                    onChangeText={(text)=>
                        this.setState({
                            searchInput : text,
                            refinedData : this.state.datas.filter((item)=> item.name.includes(text))
                        })
                    }
                    value={this.state.searchInput}
                />

                {
                    (this.state.fileExist)?
                    <View>
                        <Text style={{alignSelf : "center"}}>데이터 출처 : 식품의약품안전처 / 주기적으로 업데이트 해주세요.</Text>
                        <FlatList
                            data = { this.state.refinedData }
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={ ({item, index}) =>
                                <ListItem 
                                    title={item.name}
                                    subtitle={" - 업체명 : "+item.manufacturer}
                                    onPress={()=>{this.itemPress(index)}}
                                    titleStyle={styles.titleStyle}
                                    subtitleStyle={styles.subtitleStyle}
                                />
                            }
                        />
                    </View>
                    :  
                        <View style={styles.fileDoesNotExistView}>
                            <Text style={styles.fileDoesNotExist}>파일이 존재하지 않습니다.</Text>
                            <Text style={styles.fileDoesNotExist}>다운로드를 위해 오른쪽 위 버튼을 눌러주세요.(인터넷 연결 필요)</Text>
                            <Text style={styles.fileDoesNotExist}>(파일이 보이지 않는 경우 도큐먼트 저장공간 권한을 확인하여 주세요.)</Text>
                        </View>
                }
            </SafeAreaView>
        )  
    }   
}

const styles = StyleSheet.create({
    titleStyle : {
        fontFamily : "NanumBarunGothic",
        fontWeight : "bold",
    },
    subtitleStyle : {
        fontFamily : "NanumSquareRoundR",
    },
    fileDoesNotExistView : {
        flex : 1,
        alignItems : "center",
        justifyContent : "center"
    },
    fileDoesNotExist : {
        fontFamily : "NanumBarunGothic"
    }
})