import { useEffect } from "react";
import { axiosInterface } from "./axiosInterface";
import { usePostStore } from "../stores/postStore";
import { useNavigate } from "react-router";

export function useFetchPosts(query: string) {
  const setIsLoading = usePostStore((state) => state.setIsLoading);
  const setError = usePostStore((state) => state.setError);
  const setPosts = usePostStore((state) => state.setPosts);

  useEffect(() => {
    setIsLoading(true);
    const controller = new AbortController();
    const signal = controller.signal;
    const fetchData = async () => {
      try {
        if(!query) {
          const { data } = await axiosInterface.get("/posts", { signal });
          setPosts(data);
        }else {
          const { data } = await axiosInterface.get(`/posts/search?title=${query}`, { signal });
          setPosts(data);
        }
        setIsLoading(false)
      }catch (e) {
        if (e instanceof Error && e.name !== 'CanceledError') {
          setError(e.message || '알 수 없는 오류가 발생했습니다.');
          setIsLoading(false);
        }
      }
    }
    fetchData();
    return () => { controller.abort(); };
  }, [ query, setIsLoading, setError, setPosts ])
}

export function useGetPost(id: string) {
  const setIsLoading = usePostStore((state) => state.setIsLoading);
  const setError = usePostStore((state) => state.setError);
  const setPostDetail = usePostStore((state) => state.setPostDetail);

  useEffect(() => {
    setIsLoading(true);
    const controller = new AbortController();
    const signal = controller.signal;
    const fetchData = async () => {
      try {
        const { data } = await axiosInterface.get(`/posts/${id}`, { signal });
        setPostDetail(data);
        setIsLoading(false)
      }catch (e) {
        if (e instanceof Error && e.name !== 'CanceledError') {
          setError(e.message || '알 수 없는 오류가 발생했습니다.');
          setIsLoading(false);
        }
      }
    }
    fetchData();
    return () => { controller.abort(); };
  }, [ id, setIsLoading, setError, setPostDetail ])
}

export function useGetRecommandationPost(id: string) {
  const setIsLoading = usePostStore((state) => state.setIsLoading);
  const setError = usePostStore((state) => state.setError);
  const setPosts = usePostStore((state) => state.setPosts);

  useEffect(() => {
    setIsLoading(true);
    const controller = new AbortController();
    const signal = controller.signal;
    const fetchData = async () => {
      try {
        const { data } = await axiosInterface.get(`/posts/${id}/related`, { signal });
        setPosts(data);
        setIsLoading(false)
      }catch (e) {
        if (e instanceof Error && e.name !== 'CanceledError') {
          setError(e.message || '알 수 없는 오류가 발생했습니다.');
          setIsLoading(false);
        }
      }
    }
    fetchData();
    return () => { controller.abort(); };
  }, [ id, setIsLoading, setError, setPosts ])
}

export function usePostActions() {
  const setIsLoading = usePostStore((state) => state.setIsLoading);
  const setError = usePostStore((state) => state.setError);

  const navigate = useNavigate();

  function createPost(title: string, category: string, username: string, thumbnail: string, desc: string) {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const { status } = await axiosInterface.post("/posts", { title, category, username, thumbnail, desc});
        if(status === 201) {
          setIsLoading(false);
          navigate("/");
        }
      }catch (e) {
        if (e instanceof Error && e.name !== 'CanceledError') {
          setError(e.message || '알 수 없는 오류가 발생했습니다.');
          setIsLoading(false);
        }
      }
    };
    fetchData();
  }

  function deletePost(id: string) {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const { status } = await axiosInterface.delete(`/posts/${id}`);
        if(status == 204) {
          alert("삭제되었습니다.");
          setIsLoading(false);
          navigate("/");
        }else {
          throw new Error("삭제에 실패했습니다.");
        }
      }catch (e) {
        if (e instanceof Error && e.name !== 'CanceledError') {
          setError(e.message || '알 수 없는 오류가 발생했습니다.');
          setIsLoading(false);
        }
      }
    };
    fetchData();
  }

  return { createPost, deletePost }
}