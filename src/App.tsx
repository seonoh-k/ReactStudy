// import ButtonApp from './1/ButtonApp.tsx';
// import Calculator from "./2. calculator/calculator"
// import TodoList from "./3. todoList/todoList"
// import Login from "./4. sideEffect/login"
import TodoList from "./5. ContextAPI/todoList"
import TodoProvider from "./5. ContextAPI/TodoProvider"

export default function App() {
  return (
    <>
      {/* <ButtonApp /> */}
      {/* <Calculator /> */}
      {/* <TodoList /> */}
      {/* <Login /> */}
      <TodoProvider>
        <TodoList />
      </TodoProvider>
    </>
  )
}
