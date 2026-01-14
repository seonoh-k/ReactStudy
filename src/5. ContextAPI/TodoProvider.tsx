import { useState, useCallback, useMemo } from "react";
import { TodoItemsContext , TodoActionsContext} from "./TodoContext";
import type { Todo } from "./TodoContext";

export default function TodoProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Todo item 객체 배열 상태 관리
  const [ items, setItems ] = useState<Todo[]>([]);

  // 함수 참조의 안정화를 위해 useCallback을 사용해 메모이제이션
  // 아이템 추가 함수
  const addItem = useCallback((text: string) => 
    setItems(prev => [...prev, {id:String(Date.now()), text, isDone:false}]), []);
  // 완료/미완료 토글 함수
  const onToggle = useCallback((id: string) => 
    setItems(prev => prev.map((item) => {
      if(item.id === id) {
        return {...item, isDone: !item.isDone};
      }
      return item;
    })
  ), []);
  // 아이템 수정 함수
  const onEdit = useCallback((id: string, editText: string) => 
    setItems(prev => prev.map((item) => {
      if(item.id === id) {
        return { ...item, text: editText};
      }
      return item;
    })
  ), []);
  // 아이템 삭제 함수
  const onDelete = useCallback((id: string) => 
    setItems(prev => prev.filter(item => item.id !== id)),[]);

  // value의 객체 참조를 고정하기 위해 useMemo를 사용해 메모이제이션
  const actions = useMemo(() => ({ addItem, onToggle, onEdit, onDelete }), [addItem, onToggle, onEdit, onDelete]);

  return (
    // 상태 컨텍스트와 함수 컨텍스트를 같이 사용해야 하기 때문에 중첩
    <TodoItemsContext.Provider value={ items }>
      <TodoActionsContext.Provider value={ actions }>
        {children}
      </TodoActionsContext.Provider>
    </TodoItemsContext.Provider>
  )
}
