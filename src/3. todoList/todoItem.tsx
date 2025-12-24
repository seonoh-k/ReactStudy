import React from "react";
import { FaTimes, FaPen } from "react-icons/fa";

// onChange={checkItem}
type ItemProps = {
  todo: Todo;
}

export default function TodoItem({ todo }: ItemProps) {
  return (
    <div className="flex items-center justify-between mx-14 
    border border-gray-500 rounded-[5px] bg-gray-300 text-gray-700">
      <div className="flex ml-3 space-x-2">
        {/* 체크박스 */}
        <input type="checkbox" checked={todo.isDone} className="w-7 h-7 accent-green-200" />
        {/* Item */}
        <span className={todo.isDone ? 'line-through' : ''}>{todo.text}</span>
      </div>
      <div className="mr-2 space-x-1 mr-4 m-3">
        {/* 수정 버튼 */}
        <button className="p-1">
          <FaPen />
        </button>
        {/* 삭제 버튼 */}
        <button className="p-1">
          <FaTimes />
        </button>
      </div>
    </div>
  )
}