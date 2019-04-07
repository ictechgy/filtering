import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, SectionList, SafeAreaView, ActivityIndicator } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { ButtonGroup, Image, Button, Icon  } from 'react-native-elements';

export default class DetailScreen extends Component{

    static options(passProps){
        return{
            topBar : {
                title : {
                    text : "상세보기",
                    alignment : "center"
                    },
                rightButtons : [
                    {
                        id : "FavoriteButton",
                        component : {
                            name : "filtering.FavoriteButton",
                            passProps : {
                                "itemInfo" : passProps.itemInfo,
                            }
                        }
                    }
                ]
            }
        }
    }

    constructor(props){
        super(props)
        Navigation.events().bindComponent(this);
        this.dataSetting()
    }

    dataSetting = () => { 
        let item = this.props.itemInfo;

        this.state = {
            itemInfo : item,
            ITME_SEQ : item.ITEM_SEQ,
            ITEM_NAME : item.ITEM_NAME,
            EE_DATA : item.EE_DOC_DATA,
            UD_DATA : item.UD_DOC_DATA,
            NB_DATA : item.NB_DOC_DATA,
            
            selectedIndex : 0,   
            contents : item.EE_DOC_DATA,

            imageCount : 0,
            thumbnails : [],
        }
    }
    
    componentDidMount(){
        this.imageSearch()
    }

    imageSearch = ()=>{
        let itemName = this.props.itemInfo.ITEM_NAME;
        let displayNum = 6  

        let defaultURL = "https://openapi.naver.com/v1/search/image.xml"
        let clientID = "#"
        let clientSecret = "#"

        let headers = new Headers();
        headers.append("X-Naver-Client-Id", clientID)
        headers.append("X-Naver-Client-Secret", clientSecret)

        let settings = {
            method : "GET",
            headers : headers
        }

        let queryURL = defaultURL + "?query="+encodeURI(itemName)+"&display="+displayNum+"&sort=sim"

        let request = new Request(queryURL)

        fetch(request, settings)
        .then((response)=>{
            return response.text()
        })
        .then((restxt)=>{
            let XMLParser = require('react-xml-parser');
            const resultXML = new XMLParser().parseFromString(restxt)
            return resultXML
        })
        .then((resXML)=>{
            let count = resXML.getElementsByTagName('total')[0].value
            if(count === "0") { //사진 검색결과가 없을경우
                return;
            }  

            let thumbnails = resXML.getElementsByTagName('thumbnail')

            let thumbnailValues = thumbnails.map((l, i)=>
                l.value   
            ) 
            
            this.setState({
                imageCount : Number(count),
                thumbnails : thumbnailValues
            })
        })

    }

    updateIndex = (selNum)=>{ 
        let errand
        if(selNum===0){
            errand = this.state.EE_DATA
        }else if(selNum===1){
            errand = this.state.UD_DATA
        }else if(selNum===2){
            errand = this.state.NB_DATA
        }
        this.setState({
            selectedIndex : selNum,
            contents : errand
        })
    }

    basketPressed = () => {    //shopping
        Navigation.showModal({
            stack : {
                children : [{
                    component : {
                        name : "filtering.ShoppingModalScreen",
                        passProps : {
                            item_name : this.state.ITEM_NAME
                        },
                    }
                }]
            }
        })
    }

    render(){
        return(
            <SafeAreaView>
                <Text style={{fontFamily: "NanumSquareRoundR", fontSize : 18, fontWeight : 'bold'}}>품목 기준 코드 : {this.state.ITME_SEQ}</Text>
                <Text style={{fontFamily: "NanumSquareRoundR", fontSize : 18, fontWeight : 'bold'}}>품목명 : {this.state.ITEM_NAME}</Text>

                <Button     
                    type="clear"
                    icon={
                        <Icon
                            type="material-community"
                            name="basket"
                            size={30}
                            color="green"
                        />
                    }
                    onPress={this.basketPressed}
                />

                <View style={{ flexDirection : "row",  flexWrap : "wrap", padding : 15, justifyContent : "space-evenly"}}>
                    {
                        (this.state.imageCount)?
                        this.state.thumbnails.map((l, i) => 
                            <View style={{padding : 5}} key={i}>
                                <Image source={{uri : l }}
                                    style={{width : 100, height : 100 }}
                                    containerStyle={{width : "30%", }}
                                    PlaceholderContent={<ActivityIndicator />}
                                />
                            </View>
                        )
                        :
                        <View></View>
                    }

                    {
                        (this.state.imageCount)?
                        <Text style={{fontFamily : "NanumBarunGothic", fontSize : 10, fontWeight : "bold", color : "red"}}>
                            해당 제품명을 토대로 네이버 이미지 검색을 진행 한 결과가 표시됐으며 제품과 관련없는 이미지가 표시될 수 있습니다.
                            참고용으로만 사용하시길 바랍니다.
                        </Text>
                        :
                        <View></View>
                    }
                </View>
                
                <ButtonGroup 
                    buttons={["효능효과", "용법용량", "주의사항(일반)"]}
                    onPress={this.updateIndex}
                    selectedIndex={this.state.selectedIndex}
                />
                <ScrollView style={{marginBottom : 100}}>
                    <SectionList
                        style={styles.container}
                        sections={this.state.contents}
                        renderSectionHeader={ ({section}) =>
                            <Text style={styles.title}>{section.title}</Text>
                        }
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item}) => <Text style={styles.text}>{item}</Text>}
                    />
                </ScrollView>

            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container : {
        paddingTop : 5,
        marginBottom : 100
    },
    title : {
        fontFamily : "NanumBarunGothic",
        paddingLeft : 10,
        paddingRight : 10,
        fontSize : 15,
        fontWeight : "bold"
    },
    text : {
        fontFamily : "NanumBarunGothic",
        paddingLeft : 20,
        paddingRight : 20,
        paddingTop : 5
    }
})