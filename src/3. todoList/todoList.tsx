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
  // TodoItem 배열 상태 관리
  const [ items, setItems ] = useState<Todo[]>([]);

  // 빈 배열일 때 출력할 기본 UI용 Todo 객체
  const emptyTodo: Todo = {
    id: 'empty',
    text: 'There is no registered tasks',
    isDone: false,
  };

  // ref가 연결되는 건 DOM 요소 -> <string> X
  const inputRef = useRef<HTMLInputElement | null>(null);

  function addItem() {
    // 입력이 없을 경우 리턴
    if(!inputRef.current) return;

    // 입력한 item 가져오기
    const text = inputRef.current?.value;

    // items 배열에 아이템 추가
    setItems(prev => [
      ...prev, {id:String(Date.now()), text:text, isDone:false}
    ]);

    // 입력창 초기화
    inputRef.current.value = '';
  };

  // input 태그에서 엔터 입력시 아이템 추가
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Enter 키를 눌렀고 지금 문자를 조합 중이 아니라면 addItem 실행 
    // (한국어, 일본어, 중국어 등 문자 조합이 필요한 입력에 사용)
    if(e.key == 'Enter' && !e.nativeEvent.isComposing) {
      addItem();
    }
  };
  
  // items 배열에서 자식 컴포넌트에서 전달받은 id 값을 가지는 객체의 isDone 상태를 변경
  function onToggle(id: string) {
    const newItems = items.map((item) => {
      if(item.id === id) {
        item.isDone = !item.isDone;
      }
      return item;
    })
    setItems(newItems);
  };

  // items 배열에서 자식 컴포넌트에서 전달받은 id 값을 가지는 객체를 제거
  function onDelete(id: string) {
    const newItems = items.filter(item => item.id !== id);
    setItems(newItems);
  };

  // items 배열에서 자식 컴포넌트에서 전달받은 id 값을 가지는 객체를 수정
  function onEdit(id: string, editText:string) {
    const newItems = items.map((item) => {
      if(item.id === id) {
        item.text = editText;
      }
      return item;
    })
    setItems(newItems);
  }

  return (
    <div className="flex flex-col w-full h-full text-xl items-center justify-center">
      <div className="w-[700px] h-full m-10 border border-gray-500 rounded-[5px] bg-gray-100 space-y-4">
        <h2 className="mx-14 mt-14 text-3xl">Todo List</h2>
        <p className="mx-14">Please Input Your Todo List</p>
        <div className="flex items-center justify-between mx-14 gap-x-3 text-gray-600">
          {/* Item 입력 */}
          <input type="text" ref={inputRef} placeholder="Enter Todo List" onKeyDown={handleKeyDown}
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
          ?  <TodoItem todo={emptyTodo} onToggle={onToggle} />
          : items.map(item => <TodoItem key={item.id} todo={item} onToggle={onToggle} 
            onDelete={onDelete} onEdit={onEdit} />)}
        </div>
      </div>
    </div>
  )
}