import axios from "axios";
import { useAuthStore } from "../stores/authStore";

// withCredentials : 토큰 포함 여부
export const axiosInterface = axios.create({
  baseURL: '/api',
  withCredentials: true,
})

// 요청을 보내기 직전에 실행되는 함수
// 모든 API 요청에 토큰이 자동으로 포함됨
axiosInterface.interceptors.request.use((config) => {
  // 전역 상태에서 액세스 토큰 가져오기
  const accessToken = useAuthStore.getState().accessToken;
  if(accessToken) {
    // 요청의 headers.Authorization에 'Bearer {토큰_값}' 형태로 Authorization 헤더를 추가
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  return config;
})