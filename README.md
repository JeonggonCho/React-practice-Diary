# 감성 일기장

---

## 학습

- 사용자 입력 및 배열 리스트 처리하기
- React Lifecycle과 API
- React App 프로처럼 성능 최적화하기 with 도구 사용
- React 컴포넌트 트리에 전역 데이터 공급하기


---

## (1) React에서 사용자 입력 처리 - useState

### **1) 사전 준비**

- `npx create-react-app emotional_diary` 입력으로 프로젝트 생성
- 프로젝트 폴더의 컨텐츠들을 한 단계 상위 폴더로 이동시키고 기존 생성 폴더 삭제
- 잘 사용되지 않는 파일들 정리 (logo.svg, App.test.js, reactWebVitals.js, setupTest.js)

<br>

### **2) 목표**

![다양한 사용자 입력 처리하기](./README_img/다양한_사용자_입력_처리하기.png)

- `DiaryEditor`라는 컴포넌트 만들기
  - 한 줄 입력 처리하기 (input)
  - 여러 줄 입력 처리하기 (textarea)
  - 선택 박스 입력 처리하기 (select)
  - 사용자 입력 데이터 핸들링하기

<br>

### **3) DiaryEditor 컴포넌트가 필요한 것**

![DiaryEditor 컴포넌트가 필요한 것](./README_img/DiaryEditor_컴포넌트가_필요한_것.png)

- 작성자
- 일기 본문
- 감정 점수

<br>

### **4) 작성자 및 일기 본문 입력받기**

### - 작성자 입력받기

- useState(상태)와 input 태그 활용

```jsx
// 작성자 입력받는 코드

import {useState} from "react";

const [author, setAuthor] = useState("");

< div >
  < input
    value={author}
    onChange={(e) => {
        setAuthor(e.target.value);
    }}
  / >
< /div>
```

- input 태그의 값을 useState의 author로 설정
- onChange 속성을 통해 값이 바뀔 때마다 이벤트가 발생
- 이벤트 발생 시, 콜백함수를 수행하고 매개변수로 이벤트 객체 e를 보냄
- 함수 내부에서 상태 변화 함수 setAuthor가 이벤트 타겟 값(e.target.value)를 받아 author로 보냄
- 바뀐 author 값이 다시 input 태그의 value로 들어가서 화면에 렌더링됨

<br>

### - 일기 본문 입력 받기

- 앞선 작성자 입력받기와 동일
- input 태그 대신 textarea 태그 활용

```jsx
// 일기 본문 입력받는 코드

import {useState} from "react";

const [content, setContent] = useState("");

< div >
  < textarea
    value={content}
    onChange={(e) => {
        setContent(e.target.value);
    }}
  / >
< /div>
```

- 작성자 입력과 일기 본문 입력 모두 문자열 상태 값을 가짐
- onChange 속성을 이용
- 상태 변화 함수에 e.target.value를 전달

<br>

### - 비슷한 동작의 State 묶기

- 위의 작성자 입력, 일기 본문 입력과 같이 유사하게 동작하는 State는 따로 두지 않고 하나의 State로 묶어 줄 수 있음

```jsx
// State 묶기

import {useState} from "react";

const [state, setState] = useState({
  author: "",
  content: "",
});

<div>
  <div>
    <input
      name="author"
      value={state.author}
      onChange={(e) => {
        setState({
          ...state,
          author: e.target.value,
          // content: state.content,
        });
      }}
    />
  </div>
  <div>
    <textarea 
      value={state.content}
      onChange={(e) => {
        setState({
          ...state,
          // author: state.author,
          content: e.target.value,
        });
      }}
    />
  </div>
< /div>
```

- 초기에 author의 값 공백(""), content도 공백("")임
- 이후 값이 변화하면 변화하는 값은 e.target.value로 이벤트를 통해 변화한 값을 상태 변화 함수에 전달
- 같이 묶여있지만 값이 변화하지 않은 값은 state.(원래 값)으로 함께 객체로 전달
- 하지만 더 많은 객체가 하나의 State에 묶여있을 경우, 상태 변화 함수로 전달하는 객체가 길어질 수 있음
- 따라서 Spread 연산자(...)를 활용하여 바뀌는 값 외에는 ...state로 처리할 수 있음
  - 주의사항 : 기존의 객체(...state)를 앞에 서술해야 함
  - 뒤에 서술할 경우, 업데이트 순서가 바뀌기에 잘못된 결과 발생

<br>

### - onChange 속성 합치기

```jsx
// onChange 속성의 콜백함수 묶어내기

const handleChangeState = (e) => {
  setState({
    ...state,
    [e.target.name]: e.target.value,
  })
};

<div>
  <div>
    <input
      name="author"
      value={state.author}
      onChange={handleChangeState}
    />
  </div>
  <div>
    <textarea
      name="content"
      value={state.content}
      onChange={handleChangeState}
    />
  </div>
</div>
```

- '[e.target.name]: e.target.value'를 통해 이벤트가 발생하는 태그를 구분함

<br>

### **5) 감정 점수 선택**

- useState와 select 태그(+ option 태그)를 활용
- 앞선 input과 textarea의 속성과 똑같이 적용됨

```jsx
// 선택 입력

const [state, setState] = useState({
  author: "",
  content: "",
  emotion: 1,
});

const handleChangeState = (e) => {
  setState({
    ...state,
    [e.target.name]: e.target.value,
  })
};

<div>
  <select
    name="emotion"
    value={state.emotion}
    onChange={handleChangeState}
  >
    <option value={1}>1</option>
    <option value={2}>2</option>
    <option value={3}>3</option>
    <option value={4}>4</option>
    <option value={5}>5</option>
  </select>
</div>
```

<br>

### **6) 저장 버튼**

```jsx
const handleSubmit = () => {
  console.log(state);
  alert("저장 성공");
};

<div>
  <button onClick={handleSubmit}>일기 저장하기</button>
</div>
```

- 버튼 클릭 시, 클릭했기 때문에 button의 onClick 속성의 handleSubmit 함수가 실행
- 콘솔로 현재 작성된 state 객체를 출력
- alert 메서드로 저장 성공 알림 띄우기


---

## (2) React에서 DOM 조작하기 - useRef

### **1) 목표**

- 리액트에서 DOM 조작하기
  - 일기 저장 버튼 클릭 시, 작성자와 일기가 정상적으로 입력되었는지 확인
  - 정상적인 입력 아니라면 focus하기

<br>

### **2) 정상적인 입력이 아닐 경우, alert 띄우기**

- handleSubmit 수정하기
- 조건문으로 작성자와 본문내용의 길이에 따라 alert 띄우기
- alert 실행 후, 이후 코드를 실행하지 않도록 return 추가

```jsx
const handleSubmit = () => {
  if (state.author.length < 1) {
    alert("작성자는 최소 1글자 이상 입력해주세요");
    return;
  }

  if (state.content.length < 5) {
    alert("일기 본문은 최소 5글자 이상 입력해주세요");
    return;
  }
        
  alert("저장 성공");
};
```

- 하지만, 입력이 정상이 아니더라도 `alert`를 띄우는 것은 `UX 경험적으로 좋지 않음`

<br>

### **3) 정상적인 입력이 아닐 경우, focus 주기**

- `useRef` 사용

```jsx
// useRef import 해오기
import {useRef, useState} from "react";

// useRef 사용하여 DOM 요소 접근 가능한 기능 부여
const authorInput = useRef();
const contentInput = useRef();


// 조건문에 따라 불만족 시, 해당 현재요소에 focus하기
const handleSubmit = () => {
  if (state.author.length < 1) {
    authorInput.current.focus();
    return;
  }

  if (state.content.length < 5) {
    contentInput.current.focus();
    return;
  }

  alert("저장 성공");
};


<div>
  <input
    // ref 속성으로 DOM 연결
    ref={authorInput}
    name="author"
    value={state.author}
    onChange={handleChangeState}
  />
</div>
<div>
  <textarea
    // ref 속성으로 DOM 연결
    ref={contentInput}
    name="content"
    value={state.content}
    onChange={handleChangeState}
  />
</div>
```

- useRef()를 지정하면 해당 변수는 `mutableRefObject`가 됨
- mutableRefObject : HTML DOM 요소에 접근할 수 있는 기능

![리액트 DOM 조작](README_img/리액트_DOM_조작하기.gif)

<리액트 DOM 조작 결과>


---

## (3) React에서 리스트 사용하기1 - 리스트 렌더링(조회)

