import axios from "axios";

// Axios Interface
export const axiosInterface = axios.create({
  // 공통 URL 지정
  baseURL: 'http://localhost:3000',
});