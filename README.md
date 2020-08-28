## 세명컴퓨터고등학교 학교 인프라 세띵

#Restful Api

* POST /signup ( 유저 회원가입 )

> Parmas
  
  id : {type : String, require: true} //유저 아이디
  
  passwd : {type : String,  require: true} // 유저 비밀번호
  
  name: {type : String,  require: true} // 유저 이름
  
  pinNum: {type : String, unique: true} // 유저 핀번호
  
  phoneNum: {type: String,  require: true, unique: true} // 유저 핸드폰 번호
  
  grade: { type: Number, require: true} // 유저 학년
  
  class: { type: Number, require: true} // 유저 반
  
  classNum : {type: Number, require: true} // 유저 번호
  
  department : {type: String, require: true} // 유저 학과
  
  profileImg :{type: String} // 유저 프로필 이미지 (base 64)
  

> Response

    HTTP 200 : { message: "success!"}

    HTTP 409 : { message : "already exist"}

    HTTP 400 : { message : e.message } // 나올 일 없음


* POST /signin ( 유저 로그인 )

> Params

    id : { type : String } // 유저 아이디

    passwd : { type : String } // 유저 비밀번호

> Response

    HTTP 200 : { user :
    
        id : {type : String, require: true} //유저 아이디
  
        passwd : {type : String,  require: true} // 유저 비밀번호
        
        name: {type : String,  require: true} // 유저 이름
        
        pinNum: {type : String, unique: true} // 유저 핀번호
        
        phoneNum: {type: String,  require: true, unique: true} // 유저 핸드폰 번호
        
        grade: { type: Number, require: true} // 유저 학년
        
        class: { type: Number, require: true} // 유저 반
        
        classNum : {type: Number, require: true} // 유저 번호
        
        department : {type: String, require: true} // 유저 학과
        
        profileImg :{type: String} // 유저 프로필 이미지 (base 64)
        
        token : {type: String} // 토큰

     } 

    HTTP 404 : { message : "User Not Found!"}


* POST /class/dataup ( 시간표 작성 )

> Params

    content: {type: String} // 시간표 이름 (1교시: 문학 등)

    grade: { type: Number} // 학년
    
    class: { type: Number} // 반

> Response

  HTTP 200 : { message: "success!"}

  
* POST /class/finddata ( 시간표 읽기 )

> Params

    grade: { type: Number} // 학년
    
    class: { type: Number} // 반

> Response

  HTTP 200 : { user :
          content: {type: String} // 시간표 이름 (1교시: 문학 등)

          grade: { type: Number} // 학년
    
          class: { type: Number} // 반
     } 

   HTTP 404 : {message : schedule Not Found!}   

* POST /notice/write ( 공지 쓰기 )

> Params

    title : {type: String,  require: true} // 제목

    subTitle: {type: String} // 부제목

    name : {type: String,  require: true} // 작성자 

    content: {type: String, require: true} // 내용

> Response

  HTTP 200 : { message: "success!"}


* POST /notice/read ( 공지 불러오기 )

> Params

> Response

  HTTP 200 : { list :

        title : {type: String} // 제목

        subTitle: {type: String} // 부제목

        name : {type: String} // 작성자

        date: {type: String} // 날짜

        content: {type: String} // 내용

        docNum : {type: Number} // 번호

        noticeToken : {type: String} // 공지토큰
     } 

* POST /forest/write ( 대나무숲 쓰기 )

> Params

    title : {type: String,  require: true} // 제목

    subTitle: {type: String} // 부제목

    name : {type: String,  require: true} // 작성자 

    content: {type: String,  require: true} // 내용
    
    isNameHide : {type: Boolean, require: true} // 이름 숨김 여부

> Response

  HTTP 200 : { message: "success!"}


* POST /forest/read ( 대나무숲 불러오기 )

> Params

> Response

  HTTP 200 : { list :

        title : {type: String} // 제목

        subTitle: {type: String} // 부제목

        name : {type: String} // 작성자

        date: {type: String} // 날짜

        content: {type: String} // 내용

        docNum : {type: Number} // 번호

        forestToken : {type: String} // 대나무숲 토큰

        isNameHide : {type: Boolean} // 이름 숨김 여부

        hidedName : {type: String} // 숨김 이름 (성추행 또는 욕설 등의 사태 발생 가능성이 있기에 이름 저장)
     } 

* POST /event/write ( 이벤트 작성 )

> Params

    title : {type: String ,  require: true } // 제목

    agency: {type: String,  require: true} // 기관명 (ex. 학생회, 선생님)

    subTitle: {type: String} // 부제목

    name : {type: String,  require: true} // 작성자 

    content: {type: String,  require: true} // 내용

> Response

  HTTP 200 : { message: "success!"}


* POST /event/read ( 이벤트 불러오기 )

> Params

> Response

  HTTP 200 : { list :

        title : {type: String} // 제목

        subTitle: {type: String} // 부제목

        agency: {type: String} // 기관명 (ex. 학생회, 선생님)

        name : {type: String} // 작성자

        date: {type: String} // 날짜

        content: {type: String} // 내용

        docNum : {type: Number} // 번호

        eventToken : {type: String} // 이벤트 토큰
     } 

 
* POST /event or forest or notice /search/:title ( 공지/대숲/이벤트 제목 검색 )

> Params

> Response

  HTTP 200 : { list :

        title : {type: String} // 제목

        subTitle: {type: String} // 부제목

        agency: {type: String} // 기관명 (ex. 학생회, 선생님)

        name : {type: String} // 작성자

        date: {type: String} // 날짜

        content: {type: String} // 내용

        docNum : {type: Number} // 번호
        
        등의 내용
     } 
    

 * GET /meal ( 급식정보  불러오기 )

> Params

> Response

 HTTP 200 :  { meal : 

                breakfast: [Array] // 조식 

                dinner: [Array] // 석식 

                date: {Number} // 날짜 

                lunch: [Array] //점심
             }
    



     




  