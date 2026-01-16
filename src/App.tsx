// import ButtonApp from './1/ButtonApp.tsx';
// import Calculator from "./2. calculator/calculator"
// import TodoList from "./3. todoList/todoList"
// import Login from "./4. sideEffect/login"
// import TodoList from "./5. ContextAPI/todoList"
// import TodoProvider from "./5. ContextAPI/TodoProvider"
import { Navigate, Routes, Route } from "react-router"
import BookList from "./6. router/bookList"
import BookDetail from "./6. router/bookDetail"
import NotFound from "./6. router/notFound"

export default function App() {
  return (
    <>
      {/* <ButtonApp /> */}
      {/* <Calculator /> */}
      {/* <TodoList /> */}
      {/* <Login /> */}
      {/* <TodoProvider>
        <TodoList />
      </TodoProvider> */}
      <Routes>
        {/* Navigate to="이동 경로" replace => 이동 기록을 히스토리에 남길지 여부 */}
        <Route path="/" element={<Navigate to="/books" replace />} />
        <Route path="/books" element={<BookList />} />
        <Route path="/books/:id" element={<BookDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}
