import React, { Component } from 'react';
import { View, FlatList, Text, ActivityIndicator, StyleSheet, Alert, SafeAreaView, Linking } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { ListItem } from 'react-native-elements';

export default class ListScreen extends Component{

    constructor(props){
        super(props);
        Navigation.events().bindComponent(this);
        this.state = {
            searchData : this.props.searchData,
            pageNum : 1,
            xml : "",
            items : [],
            totalCount : -1,
            requestURL : "http://apis.data.go.kr/1471057/NonMdcinPrductPrmisnInfoService/getNonMdcinPrductPrmisnInfoList",
            serviceKey : "#",
            numOfRows : 10,
            totalPage : 0,
            nameList : [],
            isVisible : false
        }
    }

    static options(passProps){
        return{
            topBar : {
                title : {
                    text : "검색 결과",
                    alignment : "center"
                },
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
    
    searchFromServer = () => {
       
        return (
            fetch(this.state.requestURL   
                + "?serviceKey="+this.state.serviceKey
                + "&item_name="+encodeURIComponent(this.state.searchData)
                + "&pageNo="+this.state.pageNum
                + "&numOfRows="+this.state.numOfRows, 
            )  
            .then(response => 
                response.text(),
            )
            .catch(error=>{  
                Alert.alert(
                    "오류발생",
                    "검색 결과를 가져오는 도중 오류가 발생하였습니다. ",
                    [
                        {text : "Report", onPress : ()=>this.sendReport(error)},
                        {text : "OK"}
                    ],
                    {cancelable : false}
                )
            })
            
        )
    }

    readyContent = async () => {
        try{
            let response = await this.searchFromServer();

            const XMLParser = require('react-xml-parser');
            const resultXML = new XMLParser().parseFromString(response);

            const resultTotalCount = resultXML.getElementsByTagName('totalCount')[0].value

            if (resultTotalCount === "0") {
                this.noResults();
                return;
            }
            const resultItems = resultXML.getElementsByTagName('item');
            
            const pageCount = parseInt(resultTotalCount/this.state.numOfRows) + ( (resultTotalCount % this.state.numOfRows === 0)? 0 : 1 );

            let name_list = []
            for(i=0; i<resultItems.length;i++){
                name_list.push({name : resultItems[i].children[1].value})
            }

            this.setState({     
                xml : this.state.xml + resultXML,
                items : this.state.items.concat(resultItems), 
                totalCount : resultTotalCount,   //검색결과 개수
                totalPage : pageCount,      //생성해야하는 전체 페이지 수
                nameList : this.state.nameList.concat(name_list),
            })
        }catch(error){
            Alert.alert(
                '오류발생',
                '',
                [
                    {text : "Report", onPress : () => this.sendReport(error)},
                    {text : "OK"}
                ],
                {cancelable : false}
            )    
        }
    }

    noResults = () => {
        Alert.alert(
            '결과를 찾을 수 없음',
            "입력하신 이름과 일치하는 제품을 찾을 수 없습니다. 제품명을 다시 확인해주세요.",
            [
                {text : '확인', onPress : () => Navigation.pop(this.props.componentId)}
            ],
            {cancelable:false}
        )
    }

    componentDidMount(){  
        this.readyContent();
    }

    _pressItem = async (index) => {
        const item = this.state.items[index];

        let item_seq = item.getElementsByTagName('ITEM_SEQ')[0].value;
        let item_name = item.getElementsByTagName('ITEM_NAME')[0].value;
        
        let EE_DOC_DATA = item.getElementsByTagName('EE_DOC_DATA')[0];
        let EE_articles = EE_DOC_DATA.getElementsByTagName('ARTICLE');
        let eeDatas = [];
        for(i=0; i<EE_articles.length; i++){
            eeDatas.push({title : EE_articles[i].attributes.title, data : []});
            let paragraphs = EE_articles[i].getElementsByTagName('PARAGRAPH')
            for(j=0; j<paragraphs.length; j++){
                eeDatas[i].data.push(paragraphs[j].value)
            }
        }
        
        let UD_DOC_DATA = item.getElementsByTagName('UD_DOC_DATA')[0];
        let UD_articles = UD_DOC_DATA.getElementsByTagName('ARTICLE');
        let udDatas = [];
        for(i=0; i<UD_articles.length; i++){
            udDatas.push({title : UD_articles[i].attributes.title, data : []});
            let paragraphs = UD_articles[i].getElementsByTagName('PARAGRAPH')
            for(j=0; j<paragraphs.length; j++){
                udDatas[i].data.push(paragraphs[j].value)
            }
        }

        let NB_DOC_DATA = item.getElementsByTagName('NB_DOC_DATA')[0];
        let NB_articles = NB_DOC_DATA.getElementsByTagName('ARTICLE');
        let nbDatas = [];
        for(i=0; i<NB_articles.length; i++){
            nbDatas.push({title : NB_articles[i].attributes.title, data : []});
            let paragraphs = NB_articles[i].getElementsByTagName('PARAGRAPH')
            for(j=0; j<paragraphs.length; j++){
                nbDatas[i].data.push(paragraphs[j].value)
            }
        }

        const refined_item = {
            ITEM_SEQ : item_seq,
            ITEM_NAME : item_name,
            EE_DOC_DATA : eeDatas,
            UD_DOC_DATA : udDatas,
            NB_DOC_DATA : nbDatas
        }

        await Navigation.push(this.props.componentId,{
            component : {
                name : "filtering.DetailScreen",
                passProps : {
                    "itemInfo" : refined_item
                },
                options : {
                    bottomTabs : {
                        visible : false
                    }
                }
            }
        })
    }

    _onEndReached = ()=> {
        if(this.state.items.length == this.state.totalCount) return;
        this.setState({
            pageNum : this.state.pageNum+1,
            isVisible : true
        })
        this.readyContent()
        this.setState({isVisible : false})
    }

    render(){   
        return(
            <SafeAreaView style={styles.container}>
                {
                    (this.state.xml === "")?
                    <View style={styles.indicator}>
                        <ActivityIndicator size="large" color="#0000ff"/>
                    </View>
                    : 
                    <SafeAreaView style={{flex : 10}}>
                        <Text style={{alignSelf : "center"}}>'{this.state.searchData}' 에 대하여 총 {this.state.totalCount}개의 검색결과를 찾았습니다.</Text>
                        <FlatList  
                            data={this.state.nameList}
                            renderItem={ ({item, index}) =>
                                <ListItem bottomDivider={false} containerStyle={styles.itemContainer} titleStyle={styles.item} onPress={()=> this._pressItem(index)} title={item.name} />
                            }
                            keyExtractor={(item, index)=> index.toString()}
                            onEndReached={this._onEndReached}
                            onEndReachedThreshold={0.05}  
                        />
                    </SafeAreaView>
                }
                {
                    this.state.isVisible &&
                    <ActivityIndicator size="small" color="gray" />
                }
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container : {
      flex : 1,
      justifyContent : "center"  ,
      backgroundColor: 'white',
    },
    indicator : {
        flex : 1,
        justifyContent : "center",
    },
    itemContainer : {
        borderBottomColor : "red",
    },
    item : {
        fontFamily : "NanumSquareRoundR",
    },
})