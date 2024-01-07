import { useRef, useState } from "react";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import "./App.css";

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

function App() {
  return (
    <div className="App">
      <DiaryEditor />
      <DiaryList diaryList={dummyList} />
    </div>
  );
}

export default App;
