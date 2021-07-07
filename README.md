# 배포
> https://woongl.github.io/portfolio-react-boardclient/

## 주의점
> 서버는 헤로쿠 서버를 사용하고 있기 때문에 일정주기로 서버가 잠들어 처음은 약간 로딩이 느릴수 있습니다 

# 주요 컴포넌트 소개

## BoardList
### 기능 
현재 주소에서 게시판의 목록 페이지와 목록 페이즈 크기 그리고 검색텍스트를 불러와서 서버와 통신하여 
그 데이터를 이용하여 목록을 유저에게 보여줍니다 또, 페이지 전환 및 검색할수 있는 기능 존재합니다
그리고 글 작성버튼과 쿼리를 초기화하여 처음 화면으로 돌아가는 목록 버튼이 존재합니다

#### 통신을 하는 기준은 주소가 변동되면 이루어지도록 useEffect 훅을 사용했습니다
> 그렇게 한 이유는 페이지 이동이나 검색등 다른 상호작용이 있을때 주소가 변동되도록 하였기 때문에 주소변동을 기준으로 하면 다른 컴포넌트에서 어떤 행동을 하더라도
> BoardList을 신경 안쓰고 처리 가능하여 컴포넌트간의 관계에 신경을 적게 쓰고 개발할수 있기 때문입니다.


## BoardDetail 
### 기능 
현재 주소에서 인덱스를 받아와 그 인덱스로 서버에 get통신을 하여 글을 불러옵니다
또, 글의 수정과 삭제의 BoardDetail컴포넌트로 이동하는 기능이 있습니다
BoardDetail컴포넌트에서 불러온 글의 인덱스를 파라미터로 BoardReply컴포넌트를 불러옵니다

## boardPasswordCheck
### 기능 
주소를 통해 현재 삭제기능인지 수정기능인지 판단합니다. 비밀번호 입력후 확인을 누르면
서버와의 통신을 통해 글의 비밀번호가 맞는지 여부를 체크후 아니라면 틀리다는 메세지를 출력
맞다면 삭제기능을 수행중이라면 글을 삭제하고 수정기능을 수행중이라면 BoardUpdate컴포넌트를 
현재 컴포넌트에서 보여주는 HTML대신 보여줍니다

## BoardWrite
### 기능
글을 작성하는 컴포넌트 입니다 글 작성에 성공했다면 작성된 글의 주소로 이동하였습니다

## BoardUpdate  
### 기능
글을 쓰는 수정하는 컴포넌트 입니다


## BoardReply 
### 기능
BoardDetail로부터 받아온 현재 보여지는 글의 인덱스를 서버에 보내주어 댓글을 받아와 
보여지도록 하였습니다. 댓글이 있다면 댓글을 댓글의 인덱스순으로 순서대로 보여주고
존재하는 댓글마다 수정과 삭제가 가능하도록 버튼을 넣었습니다 그리고 마지막에 댓글 작성을 할수 있도록 하였습니다


## ReplyPasswordCheck
### 기능
boardPasswordCheck와 비슷하게 주소를 통해 현재 삭제기능인지 수정기능인지 판단합니다.
비밀번호입력을 하면 기능에 따라 수정창혹은 삭제가 이루어지도록 하였습니다


---



### E-mail : woongl7690@gmail.com
