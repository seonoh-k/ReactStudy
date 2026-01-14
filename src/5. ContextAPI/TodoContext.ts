import { createContext } from "react";

// Todo 타입 지정
export type Todo = {
  id: string;
  text: string;
  isDone: boolean;
}

// Action 타입 지정
export type TodoAction = {
  addItem: (text: string) => void;
  onToggle: (id: string) => void;
  onEdit: (id: string, editText: string) => void;
  onDelete: (id: string) => void;
}

// Todo 객체 배열을 관리할 컨텍스트 객체 생성
export const TodoItemsContext = createContext<Todo[] | null>(null);
// TodoAction = 함수를 관리할 컨텍스트 객체 생성
export const TodoActionsContext = createContext<TodoAction | null>(null);