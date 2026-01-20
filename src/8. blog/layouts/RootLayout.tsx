import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router";

// 공통 레이아웃 컴포넌트
export default function RootLayout() {
  return ( 
    <div className="page">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}