import React from "react";
import { useState, useRef } from "react";
import { FaSquarePlus } from "react-icons/fa6";
import TodoItem from "./todoItem";

type Todo = {
  id: string;
  text: string;
  isDone: boolean;
}

export default function TodoList() {
  const [ items, setItems ] = useState<Todo[]>([]);
  const [ isDone, setIsDone ] = useState<boolean>(false);

  // 빈 배열일 때 출력할 기본 UI용 Todo 객체
  const emptyTodo: Todo = {
    id: 'empty',
    text: 'There is no registered tasks',
    isDone: false
  };

  // ref가 연결되는 건 DOM 요소 -> <string> X
  const inputRef = useRef<HTMLInputElement | null>(null);

  function addItem() {
    // 입력이 없을 경우 리턴
    if(!inputRef.current) return;

    // 입력한 item 가져오기
    // const item = inputRef.current?.value;
    const text = inputRef.current?.value;
    // 배열 상태 관리에서 배열에 아이템 추가
    // setItems(prev => [...prev, text]);
    setItems(prev => [
      ...prev, {id:String(Date.now()), text:text, isDone:false}
    ]);
    // 입력창 초기화
    inputRef.current.value = '';
  }
  
  // Event Type 지정 -> input에서 발생한 change 이벤트
  // function checkItem(e: React.ChangeEvent<HTMLInputElement>) {
  //   setIsDone(e.target.checked);
  // }

  return (
    <div className="flex flex-col w-full h-full text-xl items-center justify-center">
      <div className="w-[700px] h-full m-10 border border-gray-500 rounded-[5px] bg-gray-100 space-y-4">
        <h2 className="mx-14 mt-14 text-3xl">Todo List</h2>
        <p className="mx-14">Please Input Your Todo List</p>
        <div className="flex items-center justify-between mx-14 gap-x-3 text-gray-600">
          {/* Item 입력 */}
          <input type="text" ref={inputRef} placeholder="Enter Todo List"
          className="w-[530px] h-[42px] border border-gray-500 rounded-[5px] bg-white p-2" />
          {/* Item 추가 버튼 */}
          <button className="text-5xl" onClick={addItem}>
            <FaSquarePlus />
          </button>
        </div>
        <hr className="mx-14 text-gray-500" />
        {/* Todo List */}
        <div className="mb-14 space-y-4">
          {/* TodoItem UI */}
          {items.length == 0 
          ?  <TodoItem todo={emptyTodo} />
          : items.map(item => <TodoItem key={item.id} todo={item} />)}
        </div>
      </div>
    </div>
  )
}