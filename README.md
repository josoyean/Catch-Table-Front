[🔗](https://saltsoyeon.tistory.com/54)
**블로그 바로가기**

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

lang - react, html ,css, javascript, npm, styled-components, React-query, Redux

배포 - github.io

## **개발 기간**

2024.01 ~ 진행중

## **구현 기능**

-   AWS EC2 인스턴스 생성후 제작 웹 페이지 배포
-   서버 통신을 react-query 이용해서 제작
-   데이터 저장을 위해 localstorage 이용



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

React-Query를 사용하면 많은 부분에서 코드가 간결해지고 이해하기 쉬워집니다. 또한 유지보수도 쉬워지며, 서버와의 통신에 관련된 많은 부분이 자동으로 처리되므로 오류 처리나 중복 방지에 대해 걱정할 필요가 없어집니다. 

useQuery() 오류....

다른 페이지에서 useQuery() 이용했을때는 아무 문제 없었는데 갑자기 왜 떴지? 구글에서는 가져오는 데이터가 없을때 이런 오류가 뜬다는 고하는데 서버한테 믈아봐야되겠다.

#### **3) 데이터 저장 위해 Storage 사용**

쿠키와 스토리지 중에서 암호화가 되지 않아서 사용자 정보 도난 위험이 있어 localStorage으로 데이터 저장을했습니다. sessionStorage은 일회성 로그인이라 프로젝트로 맞지 않다고 생각해서 localStorage 으로 작업 했습니다. 토큰은 하나만 있어야되서 겹치는 현상을 막기 위해 .clear()이용해서 데이터 제거하고 setItem로 저장한다. 스토리지는 문자열은 그대로 저장하면 되지만 객체는 \[object,object\]로 뜨는데 이럴때는 JSON.stringify()를 이용해서 문자로 변화시키고 저장하면 된다. 반대로 데이터 불러올때는 getItem()을 이용 페이지 제작, getItem()로 저장된 값이 없으면 로그인 안 한걸로 인식, 값이 있으면 로그인 된걸로 인식후 작업했습니다.

---

## **회고록**

**진행하면서 어려웠던점**

**진행후 얻은점**
