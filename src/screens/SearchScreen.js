import React, { Component } from 'react';
import { View, Alert, Text, StyleSheet, ImageBackground, KeyboardAvoidingView } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { SearchBar, Button, Icon } from 'react-native-elements';

export default class SearchScreen extends Component {

    static options(passProps){
        return {
            topBar : {
                title : {
                    component : {
                        name : 'filtering.MainTitleIcon',
                        alignment : "center",
                    },
                },
            },
        };
    } 
    
    constructor(props){
        super(props);
        Navigation.events().bindComponent(this);
        this.state = {
            searchData : ""
        }
    }

    searchButtonListener = async () => { 
        if(this.state.searchData !== "") {
            await Navigation.push(this.props.componentId, {
                component : {
                    name : "filtering.ListScreen",
                    passProps : {
                        "searchData" : this.state.searchData
                    },
                    options : {
                        bottomTabs : {
                            visible : false
                        }
                    }
                }
            })
        }else{
            Alert.alert(
                "검색어가 입력되지 않음",
                "검색어를 입력하여 주세요.",
                [
                    { text : "OK"}
                ]
            )
        }
    }

    showMaskList = ()=>{
        Navigation.showModal({
            stack : {
                children : [{
                    component : {
                        name : "filtering.MaskListModalScreen"
                    }
                }]
            }
        })
    }

    render(){
        return(
            <View style={styles.container}>
                <ImageBackground source={require("../../assets/images/background.jpg")} style={{width : "100%", height : "100%"}}>
                    <KeyboardAvoidingView style={styles.searchBarView} behavior="padding" enabled>
                        <SearchBar
                            lightTheme={true}
                            round={true}
                            containerStyle={styles.searchBarContainer}
                            inputContainerStyle={styles.inputContainer}
                            inputStyle={styles.input}

                            placeholder = "제품명을 입력해 주세요"
                            onChangeText={text=>this.setState({searchData : text})}
                            value={this.state.searchData}
                        />
                        <Button style={{marginTop : 10}} type="clear" title="검색" onPress={this.searchButtonListener} />
                    </KeyboardAvoidingView>

                    <View style={{justifyContent : "center", alignItems : "center"}}>
                        <Button 
                            title="보건용 마스크 허가목록 조회"
                            icon={
                                <Icon 
                                    name="warning"
                                />
                            }
                            onPress={this.showMaskList}
                        />
                    </View>

                    <View style={styles.bottomContainer}>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}



const styles = StyleSheet.create({
    container: {    //전체
      flex: 1,
      backgroundColor: '#F5FCFF',
    },
    searchBarView : {   //검색창부분
        flex : 5,
        justifyContent: "center",
        alignItems: 'center',
    },
    searchBarContainer : {
        backgroundColor : "transparent",
        height : "10%",
        width : "100%",
        borderBottomColor : "transparent",
        borderTopColor : "transparent"
    },
    inputContainer : {
        width : "75%",
        alignSelf : "center"
    },
    input : {
        fontFamily : "NanumBarunGothic",
        fontSize : 15,
        color : "#1c294e"
    },
    bottomContainer: {   //하단쪽
        flex : 1,
        fontSize: 20,
        textAlign: 'center',
        alignItems : "center",
        justifyContent : "center"
    },
  });