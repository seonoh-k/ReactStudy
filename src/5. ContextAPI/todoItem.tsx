import React from "react";
import { useState, useRef, useEffect } from "react";
import Button from "./button";
import { useActionsContext } from "./useTodoContext";
import type { Todo } from "./TodoContext";

// React.memo를 사용해 컴포넌트 메모이제이션
export default React.memo(function TodoItem(item: Todo) {
  console.log("item Item Render", item.id);
  // 수정모드 전환용 상태
  const [ isEditing, setIsEditing ] = useState<boolean>(false);
  // 수정할 텍스트 저장
  // const [ editText, setEditText ] = useState<string>('');

  // 전역 상태 변경 함수
  const { onToggle, onEdit, onDelete } = useActionsContext();

  // 불필요한 리렌더링을 제한하기 위해 상태에서 참조로 변경
  const editRef = useRef<HTMLInputElement | null>(null);

  // 수정 모드 전환 함수
  function modeChange() {
    setIsEditing(prev => !prev);
    // setEditText(item.text);
  }

  // 수정 모드 진입 시 참조값 초기 설정
  useEffect(() => {
    if(!editRef.current) return;
    if(isEditing == true) {
      editRef.current.value = item.text;
    }
  }, [isEditing, item.text]);

  // 입력한 텍스트 저장
  // function changeText(e: React.ChangeEvent<HTMLInputElement>) {
  //   setEditText(e.target.value);
  // }

  // 엔터키 눌렀을 때 수정 실행 후 수정 모드 종료
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if(e.key == "Enter" && !e.nativeEvent.isComposing) {
      // text = undefined가 되는 경우를 방지하기 위해 기본값 설정
      // const text = editRef.current?.value ?? '';
      // 빈 문자열이거나 공백이면 리턴
      // if(!text.trim()) return;

      // 위 코드를 다르게 작성
      const text = (editRef.current?.value ?? '').trim();
      if(!text) return;
      // 입력한 값에 변경이 없다면 리턴
      if(text == item.text) return;
      
      onEdit(item.id, text);
      setIsEditing(false);
    }
  }
  
  return (
    <div className="flex items-center justify-between mx-14 
    border border-gray-500 rounded-[5px] bg-gray-300 text-gray-700">
      {isEditing
        // 수정 모드
      ? <input type="text" ref={editRef} defaultValue={item.text} onKeyDown={handleKeyDown}
        className="w-[480px] h-[42px] border border-gray-500 rounded-[5px] bg-white p-2 ml-2" />
        // 아이템 출력
      : <div className="flex ml-3 space-x-2">
          {/* 체크박스 */}
          <input type="checkbox" onChange={() => onToggle(item.id)} checked={item.isDone} className="w-7 h-7 accent-green-200" />
          {/* Item */}
          <span className={item.isDone ? 'line-through' : ''}>{item.text}</span>
        </div> 
      }
      <div className="mr-2 space-x-1 mr-4 m-3">
        {/* 수정 버튼 */}
        <Button type="edit" onClick={modeChange} />
        {/* 삭제 버튼 */}
        <Button type="delete" onClick={() => onDelete(item.id)} />
      </div>
    </div>
  )
});