import { useEffect } from "react";
import { axiosInterface } from "./axiosInstance";
import { useItemStore } from "./itemStore";

// Axios 커스텀 훅
// 조회
export function useFetchItems(url: string) {
  const setIsLoading = useItemStore((state) => state.setIsLoading);
  const setError = useItemStore((state) => state.setError);
  const refreshItems = useItemStore((state) => state.refreshItems);

  useEffect(() => {
    setIsLoading(true);
    const controller = new AbortController();
    const signal = controller.signal;
    const fetchData = async () => {
      try {
        const { data } = await axiosInterface.get(url, { signal });
        // 서버에서 반환 받은 최신 상태로 새로고침
        refreshItems(data);
        setIsLoading(false);
      } catch (e) {
        if (e instanceof Error && e.name !== 'CanceledError') {
          setError(e.message || '알 수 없는 오류가 발생했습니다.');
          setIsLoading(false);
        }
      }
    };
    fetchData();
    // 클린업 함수로 요청 자동 취소
    return () => { controller.abort(); };
  }, [url, setIsLoading, setError, refreshItems]);
}

// CRUD
export function useItemActions(url: string) {
  const setIsLoading = useItemStore((state) => state.setIsLoading);
  const setError = useItemStore((state) => state.setError);
  const refreshItems = useItemStore((state) => state.refreshItems);

  // 아이템 추가
  function addItem(text: string) {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const { data } = await axiosInterface.post(url, { text: text });
        refreshItems(data);
        setIsLoading(false);
      } catch (e) {
        if (e instanceof Error && e.name !== 'CanceledError') {
          setError(e.message || '알 수 없는 오류가 발생했습니다.');
          setIsLoading(false);
        }
      }
    }
    fetchData();
  }

  // 할 일 완료/미완료 토글
  function onToggle() {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const { data } = await axiosInterface.patch(url);
        refreshItems(data);
        setIsLoading(false);
      } catch (e) {
        if (e instanceof Error && e.name !== 'CanceledError') {
          setError(e.message || '알 수 없는 오류가 발생했습니다.');
          setIsLoading(false);
        }
      }
    }
    fetchData();
  }

  // 할 일 수정
  function onEdit(text: string) {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const { data } = await axiosInterface.put(url, { text: text });
        refreshItems(data);
        setIsLoading(false);
      } catch (e) {
        if (e instanceof Error && e.name !== 'CanceledError') {
          setError(e.message || '알 수 없는 오류가 발생했습니다.');
          setIsLoading(false);
        }
      }
    }
    fetchData();
  }

  // 할 일 삭제
  function onDelete() {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const { data } = await axiosInterface.delete(url);
        refreshItems(data);
        setIsLoading(false);
      } catch (e) {
        if (e instanceof Error && e.name !== 'CanceledError') {
          setError(e.message || '알 수 없는 오류가 발생했습니다.');
          setIsLoading(false);
        }
      }
    }
    fetchData();
  }

  return { addItem, onToggle, onEdit, onDelete }
}