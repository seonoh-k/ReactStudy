import { create } from "zustand";

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

export type PostStore = {
  posts: Post[],
  postDetail: Post | null,
  query: string,
  isLoading: boolean,
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