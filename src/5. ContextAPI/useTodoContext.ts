import { useContext } from "react";
import { TodoItemsContext, TodoActionsContext } from "./TodoContext";

export function useItemsContext() {
  const context = useContext(TodoItemsContext);
  if (context === null) {
    throw new Error(
      'useItemsContext는 TodoContex로 감싼 컴포넌트 안에서만 호출할 수 있습니다.'
    )
  }
  return context;
}

export function useActionsContext() {
  const context = useContext(TodoActionsContext);
  if (context === null) {
    throw new Error(
      'useActionsContext는 TodoContex로 감싼 컴포넌트 안에서만 호출할 수 있습니다.'
    )
  }
  return context;  
}