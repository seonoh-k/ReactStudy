import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router'
import './css/blogIndex.css'
import { useAuthStore } from './8. blog/stores/authStore.ts'
import { axiosInterface } from './8. blog/api/axiosInterface.ts'
import { ErrorBoundary } from 'react-error-boundary'

// 액세스 토큰 재발급
// 쿠키에 저장된 리프레시 토큰이 자동으로 요청에 포함
const refreshUser = async () => {
  console.log("refresh");
  try {
    // 서버에서 리프레시 토큰 유효성 검사
    const { data, status } = await axiosInterface.post("/token");
    if (status === 200) {
      // 유효성 검사 통과 후 새 액세스 토큰 발급 -> 인증 정보 저장
      useAuthStore.setState({user: data.user, accessToken: data.accessToken});
    }else {
      // 리프레시 토큰 만료 또는 유효하지 않은 경우 에러 처리
      throw new Error("Failed to Refresh User");
    }
  } catch {
    // 인증이 유지되지 않도록 인증 정보를 초기화
    useAuthStore.setState({user: null, accessToken: null})
;  }
}

// 세션 스토리지 읽기
// 새로고침할 경우 세션 스토리지에서 저장된 auth-storage 불러옴. JSON.parse를 사용해 객체로 변환
const storage = JSON.parse(sessionStorage.getItem("auth-storage") || "{}");

// 사용자 정보 확인 및 토큰 재발급 요청
// 불러온 객체에 user 값이 있다면 로그인 상태로 판단하고 refreshUser() 호출
if (storage?.state?.user) {
  refreshUser();
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary fallback={<p>Somthing went wrong!</p>}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
)
