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

// 액세스 토큰 만료 시 재발급
// 무한 루프 방지 변수
let retry = false;
axiosInterface.interceptors.response.use(
  // 요청이 성공하면 응답을 그대로 반환 / 실패하면 비동기 처리
  (response) => response, async (err) => {
    const originalRequest = err.config;
    // 응답 코드가 403이고 아직 재시도 하지 않았다면 토큰 재발급 시도
    if(err.respone?.status === 403 && !retry) {
      retry = true;
      try {
        // 토큰 재발급 시도
        const { data, status } = await axiosInterface.post("/token");
        // 응답 코드가 200인 경우에만 성공으로 판단, 전역 상태에 새 인증 정보 저장
        if(status == 200) {
          useAuthStore.setState({ user: data.user, accessToken: data.accessToken });
          retry = false;
          // 실패 했던 원래 요청에 새 토큰 적용하고 원래 요청 실행
          originalRequest.headers[ 'Authorization' ] = `Bearer ${data.accessToken}`;
          return axiosInterface(originalRequest);
        }else {
          throw new Error("토큰 업데이트 실패");
        }
      }catch {
        // 리프레시 토큰까지 만료되었거나, 서버 오류 발생 시 인증 정보 초기화 
        useAuthStore.setState({ user:null, accessToken: null });
      }
    }
    return Promise.reject(err);
  }
);
