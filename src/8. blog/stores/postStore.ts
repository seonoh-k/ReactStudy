import { create } from "zustand";

// 게시글 타입 지정
export type Post = {
  id: number,
  title: string,
  category: string, 
  username: string,
  author: string,
  thumbnail: string,
  desc: string,
  regdate: Date,
}

// 게시글 스토어 타입 지정
export type PostStore = {
  // 게시글 목록
  posts: Post[],
  // 게시글 상세 조회
  postDetail: Post | null,
  // 검색용 쿼리 상태
  query: string,
  // 로딩 상태
  isLoading: boolean,
  // 에러 상태
  error: string,
  setIsLoading: (loading: boolean) => void,
  setError: (errorText: string) => void,
  setPosts: (blogPosts: Post[]) => void,
  setPostDetail: (post: Post | null) => void,
  setQuery: (text: string) => void,
}

export const usePostStore = create<PostStore>((set) => ({
  posts: [],
  postDetail: null,
  query: "",
  isLoading: false,
  error: "",
  setIsLoading: (loading) => set({ isLoading: loading }),
  setError: (errorText) => set({ error: errorText }),
  setPosts: (blogPosts) => set({posts: blogPosts}),
  setPostDetail: (post) => set({postDetail: post}),
  setQuery: (text) => set({ query: text }),
}))