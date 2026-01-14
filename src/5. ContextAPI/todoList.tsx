import React from "react";
import { useRef } from "react";
import { FaSquarePlus } from "react-icons/fa6";
import TodoItem from "./todoItem";
import { useItemsContext, useActionsContext } from "./useTodoContext";
import type { Todo } from "./TodoContext";

// TodoItem 메모이제이션 (부모 측에서 사용)
// 컴포넌트 안에서 메모이제이션할 경우 렌더링할 때마다 메모이제이션하기 때문에 무효화 
// const MemoizedItem = React.memo(TodoItem);

// 빈 배열일 때 출력할 기본 UI용 Todo 객체
const emptyTodo: Todo = {
  id: 'empty',
  text: 'There is no registered tasks',
  isDone: false,
};

export default function TodoList() {
  console.log("Todo List Render");
  // 전역 상태 받아오기
  const items = useItemsContext();
  const { addItem } = useActionsContext();


  // ref가 연결되는 건 DOM 요소 -> <string> X
  const inputRef = useRef<HTMLInputElement | null>(null);

  function pushItem() {
    // 입력이 없을 경우 리턴
    if(!inputRef.current) return;

    // 입력한 item 가져오기
    const text = inputRef.current?.value;

    // items 배열에 아이템 추가
    addItem(text);

    // 입력창 초기화
    inputRef.current.value = '';
  };

  // input 태그에서 엔터 입력시 아이템 추가
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Enter 키를 눌렀고 지금 문자를 조합 중이 아니라면 addItem 실행 
    // (한국어, 일본어, 중국어 등 문자 조합이 필요한 입력에 사용)
    if(e.key == 'Enter' && !e.nativeEvent.isComposing) {
      pushItem();
    }
  };

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
          <button className="text-5xl" onClick={pushItem}>
            <FaSquarePlus />
          </button>
        </div>
        <hr className="mx-14 text-gray-500" />
        {/* Todo List */}
        <div className="mb-14 space-y-4">
          {/* TodoItem UI */}
          {items.length == 0 
          ?  <TodoItem {...emptyTodo} />
          : items.map(item => <TodoItem key={item.id} {...item} />)}
        </div>
      </div>
    </div>
  )
}