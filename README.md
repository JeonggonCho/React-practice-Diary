# 일기장

본 프로젝트는 ["한입 크기로 잘라 먹는 리액트 강의"](https://www.udemy.com/course/winterlood-react-basic/)의 "일기장 만들어 보기"를 클론한 프로젝트로 "리액트"의 기초 지식을 학습하는 것을 목표하였습니다.

<br>

## 목차

1.   [React에서 사용자 입력 처리 - useState](#1-react에서-사용자-입력-처리---usestate)
2.   [React에서 DOM 조작하기 - useRef](#2-react에서-dom-조작하기---useref)
3.   [React에서 리스트 사용하기1 - 리스트 렌더링(조회)](#3-react에서-리스트-사용하기1---리스트-렌더링조회)
4.   [React에서 리스트 사용하기2 - 데이터 추가](#4-react에서-리스트-사용하기2---데이터-추가)
5.   [React에서 리스트 사용하기3 - 데이터 삭제](#5-react에서-리스트-사용하기3---데이터-삭제)
6.   [React에서 리스트 사용하기4 - 데이터 수정](#6-react에서-리스트-사용하기4---데이터-수정)
7.   [React Lifecycle 제어하기 - useEffect](#7-react-lifecycle-제어하기---useeffect)
8.   [React에서 API 호출하기](#8-react에서-api-호출하기)
9.   [최적화1 연산 결과 재사용 - useMemo](#9-최적화1-연산-결과-재사용---usememo)
10.  [최적화2 컴포넌트 재사용 - React.memo](#10-최적화2-컴포넌트-재사용---reactmemo)
11.  [최적화3 컴포넌트 & 함수 재사용 - useCallback](#11-최적화3-컴포넌트--함수-재사용---usecallback)
12.  [최적화4 - React.memo + useCallback](#12-최적화4---reactmemo--usecallback)
13.  [복잡한 상태 관리 로직 분리하기 - useReducer](#13-복잡한-상태-관리-로직-분리하기---usereducer)

<br>
<br>

## 학습내용

-   사용자 입력 및 배열 리스트 처리하기
-   React Lifecycle과 API
-   React App 프로처럼 성능 최적화하기 with 도구 사용
-   React 컴포넌트 트리에 전역 데이터 공급하기

<br>
<br>

## 1. React에서 사용자 입력 처리 - useState

### 1-1. 사전 준비

-   `npx create-react-app emotional_diary` 입력으로 프로젝트 생성
-   프로젝트 폴더의 컨텐츠들을 한 단계 상위 폴더로 이동시키고 기존 생성 폴더 삭제
-   잘 사용되지 않는 파일들 정리 (logo.svg, App.test.js, reactWebVitals.js, setupTest.js)

<br>

### 1-2. 목표

![다양한 사용자 입력 처리하기](./README_img/다양한_사용자_입력_처리하기.png)

-   `DiaryEditor`라는 컴포넌트 만들기
    -   한 줄 입력 처리하기 (input)
    -   여러 줄 입력 처리하기 (textarea)
    -   선택 박스 입력 처리하기 (select)
    -   사용자 입력 데이터 핸들링하기

<br>

### 1-3. DiaryEditor 컴포넌트가 필요한 것

![DiaryEditor 컴포넌트가 필요한 것](./README_img/DiaryEditor_컴포넌트가_필요한_것.png)

-   작성자
-   일기 본문
-   감정 점수

<br>

### 1-4. 작성자 및 일기 본문 입력받기

### - 작성자 입력받기

-   useState(상태)와 input 태그 활용

```jsx
// 작성자 입력받는 코드

import { useState } from "react";

const [author, setAuthor] = useState("");

<div>
    <input
        value={author}
        onChange={(e) => {
            setAuthor(e.target.value);
        }}
    />
</div>;
```

-   input 태그의 값을 useState의 author로 설정
-   onChange 속성을 통해 값이 바뀔 때마다 이벤트가 발생
-   이벤트 발생 시, 콜백함수를 수행하고 매개변수로 이벤트 객체 e를 보냄
-   함수 내부에서 상태 변화 함수 setAuthor가 이벤트 타겟 값(e.target.value)를 받아 author로 보냄
-   바뀐 author 값이 다시 input 태그의 value로 들어가서 화면에 렌더링됨

<br>

### - 일기 본문 입력 받기

-   앞선 작성자 입력받기와 동일
-   input 태그 대신 textarea 태그 활용

```jsx
// 일기 본문 입력받는 코드

import { useState } from "react";

const [content, setContent] = useState("");

<div>
    <textarea
        value={content}
        onChange={(e) => {
            setContent(e.target.value);
        }}
    />
</div>;
```

-   작성자 입력과 일기 본문 입력 모두 문자열 상태 값을 가짐
-   onChange 속성을 이용
-   상태 변화 함수에 e.target.value를 전달

<br>

### - 비슷한 동작의 State 묶기

-   위의 작성자 입력, 일기 본문 입력과 같이 유사하게 동작하는 State는 따로 두지 않고 하나의 State로 묶어 줄 수 있음

```jsx
// State 묶기

import { useState } from "react";

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
</div>;
```

-   초기에 author의 값 공백(""), content도 공백("")임
-   이후 값이 변화하면 변화하는 값은 e.target.value로 이벤트를 통해 변화한 값을 상태 변화 함수에 전달
-   같이 묶여있지만 값이 변화하지 않은 값은 state.(원래 값)으로 함께 객체로 전달
-   하지만 더 많은 객체가 하나의 State에 묶여있을 경우, 상태 변화 함수로 전달하는 객체가 길어질 수 있음
-   따라서 Spread 연산자(...)를 활용하여 바뀌는 값 외에는 ...state로 처리할 수 있음
    -   주의사항 : 기존의 객체(...state)를 앞에 서술해야 함
    -   뒤에 서술할 경우, 업데이트 순서가 바뀌기에 잘못된 결과 발생

<br>

### - onChange 속성 합치기

```jsx
// onChange 속성의 콜백함수 묶어내기

const handleChangeState = (e) => {
    setState({
        ...state,
        [e.target.name]: e.target.value,
    });
};

<div>
    <div>
        <input name="author" value={state.author} onChange={handleChangeState} />
    </div>
    <div>
        <textarea name="content" value={state.content} onChange={handleChangeState} />
    </div>
</div>;
```

-   '[e.target.name]: e.target.value'를 통해 이벤트가 발생하는 태그를 구분함

<br>

### 1-5. 감정 점수 선택

-   useState와 select 태그(+ option 태그)를 활용
-   앞선 input과 textarea의 속성과 똑같이 적용됨

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
    });
};

<div>
    <select name="emotion" value={state.emotion} onChange={handleChangeState}>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
    </select>
</div>;
```

<br>

### 1-6. 저장 버튼

```jsx
// DiaryEditor.js

const handleSubmit = () => {
    console.log(state);
    alert("저장 성공");
};

<div>
    <button onClick={handleSubmit}>일기 저장하기</button>
</div>;
```

-   버튼 클릭 시, 클릭했기 때문에 button의 onClick 속성의 handleSubmit 함수가 실행
-   콘솔로 현재 작성된 state 객체를 출력
-   alert 메서드로 저장 성공 알림 띄우기

<br>
<br>

## 2. React에서 DOM 조작하기 - useRef

### 2-1. 목표

-   리액트에서 DOM 조작하기
    -   일기 저장 버튼 클릭 시, 작성자와 일기가 정상적으로 입력되었는지 확인
    -   정상적인 입력 아니라면 focus하기

<br>

### 2-2. 정상적인 입력이 아닐 경우, alert 띄우기

-   handleSubmit 수정하기
-   조건문으로 작성자와 본문내용의 길이에 따라 alert 띄우기
-   alert 실행 후, 이후 코드를 실행하지 않도록 return 추가

```jsx
// DiaryEditor.js

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

-   하지만, 입력이 정상이 아니더라도 `alert`를 띄우는 것은 `UX 경험적으로 좋지 않음`

<br>

### 2-3. 정상적인 입력이 아닐 경우, focus 주기

-   `useRef` 사용

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

-   useRef()를 지정하면 해당 변수는 `mutableRefObject`가 됨
-   mutableRefObject : HTML DOM 요소에 접근할 수 있는 기능

<br>

![리액트 DOM 조작](README_img/리액트_DOM_조작하기.gif)

<리액트 DOM 조작 결과>

<br>
<br>

## 3. React에서 리스트 사용하기1 - 리스트 렌더링(조회)

### 3-1. 목표

-   `DiaryList` 컴포넌트 만들기
    -   `배열`을 이용하여 list 렌더링 해보기
    -   개별적인 컴포넌트 만들어보기

<br>

### 3-2. 더미데이터 만들고 리스트 컴포넌트에 props로 보내기

```jsx
// App.js

const dummyList = [
    {
        id: 1,
        author: "조정곤",
        content: "하이~1",
        emotion: 5,
        created_date: new Date().getTime(),
    },
    {
        id: 2,
        author: "김철수",
        content: "하이~2",
        emotion: 2,
        created_date: new Date().getTime(),
    },
    {
        id: 3,
        author: "이영수",
        content: "하이~3",
        emotion: 3,
        created_date: new Date().getTime(),
    },
];

<div className="App">
    <DiaryEditor />
    <DiaryList diaryList={dummyList} />
</div>;
```

-   `dummyList 배열`에 데이터(id, 작성자, 내용, 감정점수, 생성시간)를 `객체타입`으로 담아 만들기
-   `DiaryList` 컴포넌트에 diaryList 속성으로 dummyList 배열 props로 보내기

<br>

```jsx
// DiaryList.js

const DiaryList = ({ diaryList }) => {
    return (
        <div className="DiaryList">
            <h2>일기 리스트</h2>
            <h4>{diaryList.length}개의 일기가 있습니다.</h4>
            <div>
                {diaryList.map((it, idx) => (
                    <div key={it.id}>
                        <div>작성자 : {it.author}</div>
                        <div>일기 : {it.content}</div>
                        <div>감정 : {it.emotion}</div>
                        <div>작성 시간(ms) : {it.created_date}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

DiaryList.defaultProps = {
    diaryList: [],
};

export default DiaryList;
```

-   DiaryList 컴포넌트에서 diaryList를 props로 받기
-   `map 메서드`를 사용하여 배열 생성
-   map 메서드의 콜백함수로 배열 순회하여 객체 데이터 각각의 <div> 태그를 생성하고 최상위 <div> 태그에 담기
-   이 경우, 생성된 배열 간에 키가 지정되어있지 않아 콘솔 에러가 발생
-   따라서 최상위 <div> 요소에 `key 속성`에 각각의 배열을 구분할 수 있는 `id`를 넣어 에러 해결
    -   콜백함수의 `두 번째 인자인 인덱스(idx)`를 받아 id 대신 key 속성에 넣어 사용할 수 있음
    -   하지만 추후 순서가 변경될 경우, 수정 및 삭제의 동작 시 문제가 발생할 수 있어 id가 객체에 있다면 id를 사용하는 것을 지향함
-   map 메서드 안의 요소는 계속 반복되는 요소로 독립적인 컴포넌트로 관리할 수 있음

<br>

### 3-3. 리스트의 아이템을 관리할 컴포넌트 생성

```jsx
// DiaryList.js

import DiaryItem from "./DiaryItem";

const DiaryList = ({ diaryList }) => {
    return (
        <div className="DiaryList">
            <h2>일기 리스트</h2>
            <h4>{diaryList.length}개의 일기가 있습니다.</h4>
            <div>
                {diaryList.map((it, idx) => (
                    <DiaryItem key={it.id} {...it} />
                ))}
            </div>
        </div>
    );
};
```

-   DiaryItem 컴포넌트를 받아 콜백함수에서 사용
-   동일하게 `key 속성`으로 `id 값`을 사용하고, 나머지 데이터를 `Spread 연산자(...)`를 사용하여 `props`로 보내기

<br>

```jsx
// DiaryItem.js

const DiaryItem = ({ author, content, created_date, emotion, id }) => {
    return (
        <div className="DiaryItem">
            <div className="info">
                <span>
                    작성자 : {author} | 감정점수 : {emotion}
                </span>
                <br />
                <span className="date">{new Date(created_date).toLocaleString()}</span>
            </div>
            <div className="content">{content}</div>
        </div>
    );
};

export default DiaryItem;
```

-   `DiaryItem` 컴포넌트 생성
-   props로 받은 데이터를 요소에 담아 출력

<br>

![리스트 렌더링](README_img/리스트_데이터_렌더링.png)

<리스트 데이터 렌더링 예시 결과>

<br>
<br>

## 4. React에서 리스트 사용하기2 - 데이터 추가

### 4-1. 학습목표

- 배열을 이용한 React의 List에 아이템을 동적으로 추가해보기

<br>

### 4-2. 컴포넌트 & 데이터 구조 생각해보기

![state 끌어올리기1](README_img/State_lifting_01.png)

- DiaryEditor 컴포넌트에서 작성된 일기 내용을 DiaryList 컴포넌트에서 렌더링을 하길 원함
- 하지만, 리액트에서는 `동등한 레벨`에선 `데이터 전달이 불가능`

<br>

![state 끌어올리기2](README_img/State_lifting_02.png)

- 리액트는 `단방향`으로 `데이터`가 흐르는 특성을 지님

<br>

![state 끌어올리기3](README_img/State_lifting_03.png)

- 이를 해결하기 위해 부모인 `App 컴포넌트`에 `[data, setData]의 State`를 만듦
- `DiaryEditor` 컴포넌트에는 상태 함수인 `setData`를, `DiaryList` 컴포넌트에는 업데이트되는 `data`를 `props`로 각각 전달

<br>

![state 끌어올리기4](README_img/State_lifting_04.png)

- 이렇게 되면 일기가 작성될 때, DiaryEditor는 상태 함수인 setData를 호출
- 새롭게 작성된 일기 데이터는 state의 data로 전달됨
- 이 업데이트 된 data를 DiaryList에서 받아 리렌더링하게 됨

<br>

![state 끌어올리기5](README_img/State_lifting_05.png)

- 즉, `데이터`는 부모에서 자식, 즉, `위에서 아래`로 전달
- 자식에서는 부모로 상태 함수를 호출하기에 `이벤트`는 `아래에서 위`로 전달

<br>

### 4-3. State 만들기

### - App 컴포넌트 state 생성

```jsx
// App.js

const [data, setData] = useState([]);

const dataId = useRef(0);

const onCreate = (author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
        author,
        content,
        emotion,
        created_date,
        id: dataId.current,
    };
    dataId.current += 1;
    setData([newItem, ...data]);
};
```

- 이벤트 onCreate 생성
- useRef()에 초기값으로 0 지정 => <변수명>.current로 값을 확인 할 수 있음
- 이 후 <변수명>.current를 1씩 증가시켜 id를 1씩 증가시킴
- 새로 작성된 일기내용을 기존 내용들의 앞에 위치시킴

<br>

### - props로 이벤트와 데이터 전달

```jsx
// App.js

<div className="App">
    <DiaryEditor onCreate={onCreate} />
    <DiaryList diaryList={data} />
</div>
```

- DiaryEditor로 onCreate 함수 전달
- DiaryList로 data 전달

<br>

### - 이벤트 받기

```jsx
// DiaryEditor.js

const DiaryEditor = ({ onCreate }) => {...}
```

- props로 전달된 onCreate 받기

<br>

### - 일기를 제출하면 이벤트 호출

```jsx
// DiaryEditor.js

const handleSubmit = () => {
    if (state.author.length < 1) {
        authorInput.current.focus();
        return;
    }

    if (state.content.length < 5) {
        contentInput.current.focus();
        return;
    }
    onCreate(state.author, state.content, state.emotion);
    alert("저장 성공");
    setState({
        author: "",
        content: "",
        emotion: 1,
    });
};
```

- 제출(handleSubmit) 시, onCreate()함수를 호출함
- 인자로 state의 author, content, emotion을 전달
- 저장 후, 입력 칸 비우고, 감정 1로 초기화

<br>

![state끌어올리기 결과](README_img/state끌어올리기_데이터_렌더링.gif)

<state를 활용한 리스트 데이터 렌더링 예시 결과>

<br>
<br>

## 5. React에서 리스트 사용하기3 - 데이터 삭제

### 5-1. 학습목표

- 삭제버튼을 각 일기 리스트 목록마다 생성
- 삭제버튼을 클릭할 경우, 확인 메시지가 전달되고 확인을 누르면 해당 일기 아이템이 삭제되고 리렌더링 됨

<br>

### 5-2. onDelete 함수 생성

```jsx
// App.js

// onDelete 함수
const onDelete = (targetId) => {
    console.log(`${targetId}가 삭제되었습니다`);
    const newDiaryList = data.filter((it) => it.id !== targetId);
    setData(newDiaryList);
};

return (
    <div className="App">
        <DiaryEditor onCreate={onCreate} />
        // DiaryList로 props로 onDelete 전달
        <DiaryList onDelete={onDelete} diaryList={data} />
    </div>
);
```

- onDelete 함수는 삭제버튼과 함께 해당 일기 아이템의 id값을 targetId인자로 받음
- 필터를 사용하여 data에서 id가 인자로 받은 targetId와 같지 않은 나머지 아이템들을 모음
- 새롭게 생성된 일기 리스트들을 setData() 상태 함수에 넣어 상태 바꾸기

<br>

### 5-3. DiaryList로 전달된 onDelete 함수를 DiaryItem 컴포넌트로 전달

```jsx
// DiaryList.js

const DiaryList = ({ onDelete, diaryList }) => {
    return (
        <div className="DiaryList">
            <h2>일기 리스트</h2>
            <h4>{diaryList.length}개의 일기가 있습니다.</h4>
            <div>
                {diaryList.map((it, idx) => (
                    // DiaryItem으로 onDelete 전달
                    <DiaryItem key={it.id} {...it} onDelete={onDelete} />
                ))}
            </div>
        </div>
    );
};
```

- onDelete 함수를 DiaryItem 컴포넌트로 props로 전달

<br>

### 5-4. 삭제 시, onDelete 함수 호출하고 해당 아이템의 id값 전달

```jsx
// DiaryItem.js

// onDelete 함수 전달 받음
const DiaryItem = ({
                       onDelete,
                       author,
                       content,
                       created_date,
                       emotion,
                       id,
                   }) => {
    return (
        <div className="DiaryItem">
            // ...
            <button
                onClick={() => {
                    console.log(id);
                    if (window.confirm(`${id}번째 일기를 정말 삭제하시겠습니까?`)) {
                        onDelete(id);
                    }
                }}
            >
                삭제하기
            </button>
        </div>
    );
};
```

- onClick의 콜백함수를 지정
- `window.confirm()` : 확인 메시지 띄우기
  - 확인 클릭(true)일 경우, `onDelete` 함수 호출하여 파라미터로 해당 일기 아이템의 id 전달
  - 취소 클릭(false)일 경우, 아무 일도 발생하지 않음

<br>

![리스트 삭제 결과](README_img/리스트_데이터_삭제하기.gif)

<리스트 데이터 삭제 예시 결과>

<br>
<br>

## 6. React에서 리스트 사용하기4 - 데이터 수정

### 6-1. 수정하기 기능에서 필요한 것

- 수정하기 버튼
- 수정하기 버튼을 누르면 기존 내용이 수정폼으로 변환
- 특정 글자 수를 충족 시, 수정 완료되고 그렇지 않을 경우, 수정폼에 포커스 되도록 하기

<br>

### 6-2. isEdit의 상태에 따른 버튼과 일기내용 변환

### - 수정하기 버튼 만들기

```jsx
// DiaryItem.js

<button onClick={handleRemove}>삭제하기</button>
<button onClick={toggleIsEdit}>수정하기</button>
```

- 기존 삭제하기 버튼과 함께 수정하기 버튼 만들기
- 수정하기 버튼 클릭 시, toggleIsEdit 함수 실행

<br>

### - state와 toggleIsEdit

```jsx
// DiaryItem.js

const [isEdit, setIsEdit] = useState(false);
const toggleIsEdit = () => setIsEdit(!isEdit);
```

- `isEdit`이란 변수를 설정하고 state로 기본 값을 `false`로 지정
- toggleIsEdit은 상태 함수 setIsEdit의 인자로 `!isEdit`을 두어 isEdit이 false면 true로, true면 false로 `반전`되도록 함(스위치)
- true는 수정상태, false는 비 수정상태
- 수정하기 버튼의 onClick에 toggleIsEdit 지정

<br>

### - 삼항 연산자를 이용한 일기내용, 수정폼, 버튼 변환

```jsx
// DiaryItem.js

const [localContent, setLocalContent] = useState(content);

...

<div className="content">
    {isEdit ? (
        <textarea
            value={localContent}
            onChange={(e) => {
                setLocalContent(e.target.value);
            }}
        />
    ) : (
        <>{content}</>
    )}
</div>

{isEdit ? (
    <>
        <button onClick={handleQuitEdit}>수정 취소</button>
        <button onClick={handleEdit}>수정 완료</button>
    </>
) : (
    <>
        <button onClick={handleRemove}>삭제하기</button>
        <button onClick={toggleIsEdit}>수정하기</button>
    </>
)}
```

- 삼항 연산자를 사용하여 isEdit이 true, 즉 수정상태이면, textarea 요소가 생김
- 수정폼 textarea의 내용은 변수 localContent로 지정하고 state를 사용하여 `초기 값`을 기존에 작성되어있던 `일기 내용인 content`로 설정
- 버튼의 경우에도 삼항 연산자를 사용하여 isEdit이 true, 즉 수정상태이면 `수정 취소`, `수정 완료` 버튼을 보여주고, false로 수정상태가 아니면 기존의 `삭제하기` 및 `수정하기` 버튼이 보이도록 함

<br>

### 6-3. 버튼의 onClick 설정 및 데이터 이벤트 함수 자식으로 전달

### - onClick 설정

```jsx
// DiaryItem.js

// textarea의 DOM 접근 할 수 있도록 localContentInput 생성
const localContentInput = useRef();

// 수정 완료 버튼 클릭 시, 실행되는 hadleEdit 함수
const handleEdit = () => {
    if (localContent.length < 5) {
        localContentInput.current.focus();
        return;
    }
    if (window.confirm(`${id}번째 일기를 수정하시겠습니까?`)) {
        onEdit(id, localContent);
        toggleIsEdit();
    }
};


// 수정 취소 버튼 클릭 시, 실행되는 handleQuitEdit 함수
const handleQuitEdit = () => {
    setIsEdit(false);
    setLocalContent(content);
};

...

// 내용 수정 폼 textarea
<textarea ref={localContentInput}... />

// 수정 취소, 수정 완료 버튼
<>
    <button onClick={handleQuitEdit}>수정 취소</button>
    <button onClick={handleEdit}>수정 완료</button>
</>
```

- 먼저 수정 취소 버튼의 `handleQuitEdit`을 보면, `setIsEdit(false);`을 통해 수정하지 않음으로 변경
- 만약, 수정 중이였다면 수정 취소를 누르고 다시 수정하기 버튼을 클릭할 경우, 앞선 수정 내역이 그대로 남아있기에 취소 시, 이를 `초기화`하기 위해 `setLocalContent(content);`으로 기존 일기내용 넣기
- 수정 완료를 클릭하면 `handleEdit` 함수가 실행 됨
- textarea에 `useRef()`인 `localContentInput` 지정하여 DOM 접근 할 수 있도록 하기
- handleEdit 함수는 기존 일기내용의 규칙처럼 5글자 미만으로 작성된 경우, `focus()` 주기
- 통과된 경우, 확인 창을 띄우고 `onEdit()` 함수에 id와 localContent를 보내 데이터 수정
- toggleIsEdit() 함수로 다시 수정 활성화 상태 닫기

<br>

### - App 컴포넌트에서 onEdit 전달하기

```jsx
// App.js

const onEdit = (targetId, newContent) => {
    setData(
        data.map((it) =>
            it.id === targetId ? { ...it, content: newContent } : it,
        ),
    );
};

...

<DiaryList onEdit={onEdit} onRemove={onRemove} diaryList={data} />
```

```jsx
// DiaryList.js

const DiaryList = ({ onEdit, onRemove, diaryList }) => {
    ...
    <DiaryItem key={it.id} {...it} onRemove={onRemove} onEdit={onEdit} />
};
```

- onEdit 함수는 데이터의 `id`와 `수정된 내용`을 전달받음
- data들을 `map`으로 순회하여 인자로 전달받은 id와 같은 데이터를 찾아 content만 수정된 newContent로 `덮어씌움`
- App 컴포넌트에서 생성된 onEdit 함수를 DiaryList 컴포넌트로 전달하고 다시 DiaryItem 컴포넌트로 전달함

<br>

![리스트 수정 결과](README_img/리스트_데이터_수정하기.gif)

<리스트 데이터 수정 예시 결과>

<br>
<br>

## 7. React Lifecycle 제어하기 - useEffect

### 7-1. Lifecycle

- 생애주기로 일반적으로 `시간의 흐름`에 따라 탄생부터 죽음까지 이르는 `단계적` 과정
- React의 컴포넌트 역시 생명주기(Lifecycle)을 가짐
- 
<br>

![리액트 라이프사이클](README_img/lifecycle.png)

- React의 Lifecycle은 크게 3가지의 단계로 나뉨
    - `탄생`(Mount) : 화면에 나타나는 것
    - `변화`(Update) : 업데이트(리렌더)
    - `죽음`(Unmount) : 화면에서 사라짐
- 각각의 단계마다 `특정한 작업`을 수행하도록 할 수 있음

<br>

### - Lifecycle 각각의 단계에서 사용하는 메서드

- 지금까지는 화살표 함수를 이용한 `함수형 컴포넌트`만 이용해왔음
- 하지만, 이 메서드들은 `클래스형 컴포넌트`에서만 사용 가능 하다.
- `ref`, `state`의 경우도 함수형 컴포넌트에서는 사용이 불가능하고 `클래스형 컴포넌트`에서만 사용이 가능하다.

<br>

1. Mount 단계 : ComponentDidMount()
2. Update 단계 : ComponentDidUpdate()
3. Unmount 단계 : ComponentWillUnmount()

<br>

### 7-2. React Hooks

- 2019년 6월 정식 출시된 기능
- 앞선 Lifecycle에서 사용하는 메서드, state, ref를 함수형 컴포넌트를 사용하는 React에서 `사용하기 어려움`이 있었음
- 따라서 이러한 문제점을 해결하고자, `use` 키워드를 앞에 붙여 `클래스형 컴포넌트`가 사용하는 이 기능들을 `함수형 컴포넌트`에서 사용할 수 있도록 Hooking(낚음)한 것
- ex) useState, useEffect, useRef, ...

<br>

### - 애초에 React에서 클래스형 컴포넌트를 사용하지 않은 이유는?

- 클래스형 컴포넌트의 코드가 매우 길어질 수 있고 복잡해질 수 있음
- 중복 코드, 가독성 문제 등 여러 문제점을 해결하기 위해서 함수형 컴포넌트를 사용

<br>

### 7-3. useEffect

- 앞선 각 `Lifecycle의 단계에서 사용하는 메서드`들을 함수형 컴포넌트에서 사용할 수 있게 해줌
- 2개의 파라미터인 `콜백함수`, `의존성 배열`을 받음

```jsx
// useEffect 사용

import React, { useEffect } from "react";

useEffect(() => {
    // 콜백함수 작성
}, []); // '[]'는 Dependency Array(의존성 배열) : 이 배열 내에 들어있는 값이 변화하면 콜백함수가 수행됨
```

<br>

### - Mount 단계에서 작업수행

```jsx
// 새로 만든 Lifecycle.js

// Mount 단계에서 작업수행

import React, { useEffect, useState } from "react";

const Lifecycle = () => {
// Mount 단계에 실행됨 -> dependency array에 빈배열
    useEffect(() => {
        console.log("Mount!");
    }, []);
}
```

- dependency 배열에 아무 값도 넣지 않으면(`빈배열`) Mount 단계에서 콜백함수가 수행됨

<br>

### - Update 단계에서 작업수행

```jsx
// Lifecycle.js

import React, { useEffect, useState } from "react";

const Lifecycle = () => {
    const [count, setCount] = useState(0);
    const [text, setText] = useState("");

    // Update 단계에 실행됨 -> dependency array 없애기: 어느 요소라도 업데이트 되면 콜백함수 수행
    useEffect(() => {
      console.log("Update!");
    });
    
    // 특정 요소가 업데이트 되면 콜백함수 수행
    // count의 state가 변하는 순간 콜백함수 수행
    useEffect(() => {
      console.log(`count is update : ${count}`);
      if (count > 5) {
        alert("count가 5를 넘었습니다. 따라서 1로 초기화 합니다.");
        setCount(1);
      }
    }, [count]);
    
    // text의 state가 변하는 순간 콜백함수 수행
    useEffect(() => {
      console.log(`text is update : ${text}`);
    }, [text]);
}
```

- `dependency 배열을 자체를 없애면` 어느 요소라도 업데이트 되면 콜백함수 수행
- `dependency 배열에 값을 넣으면`, 해당 변수 값이 업데이트 되면 콜백함수 수행

<br>

![update](README_img/useEffect_update.gif)

<Update시 콘솔출력 예시>

<br>

### - Unmount 단계에서 작업수행

```jsx
// Lifecycle.js

import React, { useEffect, useState } from "react";

const UnmountTest = () => {
    // Unmount 단계에서 수행되는 작업을 만들기 위해서는 콜백함수 안에서
    // 함수를 리턴하게 하면, Unmount되는 경우, 리턴된 함수가 수행됨
    useEffect(() => {
        console.log("Mount!");
        return () => {
            // Unmount 경우, 수행
            console.log("Unmount!");
        };
    }, []);
    return <div>Unmount Testing Component</div>;
};
```

- Unmount 단계에서 수행되는 작업을 만들기 위해서는 useEffect의 콜백함수에 `리턴 함수를 정의`하면 해당 함수가 Unmount 단계에서 수행됨

<br>

![mount, Unmount](README_img/useEffect_mount_unmount.gif)

<Mount와 Unmount시 콘솔출력 예시>

<br>
<br>

## 8. React에서 API 호출하기

### 8-1. 학습목표

- useEffect를 사용하여 Mount 시점에 API를 호출하고 해당 API 결과 값을 일기 데이터의 초기 값으로 이용하기

<br>

### 8-2. fetch로 API 받아오기

```javascript
// App.js

const getData = async () => {
    const res = await fetch(
        "https://jsonplaceholder.typicode.com/comments",
    ).then((res) => res.json());
    const initData = res.slice(0, 20).map((it) => {
        return {
            author: it.email,
            content: it.body,
            emotion: Math.floor(Math.random() * 5) + 1,
            created_date: new Date().getTime(),
            id: dataId.current++,
        };
    });

    setData(initData);
};
```

- jsonplaceholder(더미 json을 응답하는 API)를 통해 fetch로 API 받기
- .then()을 사용하여 resolve되면, 해당 응답 데이터를 가져옴
- 하지만 해당 데이터는 헤더만 있기에 `.json()`로 사용가능한 `Promise 상태`로 변환
- 이중 20개를 slice하고, map을 통해 각각의 객체를 담은 배열을 리턴한다.
- 이 배열을 `setData`에 담아 data를 업데이트한다.

<br>

### 8-3. useEffect로 Mount시 데이터 호출

```javascript
// App.js

useEffect(() => {
    getData();
}, []);
```

- useEffect를 사용하고 dependency 배열을 `빈 배열`로 설정하여 `Mount 단계`에서 해당 블록을 수행
- 앞선 API를 호출하는 getData() 함수를 호출시킨다.

<br>

![API 호출](README_img/API사용.gif)

<화면 렌더링 시, API를 통해 가져온 데이터를 사용>

<br>
<br>

## 9. 최적화1 연산 결과 재사용 - useMemo

### 9-1. 학습목표

- 현재 일기 데이터를 분석하는 함수제작
- 일기 데이터의 길이가 변화하지 않을 때, 함수가 값을 다시 계산하지 않도록 하기
- Memoization 개념 이해하기

<br>

### 9-2. Memoization

- 프로그래밍 기법 중 하나
- 이미 계산해본 `연산 결과를 기억`해두고 동일한 계산을 수행할 경우, 연산을 `재수행하지 않고`, `기억해둔 데이터`를 바로 반환

<br>

### 9-3. App 컴포넌트에서 기분 좋은 일기, 기분 나쁜 일기 계산

- 필요한 데이터 3가지
  - 기분 나쁜 일기(1~2점) 개수
  - 기분 좋은 일기(3~5점) 개수
  - 기분 좋은 일기의 비율

<br>

### - 필요한 데이터 분석 함수 생성

```javascript
// App.js

const getDiaryAnalysis = () => {
    console.log("일기 분석 시작");

    const goodCount = data.filter((it) => it.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100;
    return { goodCount, badCount, goodRatio };
};

const { goodCount, badCount, goodRatio } = getDiaryAnalysis();
```

- getDiaryAnalysis 함수 생성하고, 함수가 호출될 때마다 콘솔에 "일기 분석 시작"을 출력한다.
- goodCount는 data 배열에서 객체의 emotion 값이 3이상인 것만 필터로 모아 length로 개수를 지정
- badCount는 전체 일기 개수 data.length에서 goodCount를 뺀 나머지 개수
- goodRatio는 전체 일기 개수에서 좋은 일기 개수를 나누고 100을 곱한 비율
- 최종적으로 getDiaryAnalysis 함수는 3개의 상수를 리턴함
- 비구조화 할당을 통해 함수 호출 시, 각각의 상수를 사용할 수 있게 됨

<br>

### - 데이터 출력

```javascript
// App.js

<div className="App">
    ...
    <div>전체 일기 : {data.length}</div>
    <div>기분 좋은 일기 개수 : {goodCount}</div>
    <div>기분 나쁜 일기 개수 : {badCount}</div>
    <div>기분 좋은 일기 비율 : {goodRatio}</div>
    ...
</div>
```

- 각각의 데이터를 출력한다.
- 콘솔을 보면 "일기 분석 시작"을 2번 출력하는데 이 이유는 처음에 data에 아무 것도 없는 상태에서 1번 호출되고, API로 데이터를 받아 리렌더 되어 2번째 호출일 발생하기에 2번 출력되는 것을 알 수 있음

<br>

### - 문제점

- 일기의 `내용을 수정`하는 것은 현재 우리가 출력하는 `기분 좋은 일기 개수`, `기분 나쁜 일기 개수`, `기분 좋은 일기 비율`에 어떠한 영향도 미치지 않는다.
- 그럼에도 불구하고 `내용을 수정`하면 `리렌더`가 발생하고 "일기 분석 시작"이 콘솔에 출력되며 `일기 분석 함수가 또 호출`된 것을 알 수 있다.
- 현재는 함수 하나가 호출되지만, 일기의 개수가 많아지거나, 더 많은 함수가 리렌더 시, 호출된다면 프로그램의 사용성에 영향을 줄 수 있다.
- 따라서 리렌더 될 때마다 함수를 호출하는 것이 아닌, `특정 값이 변화할 때만` 해당 함수를 수행하도록 할 수 있다.

<br>

### 9-4. useMemo

- 위의 문제를 useMemo를 사용하여 해결할 수 있다.
- useMemo는 `콜백함수`, `dependency 배열`을 인자로 받음, (useEffect와 유사)

```javascript
// App.js

const getDiaryAnalysis = useMemo(() => {
    console.log("일기 분석 시작");

    const goodCount = data.filter((it) => it.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100;
    return { goodCount, badCount, goodRatio };
}, [data.length]);
```

- 콜백함수가 실행되고 해당 리턴 값을 계속 기억해둔다.
- 그리고 dependency 배열에 담긴 값이 변화하지 않으면 리턴 값을 그대로 사용한다.
- 하지만 dependency 배열에 담긴 값이 변화하면 새로 업데이트된 리턴 값을 다시 사용하게 된다.
- 따라서 불필요한 연산을 막을 수 있다.

<br>

### - useMemo의 타입 (실수 주의)

- useMemo를 사용할 경우, 콜백함수가 리턴하는 값을 받기 때문에 getDiaryAnalysis는 함수가 아닌 상수가 됨

```javascript
// App.js

const { goodCount, badCount, goodRatio } = getDiaryAnalysis;
```

- 따라서 `getDiaryAnalysis();`와 같이 함수로 호출했었지만 useMemo를 사용하면 `getDiaryAnalysis`로 가져와야 함
- 함수 호출로 가져올 경우, 에러 발생

<br>

![useMemo](README_img/useMemo.gif)

<useMemo를 사용하여 불필요한 호출, 연산 막기 예시>

<br>
<br>

## 10. 최적화2 컴포넌트 재사용 - React.memo

### 10-1. 불필요한 리렌더

- count와 text라는 상태를 가진 App에서 count 값이 변화하면 어떻게 될까?

![불필요한 리렌더](README_img/React_memo_background.png)

- `state가 변화`하면 해당 컴포넌트와 자식 컴포넌트들은 `모두 리렌더가 발생`
- 불필요한 리렌더를 발생시키기에 컴포넌트의 양이 많을 경우, `성능 비효율`이 발생할 수 있다.

<br>

### 10-2. 해결방안

- 자식 컴포넌트에 `조건을 지정`한다.
- 해당 조건이 `충족`될 경우에만 `렌더링을 수행`하도록 함

![해결방안](README_img/React_memo_solution.png)

<br>

### 10-3. React.memo

- 함수형 컴포넌트에서 `동일한 props`을 `부모 컴포넌트`로부터 받아서 `동일한 렌더링`이 발생할 경우, 다시 렌더링하지 않고 마지막으로 렌더링된 결과를 재사용하는 방법
- props에 의해서만 렌더링을 재사용하는 것이며, state등의 변화 시에는 리렌더링 발생함

<br>

### - React.memo 테스트

- 부모 컴포넌트인 OptimizeTest를 생성
- `count`와 `text`의 두 개의 상태를 생성
- 자식 컴포넌트인 CountView와 TextView에 각각 props 전달

```javascript
// OptimizeTest.js

const OptimizeTest = () => {
    const [count, setCount] = useState(1);
    const [text, setText] = useState("");

    return (
        <div style={{ padding: 50 }}>
            <div>
                <h2>count</h2>
                <CountView count={count} />
                <button onClick={() => setCount(count + 1)}>+</button>
            </div>
            <div>
                <h2>text</h2>
                <TextView text={text} />
                <input
                    value={text}
                    onChange={(e) => {
                        setText(e.target.value);
                    }}
                />
            </div>
        </div>
    );
};
```

<br>

<React.memo 사용 전>

```javascript
// Optimize.js

import { useState, useEffect } from "react";

const TextView = ({ text }) => {
  useEffect(() => {
    console.log(`Update :: text : ${text}`);
  });
  return <div>{text}</div>;
};

const CountView = ({ count }) => {
  useEffect(() => {
    console.log(`Update :: count : ${count}`);
  });
  return <div>{count}</div>;
};
```

- `CountView`와 `TextView` 두 개의 자식 컴포넌트를 생성
- 각각 prop으로 count와 text를 받는다.
- useEffect를 사용하고 dependency 배열을 받지 않게하여 어떤 요소라도 Update(리렌더)되면 콘솔을 출력하도록 설정

<br>

![React.memo 적용 전](README_img/React_memo_non.png)

<자식 컴포넌트 동시에 리렌더되어 콘솔 출력>

<br>

<React.memo 사용 후>

```javascript
// Optimize.js

import React, { useState, useEffect } from "react";

const TextView = React.memo(({ text }) => {
  useEffect(() => {
    console.log(`Update :: text : ${text}`);
  });
  return <div>{text}</div>;
});

const CountView = React.memo(({ count }) => {
  useEffect(() => {
    console.log(`Update :: count : ${count}`);
  });
  return <div>{count}</div>;
});
```

- React를 import하기
- props를 받는 자식의 함수형 컴포넌트 전체를 `React.memo()`로 감싸기
- 이렇게 하게 되면 props의 값이 바뀌는 경우에만 해당 자식 컴포넌트가 리렌더하게 된다.

<br>

![React.memo 적용 후](README_img/React_memo_using.png)

<count 값만 변화하여 CountView만 리렌더되어 콘솔 출력>

<br>

### - props로 객체를 받는 경우 : 문제점

```javascript
// OptimizeTest.js

const OptimizeTest = () => {
    const [count, setCount] = useState(1);
    const [obj, setObj] = useState({
        count: 1,
    });

    return (
        <div style={{ padding: 50 }}>
            <div>
                <h2>Counter A</h2>
                <CounterA count={count} />
                <button
                    onClick={() => {
                        setCount(count);
                    }}
                >
                    A button
                </button>
            </div>
            <div>
                <h2>Counter B</h2>
                <CounterB obj={obj} />
                <button
                    onClick={() => {
                        setObj({ count: obj.count });
                    }}
                >
                    B button
                </button>
            </div>
        </div>
    );
};
```

- state로 count, obj 데이터 설정
- `setCount(count)`, `setObj({ count: obj.count })`로 기존 데이터와 같은 값을 state로 전달

<br>

```javascript
//OptimizeTest.js

import React, { useState, useEffect } from "react";

const CounterA = React.memo(({ count }) => {
  useEffect(() => {
    console.log(`CounterA Update - count : ${count}`);
  });
  return <div>{count}</div>;
});

const CounterB = React.memo(({ obj }) => {
  useEffect(() => {
    console.log(`CounterB Update - count : ${obj.count}`);
  });
  return <div>{obj.count}</div>;
});
```

- useMemo를 사용하여 부모 컴포넌트 OptimizeTest로부터 받은 props인 count와 obj가 변경되면 useEffect에 의해서 콘솔에 업데이트 결과가 출력되도록 설정하였다.
- CounterA 컴포넌트의 경우, `count` 값이 `setCount(count)`에 의해 동일한 값을 보내기에 `리렌더되지 않음`
- 반면 CounterB 컴포넌트의 경우, `obj` 값이 `setObj({ count: obj.count })`로 값의 변화가 없지만 `리렌더가 발생`한다.

<br>

<객체를 비교하는 방법>

```javascript
const a = {count: 1};
const b = {count: 1};
```

- 위의 경우, `a === b`는 true일까?
  - 정답은 false
- 객체를 비교하는 경우, 객체의 `주소(해시)`를 비교하게 되는데 이 주소가 다르기에 다른 객체로 인식하게 된다. (`얕은 비교`)
- 따라서 동일한 props를 받은 것같지만 다른 객체로 판단하기에 React.memo에서 리렌더링이 발생한다.

<br>

```javascript
const a = {count: 1};
const b = a;
```

- 이 경우는 b에서 a 자체를 참조하여 같은 객체 주소를 가리키기에 `a === b`가 `true`이다.

<br>

### - props로 객체를 받는 경우 : 해결 - areEqual() 함수

```javascript
// OptimizeTest.js

const CounterB = ({ obj }) => {
    useEffect(() => {
        console.log(`CounterB Update - count : ${obj.count}`);
    });
    return <div>{obj.count}</div>;
};
```

- 기존 CounterB 컴포넌트에서 React.memo 제거

<br>

```javascript
// OptimizeTest.js

const areEqual = (prevProps, nextProps) => {
    if (prevProps.obj.count === nextProps.obj.count) {
        return true; // 이전 props와 현재 props가 같다 -> 리렌더 발생 안 함
    }
    return false; // 이전 props와 현재 props가 다르다 -> 리렌더 발생
};

// -------------------------------------------------

// 축약된 코드

const areEqual = (prevProps, nextProps) => {
    return prevProps.obj.count === nextProps.obj.count;
};
```

- 두 개의 객체 인자를 받아 값이 같은지 비교하여 `같으면 true`, `다르면 false`를 리턴하는 함수 `areEqual`을 생성

<br>

```javascript
// OptimizeTest.js

const MemoizedCounterB = React.memo(CounterB, areEqual);

...
<div>
    <h2>Counter B</h2>
    <MemoizedCounterB obj={obj} />
    <button
        onClick={() => {
            setObj({ count: obj.count });
        }}
    >
        B button
    </button>
</div>
...
```

- React.memo에 기존의 컴포넌트 함수 `CounterB`와 값을 비교하는 함수 `areEqual`을 인자로 주면 새로운 함수형 컴포넌트를 생성함
- 이 함수를 부모 컴포넌트에 사용하면 props로 받은 객체의 얕은 비교를 하지않고, 두 번째 인자의 areEqual이 리턴하는 true/false에 따라 리렌더를 결정하게 된다.

<br>
<br>

## 11. 최적화3 컴포넌트 & 함수 재사용 - useCallback

### 11-1. 최적화할 요소 찾기

### - React Developer Tools 활용

- 크롬 브라우저의 확장 앱으로 메타(Meta)에서 개발함
- 브라우저 상의 페이지가 React 기반으로 제작되었는지 확인할 수 있음
- 옵션에서 `Highlight updates when components render`를 활성화하면 현재 `리렌더`링되는 컴포넌트를 `하이라이트` 해줌

<br>

![리액트 개발 도구 하이라이트 기능](README_img/React_highlight.gif)

<일기 내용이 업데이트될 때마다 DiaryEditor.js 영역이 노란색으로 하이라이트됨>

<br>

### - 리렌더링이 일어나는 경우

- 본인이 가진 state가 변경될 경우
- 부모 컴포넌트가 리렌더링되는 경우
- 자신이 받은 props가 변경되는 경우

<br>

### 11-2. useCallback

- ReactHooks 중 하나
- useCallback은 useMemo와 동일하게 구성되나 `useMemo`는 동일한 `연산의 결과 값`을 리턴하는 반면, `useCallback`은 `콜백함수`를 리턴한다.
- dependency 배열의 값이 변화하지 않으면 동일한 콜백함수를 사용하는 것을 도움

```javascript
// useCallback 기본구성(콜백함수, dependency 배열)

const memoizationCallback = useCallback(
    () => {
        doSometing(a, b);
    }, [a, b]
);
```

<br>

### 11-3. useCallback 사용

- DiaryList에서 변화가 있을 경우, data 변수가 업데이트되고 data를 state로 가지는 App.js(부모 컴포넌트)는 리렌더링 된다.
- 부모 컴포넌트에서 리렌더링이 일어나기에 자식 컴포넌트인 `DiaryList`와 `DiaryEditor` 모두 리렌더링 된다.
- 하지만 data가 변화하더라도 `DiaryEditor`는 `리렌더링 될 필요가 없다`.
- DiaryEditor는 부모 App 컴포넌트로부터 `onCreate` 함수를 props로 받고 있다.
- 따라서 동일한 onCreate 함수를 props로 받아 리렌더링이 일어나지 않도록 `onCreate` 함수에 `useCallback`을 사용하고 `DiaryEditor`는 동일한 props를 받으면 리렌더링되지 않도록 `React.memo`를 사용한다. 

```javascript
// DiaryEditor.js

export default React.memo(DiaryEditor);
```

```javascript
// App.js

const onCreate = useCallback((author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
        author,
        content,
        emotion,
        created_date,
        id: dataId.current,
    };
    dataId.current += 1;
    setData([newItem, ...data]);
}, []);
```

<br>

### 11-4. 최적화의 딜레마

- useCallback을 적용한 현재 DiaryEditor에서 일기를 작성하면, onCreate가 수행되는데 useCallback의 `dependency`에 `빈배열`을 담고 있기 때문에 최초의 mount될 때의 `data(빈배열)`만 기억하여 `작성된 일기를 빈배열에 계속 넣게 된다`.
- 밑빠진 독에 물붓기와 같은 현상 발생
- `dependency 배열`에 `data`를 넣게 되면, data를 `참조`받아 기존 일기에 새로 작성된 일기를 추가하게 되지만 `data가 변화`할 때마다 `DiaryEditor가 리렌더`되어 useCallback을 사용한 `이점이 사라진다`.

<br>

### 11-5. 함수형 업데이트

- setState 함수에 함수를 전달하는 것

```javascript
// App.js

const onCreate = useCallback((author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
        author,
        content,
        emotion,
        created_date,
        id: dataId.current,
    };
    dataId.current += 1;
    setData((data) => [newItem, ...data]);
}, []);
```

- `setData((data) => [newItem, ...data])`를 보면 setData 함수 내에 함수를 사용하고 data를 인자로 받아 업데이트된 배열을 리턴한다.
- 이렇게 하면 dependency 배열은 data를 가지지 않아 data가 수정되더라도 onCreate는 동일한 콜백함수를 리턴하여 리렌더가 발생하지 않음
- 대신 setData에서 콜백함수 `인자`로 `data`를 참조하기에 data가 `빈배열로 초기화되지 않는다`.

<br>
<br>

## 12. 최적화4 - React.memo + useCallback

### 12-1. 최적화 필요 부분

- DiaryItem에서 `일기 하나`가 삭제될 경우, `모든 일기들이 리렌더링`되는 것을 알 수 있음
- 일기의 개수가 많이 있을 경우, 성능에 좋지 않음

<br>

### 12-2. React.memo와 useCallback 적용

```javascript
// DiaryItem.js

const DiaryItem = ({onEdit, onRemove, author, content, created_date, emotion, id}) => {
    ...
}

export default React.memo(DiaryItem);
```

- `React.memo`로 `동일한 props`를 받을 경우, `리렌더 발생 방지`
- 현재 DiaryItem 컴포넌트는 onEdit, onRemove, author, content, created_date, emotion, id를 props로 받고 있음
- author, content, created_date, emotion, id는 동일한 값의 props를 받는다는 것을 React.memo를 통해 인식할 수 있음
- 하지만, onEdit, onRemove의 경우, 함수이기 때문에 얕은 비교로 동일한 함수인지 아닌지 React.memo에서는 판별이 어려움
- 따라서 `onEdit`과 `onRemove`에 `useCallback`으로 동일한 콜백함수를 보내는 처리를 해주어야 함

<br>

```javascript
// App.js

const onRemove = useCallback((targetId) => {
    setData((data) => data.filter((it) => it.id !== targetId));
}, []);

const onEdit = useCallback((targetId, newContent) => {
    setData((data) =>
        data.map((it) =>
            it.id === targetId ? { ...it, content: newContent } : it,
        ),
    );
}, []);
```

- App 컴포넌트에서 onRemove 함수와 onEdit 함수에 useCallback 처리를 하고 dependency 배열은 빈배열로 처리
- useCallback의 딜레마에 빠지지 않고 setState에서 최신의 데이터를 받게하기 위해 data를 인자로 받는 화살표 함수를 사용하여 함수형 업데이트를 진행
- 이렇게 하면 DiaryItem 하나를 업데이트하여도 다른 DiaryItem들이 리렌더 되지 않음

<br>

![React.memo + useCallback](README_img/React_memo_useCallback.gif)

<React.memo와 useCallback을 활용하여 업데이트되는 DiaryItem만 리렌더>

<br>
<br>

## 13. 복잡한 상태 관리 로직 분리하기 - useReducer

### 13-1. App 컴포넌트의 복잡함

![App의 상태변화함수](README_img/React_setStates.png)

- 현재 App 컴포넌트에는 useState로 인하여 `setState`인 상태 변화 처리함수가 `코드 상에 많이 포함`되어있음
- 이 상태 변화 함수들은 모두 `data를 사용`하고 있기 때문에 App 컴포넌트에서 작성되었음
- App 컴포넌트 코드가 복잡하고 길어짐
- 상태 변화 함수가 많아질수록 더 복잡해짐

<br>

### 13-2. useReducer

- React Hooks 중 하나
- 컴포넌트에서 `상태 변화 로직`을 `분리`하여 따로 관리

<br>

<useReducer를 사용하지 않은 예시>

```jsx
const Counter = () => {
    const [count, setCount] = useState(0);
    
    const add1 = () => {
        setCount(count + 1);
    };
    
    const add10 = () => {
        setCount(count + 10);
    };
    
    const add100 = () => {
        setCount(count + 100);
    };
    
    return (
        <div>
            {count}
            <button onClick={add1}>add 1</button>
            <button onClick={add10}>add 10</button>
            <button onClick={add100}>add 100</button>
        </div>
    )
};
```

<br>

<useReducer를 사용하여 상태 변화 로직 분리 예시>

```jsx
// 상태 관리 로직 분리

const reducer = (state, action) => {
    switch (action.type) {
        case 1:
            return state + 1;
        case 10:
            return state + 10;
        case 100:
            return state + 100;
        default:
            return state;
    }
}
```

- 상태 변화 로직을 따로 분리하여 `switch-case 문법`처럼 활용
- `state` : 현재 가장 최신의 state
- `action` : dispatch 호출 시 전달한 인자인 `action 객체`

<br>

```jsx
// useReducer 적용

const Counter = () => {
    const [count, dispatch] = useReducer(reducer, 1);
    
    return (
        <div>
            {count}
            <button onClick={() => dispatch({ type: 1})}>add 1</button>
            <button onClick={() => dispatch({ type: 10})}>add 10</button>
            <button onClick={() => dispatch({ type: 100})}>add 100</button>
        </div>
    )
};
```

- useState와 같이 `비구조화 할당` 사용
- `count` : 0번 인덱스로 상태(state)
- `dispatch` : 1번 인덱스로 상태 변화를 일으키는(`raise`) 함수
- `useReducer()` : 상태 변화 관리 React Hook
  - `reducer` : 0번 인덱스로 dispatch에서 일어난 `상태변화 action을 처리`해주는 함수
  - `1` : 상태인 count의 `초기 값`
- `dispatch({ type: 1 })` : dispatch 호출 시, 전달하는 {type: 1}과 같은 객체를 `action 객체`라고 함

<br>

### 13-3. App 컴포넌트에 useReducer 적용하기

```jsx
// App.js

// reducer 함수 따로 생성

const reducer = (state, action) => {
    switch (action.type) {
        // 처음 Mount 될 때,
        case "INIT": {
            return action.data; // action에 담긴 data 그대로 리턴
        }
        // 생성할 때,
        case "CREATE": {
            const created_date = new Date().getTime(); // 생성일자 따로 처리
            const newItem = {
                ...action.data,
                created_date,
            }; // 받은 action의 data에 생성일자 추가한 새로운 일기 newItem
            return [newItem, ...state]; // 기존 일기 state에 newItem 추가하여 리턴
        }
        // 삭제할 때,
        case "REMOVE": {
            // 해당 id가 아닌 일기만 모아서 리턴
            return state.filter((it) => it.id !== action.targetId);
        }
        // 수정할 때,
        case "EDIT": {
            // 해당 id인 일기를 찾아서 content만 action으로 받은 newContent로 수정하여 리턴
            return state.map((it) =>
                it.id === action.targetId ? { ...it, content: action.newContent } : it,
            );
        }
        default:
            return state;
    }
};
```

```jsx
// App.js

// useState 대신 useReducer 사용
const [data, dispatch] = useReducer(reducer, []);

// 기존의 setData를 이용하는 모든 상태 변화 함수 수정 -> dispatch 적용
const getData = async () => {
    const res = await fetch(
        "https://jsonplaceholder.typicode.com/comments",
    ).then((res) => res.json());
    const initData = res.slice(0, 20).map((it) => {
        return {
            author: it.email,
            content: it.body,
            emotion: Math.floor(Math.random() * 5) + 1,
            created_date: new Date().getTime(),
            id: dataId.current++,
        };
    });

    dispatch({ type: "INIT", data: initData });
};

const onCreate = useCallback((author, content, emotion) => {
    dispatch({
        type: "CREATE",
        data: { author, content, emotion, id: dataId.current },
    });
    dataId.current += 1;
}, []);

const onRemove = useCallback((targetId) => {
    dispatch({ type: "REMOVE", targetId });
}, []);

const onEdit = useCallback((targetId, newContent) => {
    dispatch({ type: "EDIT", targetId, newContent });
}, []);
```

- `dispatch`는 기존의 데이터를 어떠한 처리없이 받는 것이 가능하기에 기존의 useCallback 딜레마에서 함수형 업데이트 처리와 같은 `별도의 조치를 하지 않아도 괜찮음`

<br>
<br>