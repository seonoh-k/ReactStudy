import { NavLink } from "react-router"
import { useAuthStore } from "../stores/authStore"
import { axiosInterface } from "../api/axiosInterface"
import axios from "axios"

export default function Header() {
  const user = useAuthStore((state) => state.user);
  const unsetAuth = useAuthStore((state) => state.unsetAuth);

  // 로그아웃
  const handleLogout = async () => {
    try {
      const { status } = await axiosInterface.post("/logout");
      if (status === 200) {
        // 로그아웃 성공 시 인증 정보 초기화
        unsetAuth();
      } else {
        throw new Error("로그아웃에 실패했습니다.");
      }
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
    <header className="page__header">
      <h1 className="page__logo">
        <NavLink to="/" className="page__logo-link">SU</NavLink>
      </h1>
      <nav className="page__navigation">
        <ul className="page__nav-list">
          <li className="page__nav-item">
            <NavLink to="/write" className="page__nav-link">글쓰기</NavLink>
          </li>
          <li className="page__nav-item">
            { !user ?
              <NavLink to="/auth" className="page__nav-link">인증</NavLink>
            : <button className="page__nav-link" onClick={handleLogout}>로그아웃</button>
            }
          </li>
        </ul>
      </nav>
    </header>
  )
}