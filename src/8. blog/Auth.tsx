import { useState } from "react"
import axios from "axios"
import { axiosInterface } from "./api/axiosInterface"
import { useAuthStore } from "./stores/authStore"
import { useNavigate } from "react-router"

export default function Auth() {
  // 로그인/회원가입 토글 상태
  const [ pageType, setPageType ] = useState<string>("login");
  const [ email, setEmail ] = useState<string>("");
  const [ password, setPassword ] = useState<string>("");
  const [ passwordConfirm, setPasswordConfirm ] = useState<string>("");
  const [ username, setUsername ] = useState<string>("");
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  // 로그인/회원가입 토글
  const handlePage = (type: string) => {
    setEmail("");
    setPassword("");
    setPasswordConfirm("");
    setUsername("");
    setPageType(type);
  }

  // 회원가입
  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      // 폼 유효성 검사
      if (email === '' || password === '' || username === '') {
        alert("모든 항목을 입력해주세요.");
        return;
      }
      
      if (password !== passwordConfirm) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
      }

      // 이메일, 비밀번호, 유저네임을 페이로드에 담아 요청
      const { data } = await axiosInterface.post("/register", {
        email, password, username
      });

      // 회원가입 성공 후 폼 상태 초기화
      if (data) {
        alert("회원가입이 완료되었습니다. 로그인 후 이용해주세요.");
        setEmail("");
        setPassword("");
        setPasswordConfirm("");
        setUsername("");
        setPageType("login");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const msg = error.response?.data?.message ?? error.message;
        alert(msg);
      }else if (error instanceof Error) {
        alert(error.message);
      }else {
        alert("알 수 없는 오류가 발생했습니다.");
      }
    }
  } 

  // 로그인
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // 이메일, 비밀번호를 페이로드에 담아 요청
      const { data } = await axiosInterface.post("/login", {
        email, password
      });
      // 인증 정보 저장
      setAuth(data.user, data.accessToken);
      // 메인 화면으로
      navigate("/");
    }catch (error) {
      if (axios.isAxiosError(error)) {
        const msg = error.response?.data?.message ?? error.message;
        alert(msg);
      }else if (error instanceof Error) {
        alert(error.message);
      }else {
        alert("알 수 없는 오류가 발생했습니다.");
      }
    }
  }

  return (
    <main className="page__main">
      <article className="page-auth">
        <section className="page-auth__container">
          <nav className="page-auth__toggle">
            <button
              id="login-tab"
              className="page-auth__toggle-button page-auth__toggle-button--active"
              onClick={() => handlePage("login")}
            >
              로그인
            </button>
            <button id="signup-tab" className="page-auth__toggle-button"
              onClick={() => handlePage("register")}
            >
              회원가입
            </button>
          </nav>

          <div className="page-auth__form-section">
            <form className={`auth-form ${pageType === "login" && "auth-form--active"}`} 
              id="login-form" onSubmit={handleLogin}>
              <label htmlFor="login-email" className="a11y-hidden">이메일</label>
              <input
                type="email"
                id="login-email"
                className="auth-form__input"
                placeholder="이메일"
                value={email} onChange={(e) => setEmail(e.target.value)}
                required
              />

              <label htmlFor="login-password" className="a11y-hidden">비밀번호</label>
              <input
                type="password"
                id="login-password"
                className="auth-form__input"
                placeholder="비밀번호"
                value={password} onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button type="submit" className="auth-form__submit">로그인</button>
            </form>

            <form className={`auth-form ${pageType === "register" && "auth-form--active"}`} 
              id="signup-form" onSubmit={handleSignup}>
              <label htmlFor="signup-email" className="a11y-hidden">이메일</label>
              <input
                type="email"
                id="signup-email"
                className="auth-form__input"
                placeholder="이메일"
                value={email} onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label htmlFor="signup-name" className="a11y-hidden">이름</label>
              <input
                type="text"
                id="signup-name"
                className="auth-form__input"
                placeholder="이름"
                value={username} onChange={(e) => setUsername(e.target.value)}
                required
              />
              <label htmlFor="signup-password" className="a11y-hidden">
                비밀번호
              </label>
              <input
                type="password"
                id="signup-password"
                className="auth-form__input"
                placeholder="비밀번호"
                value={password} onChange={(e) => setPassword(e.target.value)}
                required
              />

              <label htmlFor="signup-confirm-password" className="a11y-hidden">
                비밀번호 확인
              </label>
              <input
                type="password"
                id="signup-confirm-password"
                className="auth-form__input"
                placeholder="비밀번호 확인"
                value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)}
                required
              />

              <button type="submit" className="auth-form__submit">
                회원가입
              </button>
            </form>
          </div>
        </section>
      </article>
    </main>
  )
}