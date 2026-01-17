import { create } from "zustand";

// Todo 타입 지정
export type Todo = {
  id: string;
  text: string;
  isDone: boolean;
}

// 전역 상태,함수 타입 지정
type Items = {
  items: Todo[],
  isLoading: boolean,
  error: string,
  refreshItems: (newItems: Todo[]) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (text: string) => void;
}

export const useItemStore = create<Items>((set) => ({
  items: [],
  isLoading: false,
  error: '',
  refreshItems: (newItems) => set({items: newItems}),
  setIsLoading: (loading) => set({ isLoading: loading}),
  setError: (text) => set({error: text}),
}))