[🔗](https://saltsoyeon.tistory.com/54)
**블로그 바로가기**

![화면 기록 2024-05-07 오전 12 21 56](https://github.com/sky-catch/Front/assets/31685570/b275b149-8d79-45b8-8580-b756dbe3db42)


## **Intor**

제가 리액트 기반으로 저 포함 프론트엔드 2명, 백엔드2명으로 이루어진 팀 프로젝트입니다.

서버와 소통하는 능력을 기르고 싶어서 백엔드 2명, 프론트엔드 2명으로 <캐치테이블> 클론 코딩을 하기로 했습니다.

기존 캐치테이블 식당 예약 서비스에서 채팅 기능, 리뷰를 달면 사장님 답변 기능을 추가한 프로젝트입니다.

이 프로젝트 통해서 이전부터 사용하고 공부하고 싶었던 React-query, Redux도 적용했습니다.

## **파트 분담**

본인(프론트엔드) - 로그인, 예약, 채팅 (리뷰페이지에 적용), 답글, 사장(식당관리)

프론트엔드1,백엔드2

## **사용기술**

editot - VScode

lang - react, html ,css, javascript, npm, styled-components, React-query, Recoil,Tailwindcss

배포 - aws ec2

## **개발 기간**

2024.01 ~ 진행중

## **구현 기능**

-   AWS EC2 인스턴스 생성후 제작 웹 페이지 배포(node.js+pm2+nginx 배포)
-   서버 통신을 react-query 이용해서 제작
-   데이터 저장을 위해 sessionStorage 이용
-   form-data 이용해서 이미지 서버로 전송
-   SWAP이용해서웹접속시간5초이상단축



---

#### **1) AWS EC2 인스턴스 생성후 제작 웹 페이지 배포**

**이 전에는 깃허브 이용해서 배포만 했었는데 아마존 이용해서 배포할수있다는 글을 보고 배포 작업을 했습니다.**

윈도우는 ssh 접속 프로그램이 따로 있는데 맥북은 없다. (난 맥북) 터미널로 키 파일이 있는 공간으로 이동한후에 접속을 하고 배포할 프로그램 깃 클론을 이용해서 저장후 프로세스 관리 도구중에 서버가 끊어지지않고 운영되는 장점이 있어 pm2를 설치 후 빌드 시키면된다. 프로젝트 수정하면 이전과 동일하게 깃에 저장된것을 받고 그대로 빌드만 시키면 배포 완료가 된다. (ssh연결 할때 오류나면 집 와이파이(sk) 연결말고 핫스팟 이용!!!)

#### **2) 서버 통신을 react-query 요청 관리**

```
//App.js
  import { useQueryClient } from "@tanstack/react-query";
  import { ReservationTimes } from "../respository/reservation";
  const App = ({ isOpen, toggleDrawer, restaurant }) => {
  const { mutate: checkReservationTimes } = ReservationTimes();

   const restaurantObj = {
        objA,
        objB,
        objC,
        objD,
      };

    checkReservationTimes(restaurantObj);
    reture(
    <></>
    )
  }

//data.js
const checkReservationTimes = (data) => {
  return axios.post(
    "URL",
    data
  );
};

export const ReservationTimes = () => {
  return useMutation({
    mutationKey: ["checkReservationTimes"],
    mutationFn: checkReservationTimes,
    onSuccess: (data) => {
      console.log("createPost success", data);
    },
    onError: (error) => {
      // mutate가 실패하면, 함수를 실행합니다.
      console.log("createPost error", error);
    },
  });
};
```

이전에는 Axios를 사용하여 서버와의 통신에 대한 많은 부분을 직접 처리해야 했습니다. 예를 들어, 데이터 가져오기(GET) 요청에는 \`axios.get()\`을 사용하고, 데이터 수정 또는 삭제와 같은 다른 작업에는 \`axios.post()\` 또는 \`axios.put()\` 등을 사용해야 했습니다. 또한 요청에 필요한 매개변수를 직접 설정하고, 응답을 처리하고, 오류를 처리해야 했습니다.

하지만 React-Query를 사용하면 이러한 복잡한 작업들을 간편하게 처리할 수 있습니다. React-Query는 데이터를 가져오거나 수정 또는 삭제하는 등의 작업을 처리하는데 도움이 되는 많은 훅을 제공합니다. 예를 들어, 데이터를 가져오는 작업은 \`useQuery()\` 훅을 사용하여 간단하게 처리할 수 있고, 데이터를 수정 또는 삭제하는 작업은 \`useMutation()\` 훅을 사용하여 처리할 수 있습니다.

React-Query를 사용하면 많은 부분에서 코드가 간결해지고 이해하기 쉬워집니다. 또한 유지보수도 쉬워지며, 서버와의 통신에 관련된 많은 부분이 자동으로 처리되므로 오류 처리나 중복 방지에 좋음. 

확실히 React-Query 사용해보니깐 코드가 짧아지고 useState() 이용을 덜 하게 되니깐 깨끗해지고 오류, 로딩 때 보여지는 코드를 설정 할수있어 너무 편하다고 느꼈다. 리액트 쿼리에서 다른 기능도 적용해서 작업 해서 적응 될수있게 공부 해야지

useQuery() 오류....

다른 페이지에서 useQuery() 이용했을때는 아무 문제 없었는데 갑자기 왜 떴지? 구글에서는 가져오는 데이터가 없을때 이런 오류가 뜬다는 고하는데 서버분한테 물어봐야되겠다.

#### **3) 데이터 저장 위해 Storage 사용**

쿠키와 스토리지 중에서 암호화가 되지 않아서 사용자 정보 도난 위험이 있어 sessionStorage 으로 데이터 저장을했습니다. localStorage은 브라우저 꺼도 데이터가 남아있어 프로젝트로 맞지 않다고 생각해서 sessionStorage 으로 작업 했습니다. 토큰은 하나만 있어야되서 겹치는 현상을 막기 위해 .clear()이용해서 데이터 제거하고 setItem로 저장한다. 스토리지는 문자열은 그대로 저장하면 되지만 객체는 [object,object]로 뜨는데 이럴때는 JSON.stringify()를 이용해서 문자로 변화시키고 저장하면 된다. 반대로 데이터 불러올때는 getItem()을 이용 페이지 제작, getItem()로 저장된 값이 없으면 로그인 안 한걸로 인식, 값이 있으면 로그인 된걸로 인식후 작업했습니다.

#### **4) form-data 이용해서 이미지 서버로 전송 **

이 프로젝트 덕분에 Content-Type에 multipart/form-data 속성을 사용해봤다. 처음에 뭔지도 모르고 application/json 로 적용했는데 오류가 나서 찾아보니 파일(데이터)를 보내야된다고 한다. 위에 링크 처럼 작업하면 쉽게 form-data로 사진 보낼 수 있다.

#### **5) SWAP 이용해서 웹 접속 시간 5초 이상 단축 **

배포 후 사이트 접속 시간이 길어지는 이슈가 있어서 swap을 이용해서 접속 시간 단축했습니다. 클린 코드 작업 후 처음에는 AWS 메모리 큰 걸 구입해야 하나 생각했는데 가상 메모리인 swap을 이용해 봤다. 단 몇 줄로 속도가 빨라져서 좋았고 가상 메모리에 대해 공부를 더 해야 한다는 걸 느꼈다.

---

## **회고록**

**진행하면서 어려웠던점**

아직 프로젝트 완성은 못했지만 덕분에 많은걸 배우게 되었다. 진행하면서 어려운거 솔직히 전부다... 쉬운게 없었어 여기에 적지 않았지만 카카오 로그인 연결, 몇주을 고민했는데 해결을 아직 못한 웹소켓....(웹소켓은 작업하다가 미루는중...이거땜에 시간을 다 소비할순 없어서...) aws 인스턴스 생성후 배포는 ssh연결할때는 핫스팟 이용하고(집 와이파이가 sk라...포스트번호 수정해도 안됨), 카카오 로그인 작업할때는 키값 같은 남들이 보면 안되는 값은 .env 넣어 깃에 배포하면 안된다. 웹 소켓은 진행중인데 지속적으로 연결이 안된다는 문구만 뜬다.. 이번에는 직접 node.js이용해서 서버를 구축하고 나서 작업을 해야되겠다는 생각이 들었다.(이참에 node.js 공부도 같이 해볼까?)

**진행후 얻은점**

얻는건?... 끈기? 백엔드 과정도 배우고 싶다는 욕심이 생겼어 스웨거 통해서 작업중인데 채팅방 목록 보기라는 부분에서 헤더에 로그인 토큰을 넣는것도 아니고 어떻게 나 인걸 인증하고 관련된 데이터를 받는거지? 난 이게 제일 이해가 안된다 이걸보고 서버에서 어떻게 작동하는지 뭘 넣어야 되는지 라도 배워야 하나? 생각이 많이 들었어 (node.js 배우자)
