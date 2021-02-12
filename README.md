# 필터링(filtering)
의약외품/보건용 마스크 검색 어플리케이션 '필터링'입니다.

본 어플리케이션은 페이스북 크로스 플랫폼 오픈소스 프레임워크인 리액트 네이티브(React-Native)를 이용하여 만들었습니다.
오픈소스 라이브러리 및 라이센스 정보는 [LicenseScreen.js](https://github.com/ictechgy/filtering/blob/master/src/screens/LicenseScreen.js)를 참고하여주세요.


현재 구글 플레이스토어에 안드로이드 전용으로 출시하였으며 ios는 추후 출시 예정입니다. -> iOS는 현재 Swift로 만드는 중.   
<a href="https://play.google.com/store/apps/details?id=com.filtering">https://play.google.com/store/apps/details?id=com.filtering</a>


***보안 등의 이유로 android 및 ios 빌드 파일은 올리지 않았습니다.***
   <hr/>   
   
### 본 어플리케이션을 만들게된 계기
2019년 3월 미세먼지가 심하던 봄, 다x소에서 kf94 마스크를 사려던 도중 손에 든 마스크가 인증을 제대로 받은 제품인지 갑자기 궁금해졌었다.   
비슷한 시기에 뉴스에서 가짜 kf마스크에 대한 이야기를 들었었기 때문이다.   
지금은 https://nedrug.mfds.go.kr/pbp/CCBCC01 를 통해 간단하게 인증여부를 확인할 수 있지만, 당시에는 https://nedrug.mfds.go.kr/searchDrug 로 들어가서 직접 품목코드와 분류기준을 설정해야하는 등 불편함이 컸었다. 당시 식품의약품안전처에서도 아래와 같은 방법으로 검색을 진행하라고 했었다. [해당 공지사항 링크](https://mfds.go.kr/brd/m_578/view.do?seq=41845&srchFr=&srchTo=&srchWord=&srchTp=&itm_seq_1=0&itm_seq_2=0&multi_itm_seq=0&company_cd=&company_nm=&page=1)
<pre>
인터넷 사이트 (nedrug.mfds.go.kr) 접속 → 의약품정보 → 의약품 및 화장품 허가 정보 - 의약품 등 정보검색
→ '품목구분'에서 '의약외품'을 선택한 후 '분류번호'에서 [32200] 보건용 마스크 선택 → '검색' 아이콘 클릭
→ 검색 결과 확인('엑셀다운로드' 아이콘을 클릭하면 검색 결과를 엑셀 파일로 내려받을 수 있음)
</pre>
   
그래서.. 마스크 인증정보를 편하게 검색할 수 있는 앱을 만들어보자! 하고 본 어플리케이션을 만들었다.   
만들던 당시에는 iOS 동작까지 확인했지만 조잡한 디자인과(...) 기능으로 인해 앱스토어 출시는 하지 않았다.(심사과정이 있다는 것이 당시에는 부담스럽게 다가왔다.)   

프레임워크는 Apache Cordova, Ionic, Flutter, React Native 4개를 고민했는데, 오픈소스 커뮤니티에 의해 방대한 라이브러리가 존재한다는 점 때문에 RN을 택하게 되었다.   
   
자바스크립트에 대한 지식 및 공식 문서, Stack overflow에만 의지하며 꾸역꾸역 이 앱을 만들었다. react, babel, jest 등에 대한 제대로 된 이해가 없었다보니 오류를 해결하는 것은 굉장히 힘들었었다. ([velopert](https://velopert.com/)님의 글을 정말 많이 참고했다.)   
오픈소스로서 라이브러리가 운영된다는 것은 원하는 특정 기능이 미리 구현되어있다면, 가져와서 바로 쓰기만 하면 된다는 점에서 굉장히 좋다고 생각한다.   
하지만, '복잡한 의존성 관계들 + 라이브러리에서 오류가 발생한 부분은 해결될 때까지 마냥 기다릴 수밖에 없다는 점 + 라이브러리로서 구현되어있지 않은 기능은 어찌 할 도리가 없다는 점'에서 단점도 있다고 생각한다. (물론 오픈소스 라이브러리 컨트리뷰션을 할 정도의 실력이라면 문제 없겠지만..)

## 사용한 라이브러리(Used libraries)
[package.json](https://github.com/ictechgy/filtering/blob/master/package.json)을 보면 알겠지만 여러개의 오픈소스 라이브러리들을 사용했다. 패키지 설치는 주로 의존성을 알아서 관리해주는 yarn을 사용했다.(처음에 npm으로만 했다가 몇번 꼬여도 보고.. expo를 썼다가 라이브러리랑 안맞아서 지우고.. 갈아엎은 것만해도 5개 정도...)
1. [react-native-elements](https://reactnativeelements.com/) Ver. 1.1.0 
2. [react-native-navigation](https://github.com/wix/react-native-navigation) - 처음에는 react navigation을 쓰려했는데 native component를 사용하게 해주는 native navigation을 쓰는게 낫다고 하여 변경하였었다.

## 사용했거나 사용하려 했던 패턴/스킬 (Used Or Tried Patterns And Skills)
1. 비동기 작업에 대한 Async Await(처음에 promise 고민했었던 것으로 기억)
2. 클로저(Closure)와 함수를 1급 객체로 다루기
3. 화살표함수 사용하기(람다식)
4. 메소드 체이닝(처음에 접했을 때 굉장히 신세계적으로 느꼈음)
   
## 만들면서 힘들었던 점
1. ECMAScript에 대한 이해가 전반적으로 필요했던 점(어려웠다. 특히 함수를 1급객체로 다루는 것이)
2. (위에서 말했지만) 오픈소스 라이브러리에 전적으로 의존했었다보니 버그잡는 것이 너무 힘들었다.
3. React 프레임워크에 대한 기초적이고 전반적인 지식이 부족했던 점은 개발 속도를 더디게 했다. (React 및 그 근간을 이루는 프레임워크에 대한 지식이 하나도 없었다보니 특정 코드가 왜, 어떻게 돌아가는 것인지 이해하기 어려웠음)
4. Virtual Dom 브라우저 렌더링
5. 수많은 괄호들의 향연
   
## 기능(사용법)

* 첫 화면에서 검색하고자 하는 제품명을 입력하여 검색할 수 있습니다.
이후에 제품명을 클릭하여 상세 정보를 볼 수 있고, 초록색 바구니 아이콘을 클릭하여 네이버 쇼핑정보를 볼 수 있습니다. 자주 찾는 제품은 오른쪽 위의 별 버튼을 눌러 즐겨찾기로 추가할 수 있습니다.

>검색이 되지 않는다면 인터넷 연결을 확인하여주시고 제품명을 한번 더 확인해주세요. (식품의약품안전처에 등록된 이름으로 조회합니다.)
>>네이버 쇼핑정보는 해당 제품명(풀네임)을 그대로 이용하여 검색하기 때문에 검색결과가 나오지 않을 수 있습니다.


* 첫 화면에서 '보건용 마스크 허가목록 조회'버튼을 클릭한 뒤에 오른쪽 위의 아이콘을 눌러 데이터를 받아주세요. 이후에 마스크 허가목록을 조회할 수 있습니다.
마스크 이름을 클릭하시면 식품의약품안전처를 통해 제품에 대한 상세정보를 확인하실 수 있습니다.
>목록에 대한 것은 버튼을 눌러 직접 업데이트 해주셔야 합니다.

* 즐겨찾기 한 목록은 아래 탭 중 Favorite 화면에서 조회 및 관리하실 수 있습니다.

* Setting 화면에서는 즐겨찾기 모두 삭제 및 어플리케이션에 대한 정보를 확인하실 수 있습니다.

## Information
developer email : ictechgy@gmail.com

This application is Copyright © JINHONG AN. All rights reserved

개인정보처리방침 - 
https://developerahn.blogspot.com/2019/04/blog-post.html#more

<hr/>

#### 주의 : '필터링'앱을 이용함에 따른 어떠한 피해도 본 어플리케이션에서는 보장하지 않습니다. 
#### 참고용으로 쓰시고, 의약품/의약외품에 대한 궁금사항은 의사 및 약사에게 문의하십시오.
