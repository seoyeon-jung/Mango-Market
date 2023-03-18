# Mango Market (망고 마켓)
### 2023.01.06 - 2023.01.13
- 스파르타코딩클럽 내일배움캠프 React A반 4조 프로젝트
- 당근마켓은 가라, 망고 마켓으로 중고 거래를 할 수 있도록 만든 앱
<br>
<br>

## 사용한 기술 스택  
- React Native
- FireStore
<br>
<br>


## 망고마켓 실제 작동 이미지
- 로그인 <br>
![image](https://user-images.githubusercontent.com/95006849/212221253-efd05887-b90d-4992-bdd1-81daa4a83a7f.png)
- home <br>
![image](https://user-images.githubusercontent.com/95006849/212221416-bf80b93d-ee1b-4484-879a-e069dd927ac4.png)
- 글 작성 <br>
![image](https://user-images.githubusercontent.com/95006849/212221555-ece26db0-c71f-4544-908e-d1b98667b6ab.png)
- my page <br>
![image](https://user-images.githubusercontent.com/95006849/212221488-261a9003-9851-4f64-9fa2-022cf94cc981.png)
- detail page <br>
![image](https://user-images.githubusercontent.com/95006849/212221615-195b4427-7fbe-4f64-84a5-efb2de1f39d7.png)
<br>
<br>

## 구현한 기능
1. 로그인/회원가입 (정서연)
    - 앱 처음 접속 시 로그인/회원가입 해야만 메인 화면으로 들어갈 수 있다
    - 유효성 검사 O (이메일 형식, 비밀번호 형식 지켜야 로그인/회원가입 가능)
    - detail page와 user page에서 로그아웃 시 다시 로그인 페이지로 돌아온다
2. Home (정진수)
    - 전체 글 리스트 불러오기
    - 각 게시글의 이미지 / 제목 / 가격 을 볼 수 있다
    - 각 게시물 클릭 시 detail page로 넘어간다
    - 각 게시글의 댓글의 갯수도 count
3. My Page (김재현)
    - 로그인한 유저의 아이디가 보인다
    - 유저가 작성한 글만 모아서 볼 수 있다
    - 각 게시글 클릭시 detail page로 이동
    - 로그아웃 가능
4. Detail Page 및 post Page  (윤준호)
    <post Page>
    - 게시글 작성 페이지
    - 핸드폰 이미지를 불러와 이미지 추가 가능
    - 이미지 / 제목 / 가격 / 내용 모두 작성하지 않으면 글 등록 불가
    <Detail Page>
    - 각 게시글을 자세히 볼 수 있다 (이미지/제목/가격/내용/작성한 시간/유저)
    - 이미지 / 제목 / 가격 / 내용 모두 작성하지 않으면 글 등록 불가
    - 글을 작성한 유저가 detail page에 들어가면 수정/삭제 가능
    - 각 게시글마다 댓글 등록 가능
    - 댓글을 작성한 유저면 댓글 수정/삭제 가능
