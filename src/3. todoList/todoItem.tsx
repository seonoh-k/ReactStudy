import React from "react";
import { useState } from "react";
import { FaTimes, FaPen } from "react-icons/fa";
import Button from "./button";

type ItemProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onEdit: (id: string, editText: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoItem({ todo, onToggle, onEdit, onDelete }: ItemProps) {
  // 수정모드 전환용 상태
  const [ isEditing, setIsEditing ] = useState<boolean>(false);
  // 수정할 텍스트 저장
  const [ editText, setEditText ] = useState<string>('');

  // 수정 모드 전환 함수
  function modeChange() {
    setIsEditing(prev => !prev);
    setEditText(todo.text);
  }

  // 입력한 텍스트 저장
  function changeText(e: React.ChangeEvent<HTMLInputElement>) {
    setEditText(e.target.value);
  }

  // 엔터키 눌렀을 때 수정 실행 후 수정 모드 종료
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if(e.key == "Enter" && !e.nativeEvent.isComposing) {
      onEdit(todo.id, editText);
      setIsEditing(false);
    }
  }
  
  return (
    <div className="flex items-center justify-between mx-14 
    border border-gray-500 rounded-[5px] bg-gray-300 text-gray-700">
      {isEditing
        // 수정 모드
      ? <input type="text" value={editText} onKeyDown={handleKeyDown} onChange={changeText}
        className="w-[480px] h-[42px] border border-gray-500 rounded-[5px] bg-white p-2 ml-2" />
        // 아이템 출력
      : <div className="flex ml-3 space-x-2">
          {/* 체크박스 */}
          <input type="checkbox" onChange={() => onToggle(todo.id)} checked={todo.isDone} className="w-7 h-7 accent-green-200" />
          {/* Item */}
          <span className={todo.isDone ? 'line-through' : ''}>{todo.text}</span>
        </div> 
      }
      <div className="mr-2 space-x-1 mr-4 m-3">
        {/* 수정 버튼 */}
        <Button type="edit" onClick={modeChange} />
        {/* 삭제 버튼 */}
        <Button type="delete" onClick={() => onDelete(todo.id)} />
      </div>
    </div>
  )
}