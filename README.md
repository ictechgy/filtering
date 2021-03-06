# 필터링(filtering)
의약외품/보건용 마스크 검색 어플리케이션 '필터링'입니다.

본 어플리케이션은 페이스북(Facebook) 리액트 네이티브(React-Native, Cross Platform OpenSource Framework)를 이용하여 만들었습니다.
오픈소스 라이브러리 및 라이센스 정보는 [LicenseScreen.js](https://github.com/ictechgy/filtering/blob/master/src/screens/LicenseScreen.js)를 참고하여주세요.


현재 구글 플레이스토어에 안드로이드 전용으로 출시하였으며 ios는 추후 출시 예정입니다. -> iOS는 현재 Swift로 만드는 중.   
<a href="https://play.google.com/store/apps/details?id=com.filtering">https://play.google.com/store/apps/details?id=com.filtering</a>


***보안 등의 이유로 android 및 ios 빌드 파일은 올리지 않았습니다.***
   <hr/>   
   &nbsp;   
   
## 🤔 본 어플리케이션을 만들게된 계기 (What made me create this application?)
2019년도 초 미세먼지가 심하던 겨울-봄, 다x소에서 kf94 마스크를 사려던 도중 손에 든 마스크가 인증을 제대로 받은 제품인지 갑자기 궁금해졌었다.   
비슷한 시기에 뉴스에서 가짜 kf마스크에 대한 이야기를 들었었기 때문이다.   
지금은 https://nedrug.mfds.go.kr/pbp/CCBCC01 를 통해 간단하게 인증여부를 확인할 수 있지만, 당시에는 https://nedrug.mfds.go.kr/searchDrug 로 들어가서 직접 품목코드와 분류기준을 설정해야하는 등 불편함이 컸었다. 당시 식품의약품안전처에서도 아래와 같은 방법으로 검색을 진행하라고 했었다. [해당 공지사항 링크](https://mfds.go.kr/brd/m_578/view.do?seq=41845&srchFr=&srchTo=&srchWord=&srchTp=&itm_seq_1=0&itm_seq_2=0&multi_itm_seq=0&company_cd=&company_nm=&page=1)
<pre>
인터넷 사이트 (nedrug.mfds.go.kr) 접속 → 의약품정보 → 의약품 및 화장품 허가 정보 - 의약품 등 정보검색
→ '품목구분'에서 '의약외품'을 선택한 후 '분류번호'에서 [32200] 보건용 마스크 선택 → '검색' 아이콘 클릭
→ 검색 결과 확인('엑셀다운로드' 아이콘을 클릭하면 검색 결과를 엑셀 파일로 내려받을 수 있음)
</pre>
   
위와 같은 복잡한 검색방식 때문에 마스크 하나 찾아보는데에도 꽤 많은 시간과 노력이 필요했다.   
그래서 '마스크 인증정보를 더 편하게 검색할 수 있는 앱을 만들어보자!' 하고 어플리케이션 제작에 들어갔다.      
   
   
프레임워크는 Apache Cordova, Ionic, Flutter, React Native 4개를 고민했는데, 오픈소스 커뮤니티에 의해 방대한 라이브러리가 존재한다는 점 때문에 RN을 택하게 되었다.
   
   &nbsp;   
   
## 💻 개발 기간 (Development Period)
2019년 1월 ~ 3월(약 3개월)   
*만들던 당시에는 iOS 동작까지 확인했지만 조잡한 디자인과(...) 기능으로 인해 앱스토어 출시는 하지 않았다.(심사과정이 있다는 것이 당시에는 부담스럽게 다가왔다.)*   
개발 및 디자인 모두 혼자서 진행하였다.   
   
   &nbsp;   
   
## 📚 사용한 라이브러리 (Used libraries)
[package.json](https://github.com/ictechgy/filtering/blob/master/package.json)을 보면 알겠지만 여러개의 오픈소스 라이브러리들을 사용했다. 패키지 설치는 주로 의존성을 알아서 관리해주는 yarn을 사용했다.(처음에 npm으로만 했다가 몇번 꼬여도 보고.. expo를 썼다가 라이브러리랑 안맞아서 지우고.. 갈아엎은 것만해도 5개 정도...)
1. [react-native-elements](https://reactnativeelements.com/) Ver. 1.1.0 
2. [react-native-navigation](https://github.com/wix/react-native-navigation) - 처음에는 react navigation을 쓰려했는데 native component를 사용하게 해주는 native navigation을 쓰는게 낫다고 하여 변경하였었다.   
3. [react-native-table-component](https://github.com/Gil2015/react-native-table-component) 
4. [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons)
5. [react-native-webview](https://github.com/react-native-webview/react-native-webview)
6. [react-xml-parser](https://www.npmjs.com/package/react-xml-parser)   
ListScreen.js에서 사용하였으며 공공데이터 API에서 제공하는 데이터 타입이 xml이였기 때문에 이를 파싱하기 위한 목적으로서 사용.
7. [rn-fetch-blob](https://github.com/joltup/rn-fetch-blob)   
MaskListModalScreen.js, UpdateList.js에서 사용하였으며 보건용마스크(kf94, kf80) 허가목록 파일을 디바이스에 저장하고 불러오기 위한 목적으로 사용
8. [xlsx](https://www.npmjs.com/package/xlsx)   
다운로드 받은 보건용 허가목록 파일(xlsx)을 json형태로 변환하기 위한 목적으로 사용
9. [@react-native-community/async-storage](https://github.com/react-native-async-storage/async-storage)   
FavoriteButton.js에서 사용하였으며 유저가 즐겨찾기한 아이템을 저장하기 위한 목적으로 사용   
   
   
   &nbsp;   
   
## 🚀 사용했거나 사용하려 했던 패턴/스킬 (Used Or Tried Patterns And Skills)
1. 비동기 작업에 대한 Async Await(처음에 promise 고민했었던 것으로 기억)
2. 클로저(Closure)와 함수를 1급 객체(고차함수)로 다루기
3. 화살표함수 사용하기(람다식)
4. 메소드 체이닝(처음에 접했을 때 굉장히 신세계적으로 느꼈음)
   
   &nbsp;   
   
## 💦 만들면서 힘들었던 점 (Difficulties)
1. ECMAScript에 대한 이해가 전반적으로 필요했던 점(어려웠다. 특히 함수를 1급객체로 다루는 것이)
2. (위에서 말했지만) 오픈소스 라이브러리에 전적으로 의존했었다보니 버그잡는 것이 너무 힘들었다.
3. React 프레임워크에 대한 기초적이고 전반적인 지식이 부족했던 점은 개발 속도를 더디게 했다. (React 및 그 근간을 이루는 프레임워크에 대한 지식이 하나도 없었다보니 특정 코드가 왜, 어떻게 돌아가는 것인지 이해하기 어려웠음)
4. 앱을 만들면서 Android와 iOS에서 다 잘 돌아가는지 확인을 하는 과정이 **정말정말로** 힘들었다. 하나의 OS에서만 작동하고 다른 OS에서는 작동하지 않는 경우 빌드파일을 직접 건드려줘야 했는데 네이티브 개발에 전무했던 그때의 나로서는 오류 하나하나가 굉장히 버거웠다. (두 OS에서 다 돌아가지 않는 것은 보통 내가 작성한 코드상의 문제였다.) 
5. Virtual Dom 브라우저 렌더링과 같은 React에 대한 이해(State와 Props 포함)
6. 수많은 괄호들의 향연   
특히 {} 중괄호..   
   
&nbsp;   
   
자바스크립트에 대한 지식 및 공식 문서, Stack overflow에만 의지하며 꾸역꾸역 이 앱을 만들었다. react, babel, jest 등에 대한 제대로 된 이해가 없었다보니 오류를 해결하는 것은 굉장히 힘들었었다. ([velopert](https://velopert.com/)님의 글을 정말 많이 참고했다.)   
오픈소스로서 라이브러리가 운영된다는 것은 원하는 특정 기능이 미리 구현되어있다면, 가져와서 바로 쓰기만 하면 된다는 점에서 굉장히 좋다고 생각한다.   
하지만, '복잡한 의존성 관계들 + 라이브러리에서 오류가 발생한 부분은 해결될 때까지 마냥 기다릴 수밖에 없다는 점 + 라이브러리로서 구현되어있지 않은 기능은 어찌 할 도리가 없다는 점'에서 단점도 있다고 생각한다. (물론 오픈소스 라이브러리 컨트리뷰션을 할 정도의 실력이라면 문제 없겠지만..)   
   
   &nbsp;   
   
## 💬 기능(사용법) 

* 첫 화면에서 검색하고자 하는 제품명을 입력하여 검색할 수 있습니다.
이후에 제품명을 클릭하여 상세 정보를 볼 수 있고, 초록색 바구니 아이콘을 클릭하여 네이버 쇼핑정보를 볼 수 있습니다. 자주 찾는 제품은 오른쪽 위의 별 버튼을 눌러 즐겨찾기로 추가할 수 있습니다.

<pre>
검색이 되지 않는다면 인터넷 연결을 확인하여주시고 제품명을 한번 더 확인해주세요. (식품의약품안전처에 등록된 이름으로 조회합니다.)
네이버 쇼핑정보는 해당 제품명(풀네임)을 그대로 이용하여 검색하기 때문에 검색결과가 나오지 않을 수 있습니다.
</pre>


* 첫 화면에서 '보건용 마스크 허가목록 조회'버튼을 클릭한 뒤에 오른쪽 위의 아이콘을 눌러 데이터를 받아주세요. 이후에 마스크 허가목록을 조회할 수 있습니다.
마스크 이름을 클릭하시면 식품의약품안전처를 통해 제품에 대한 상세정보를 확인하실 수 있습니다.
<pre>
목록에 대한 것은 버튼을 눌러 직접 업데이트 해주셔야 합니다.
</pre>

* 즐겨찾기 한 목록은 아래 탭 중 Favorite 화면에서 조회 및 관리하실 수 있습니다.

* Setting 화면에서는 즐겨찾기 모두 삭제 및 어플리케이션에 대한 정보를 확인하실 수 있습니다.
   
   &nbsp;   
   
## 🛠 개선해야할 점/추가했으면 하는 기능 (Needs to be improved / Want to add)
1. 디자인 - 앱 아이콘부터 전체적인 내부 컴포넌트 디자인까지..
2. 사진/바코드를 찍어서 검색하는 방식은 어떨까? (혹은 텍스트 인식 OCR)   
찾아봤는데 의약외품에 대한 바코드 정보를 별도로 얻을 수 있는 방법은 존재하지 않았다. [식품의약품안전처 바코드 연계 제품정보 API](http://www.foodsafetykorea.go.kr/api/openApiInfo.do?menu_grp=MENU_GRP31&menu_no=661&show_cnt=10&start_idx=1&svc_no=C005)는 식품에 대한 정보만을 제공하는 듯 보였으며, [대한상공회의소 유통물류진흥원](http://www.gs1kr.org/Service/Service/appl/05.asp)은 제휴를 맺어야 한다고 소개되어 있었다. 바코드 스캔은 Firebase ML Kit를 사용하려 했다.   
사진의 경우 이미지 데이터를 직접 학습시켜야 할 것 같다.   
3. Redux/MobX의 사용을 통한 State 관리
   
   &nbsp;   
   
## 📝 Information
developer email : ictechgy@gmail.com

This application is Copyright © JINHONG AN. All rights reserved

개인정보처리방침 - 
https://developerahn.blogspot.com/2019/04/blog-post.html#more

<hr/>

#### 주의 : '필터링'앱을 이용함에 따른 어떠한 피해도 본 어플리케이션에서는 보장하지 않습니다. 
#### 참고용으로 쓰시고, 의약품/의약외품에 대한 궁금사항은 의사 및 약사에게 문의하십시오.
