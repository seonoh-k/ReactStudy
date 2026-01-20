import { create } from "zustand";

// 도서 정보 객체 타입 지정
export type BookInfo = {
  id: number,
  title: string,
  author: string,
  publishYear: number,
  description: string,
}

// 도서 리스트 배열과 도서 상세 조회 함수 타입 지정
export type Books = {
  books: BookInfo[],
  // 조회 함수이기 때문에 반환 타입 지정
  getDetail: (id: number) => BookInfo | undefined;
}

// 도서 리스트
const books = [
    {id: 1,  title: '코딩 자율학습 HTML+CSS+자바스크립트', author: '김기수', publishYear: 2022, description: '기초부터 반응형 웹까지 초보자를 위한 웹 개발 입문서'},
    {id: 2, title: '코딩 자율학습 나도코딩의 C언어 입문', author: '나도코딩', publishYear: 2022, description: 'C 언어의 완공을 돕는 프로그래밍 자습서'},
    {id: 3, title: '코딩 자율학습 나도코딩의 파이썬 입문', author: '나도코딩', publishYear: 2023, description: '초보자의 눈높이에 맞춘 친절한 프로그래밍 자습서'},
    {id: 4, title: '코딩 자율학습 스프링 부트3 자바 백엔드 개발 입문', author: '홍팍', publishYear: 2023, description: '만들면서 배우는 친절한 백엔드 개발 입문서'},
    {id: 5, title: '코딩 자율학습 제로초의 자바스크립트 입문', author: '조현영', publishYear: 2024, description: '12가지 프로그램을 만들면서 배우는 자바스크립트 자습서'},
    {id: 6, title: '코딩 자율학습 Vue.js 프런틑엔드 개발 입문', author: '김기수', publishYear: 2024, description: '기초부터 실무 프로젝트까지 만들면서 배우는 프런트엔드 개발 자습서'},
    {id: 7, title: '코딩 자율학습 리눅스 입문 with 우분투', author: '런잇', publishYear: 2024, description: '입문자를 위한 가장 쉬운 리눅스 입문서'},
    {id: 8, title: '코딩 자율학습 자바 입문', author: '최원효', publishYear: 2024, description: '입문자의 눈높이에 맞춰 문법과 개념을 설명하는 자바 입문서'},
    {id: 9, title: '코딩 자율학습 SQL 데이터베이스 입문', author: '홍팍', publishYear: 2025, description: '기초부터 활용까지 입문자를 SQL 자습서'},
    {id: 10, title: '코딩 자율학습 잔재미코딩의 파이썬 데이터 분석 입문', author: 'Dave Lee', publishYear: 2025, description: 'Pandas, Plotly 사용부터 생성형 AI 활용법까지 한 권으로 배우는 데이터 분석 입문'},
    {id: 11, title: '코딩 다율학습 컴퓨터 구조와 운영체제', author: '기술노트 알렉', publishYear: 2025, description: '이해하기 쉽게 체계적으로 정리한 CS 자습서'},
  ]

// 상태 변경은 없으므로 사용하지 않기 때문에 _set
export const useBookStore = create<Books>((_set, get) => ({
  // 도서 리스트 초기값 설정
  books: books,
  // 도서 상세 조회 함수 설정
  getDetail: (id) => {
    const state = get();
    return state.books.find(book => book.id === id);
  }
}))