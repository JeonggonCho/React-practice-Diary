import React, { useEffect, useState } from "react";

const UnmountTest = () => {
  // Unmount 단계에서 수행되는 작업을 만들기 위해서는 콜백함수 안에서 함수를 리턴하게 하면, Unmount되는 경우, 리턴된 함수가 수행됨
  useEffect(() => {
    console.log("Mount!");
    return () => {
      // Unmount 경우, 수행
      console.log("Unmount!");
    };
  }, []);

  return <div>Unmount Testing Component</div>;
};

const Lifecycle = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggle = () => setIsVisible(!isVisible);

  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  // Mount 단계에 실행됨 -> dependency array에 빈배열
  useEffect(() => {
    console.log("Mount!");
  }, []);

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

  return (
    <div style={{ padding: 20 }}>
      <button onClick={toggle}>ON/OFF</button>
      {/*단락회로평가 : &&에서 둘 다 참일 경우 뒤에 것을 반환함*/}
      {isVisible && <UnmountTest />}
      <div>
        {count}
        <button onClick={() => setCount(count + 1)}>+</button>{" "}
      </div>
      <div>
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

export default Lifecycle;
