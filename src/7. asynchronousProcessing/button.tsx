import React from "react";
import { FaTimes, FaPen } from "react-icons/fa";
import { FaSquarePlus } from "react-icons/fa6";

// 버튼 타입 지정
type BtnProps = {
  type: "add" | "edit" | "delete";
  // 부모 컴포넌트에서 버튼에 따라 다른 함수 전달
  onClick?: () => void;
}

export default function Button({ type, onClick }: BtnProps) {
  console.log("Button Render", type);

  // 버튼 타입에 따라 다른 아이콘 출력
  function btnType(type) {
    switch (type) {
      case "add":
        return <FaSquarePlus />;
      case "edit":
        return <FaPen />;
      case "delete":
        return <FaTimes />;
    }
  }

  // 버튼 타입에 따라 다른 스타일 적용
  function btnStyle(type) {
    if(type === "add") {
      return "text-5xl";
    }else {
      return "p-1";
    }
  }

  return (
    <button className={btnStyle(type)} onClick={onClick}>
      {btnType(type)}
    </button>
  )
}