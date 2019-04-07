import React, { Component } from 'react';
import { TouchableOpacity, Alert, Linking, PermissionsAndroid, Platform } from 'react-native';
import { Icon } from 'react-native-elements';
import RNFetchBlob from 'rn-fetch-blob';
import { Navigation } from 'react-native-navigation';

export default class UpdateList extends Component {

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

    checkPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
              {
                title: '저장소 권한이 필요합니다.',
                message:
                  '마스크 목록을 불러와 저장하려면 권한이 필요합니다. ' +
                  '권한을 허용해 주세요.',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
              },
            );
            return granted
        } catch (error) {
            Alert.alert(
                '오류발생',
                '식품의약품 안전처로부터 데이터를 가져오는 도중 오류가 발생하였습니다. 인터넷 연결을 확인하여주십시오.\n오류가 지속되는 경우 리포트를 보내주시길 바랍니다.',
                [
                    {text : 'Report', onPress : ()=> this.sendReport(error) },
                    {text : "OK"}
                ],
                {cancelable : false}
            )
            Navigation.dismissAllModals()
        }
    }

    updateList = async () => {
        if( Platform.OS === "android" ){
            const granted = await this.checkPermission()
            if (granted === PermissionsAndroid.RESULTS.DENIED){  //acess denied
                Alert.alert(
                    '자료를 받을 수 없음',
                    '권한 거부로 마스크 데이터를 받아올 수 없습니다.',
                    [
                        {text : "OK"}
                    ],
                    {cancelable : false}
                )
                return;
            }
        }
        let dirs = RNFetchBlob.fs.dirs
        await RNFetchBlob
        .config({
            path : dirs.DocumentDir + '/maskData.xlsx',
            appendExt : "xlsx"
        })
        .fetch("POST", "https://nedrug.mfds.go.kr/searchDrug/getExcel", {  
            "Host" : "nedrug.mfds.go.kr",
            "Connection" : "keep-alive",
            "Origin" : "https://nedrug.mfds.go.kr",
            "Referer" : "https://nedrug.mfds.go.kr/searchDrug?sort=&sortOrder=false&searchYn=true&page=1&searchDivision=detail&itemName=&entpName=&ingrName1=&ingrName2=&ingrName3=&itemSeq=&stdrCodeName=&indutyClassCode=B0&sClassNo=32200&etcOtcCode=&makeMaterialGb=&searchConEe=AND&eeDocData=&searchConUd=AND&udDocData=&searchConNb=AND&nbDocData=&itemNo=&startPermitDate=&endPermitDate=",
        },
        [   //form Data
            {name : "sortOrder", data : "false"},
            {name : "searchYn", data : "true"},
            {name : "page", data : "1"},
            {name : "searchDivision", data : "detail"},
            {name : "indutyClassCode", data : "B0"},
            {name : "sClassNo", data : "32200"},
            {name : "searchConEe", data : "AND"},
            {name : "searchConUd", data : "AND"},
            {name : "searchConNb", data : "AND"},
            {name : "excelSearchCnt", data : "5000"}
        ])
        .then((res)=>{
            let status = res.info().status;
            if(status ==200){
                Alert.alert(
                    '업데이트 성공',
                    '파일 가져오기 성공.\n(출처 : 식품의약품안전처)\n 기존목록 제거를 위해 화면이 닫힙니다.\n 허가목록 조회버튼을 다시 눌러주세요.',
                    [
                        {text : "OK", onPress : ()=> Navigation.dismissAllModals() }
                    ],
                    {cancelable : false}
                )
            }else{
                Alert.alert(
                    '오류발생',
                    '식품의약품 안전처로부터 데이터를 가져오는 도중 오류가 발생하였습니다. 인터넷 연결을 확인하여주십시오.\n오류가 지속되는 경우 리포트를 보내주시길 바랍니다.',
                    [
                        {text : 'Report', onPress : ()=> this.sendReport(error) },
                        {text : "OK"}
                    ],
                    {cancelable : false}
                )
            }
        })
        .catch((error)=> 
            Alert.alert(
                '오류발생',
                '식품의약품 안전처로부터 데이터를 가져오는 도중 오류가 발생하였습니다. 인터넷 연결을 확인하여주십시오.\n오류가 지속되는 경우 리포트를 보내주시길 바랍니다.',
                [
                    {text : 'Report', onPress : ()=> this.sendReport(error) },
                    {text : "OK"}
                ],
                {cancelable : false}
            )
        )
    }

    render(){
        return(
            <TouchableOpacity onPress={this.updateList}>
                <Icon 
                    name="update"
                    color="blue"
                />
            </TouchableOpacity>
        )
    }
}