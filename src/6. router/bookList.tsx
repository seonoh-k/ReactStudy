import { useBookStore } from "./bookStore";
import { Link } from "react-router";

export default function BookList() {
  // 도서 리스트 받아오기
  const books = useBookStore((state) => state.books);

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>TITLE</th>
        </tr>
      </thead>
      <tbody>
        {/* 도서 리스트 반복 렌더링 */}
        {books.map((book) => 
          <tr key={book.id}>
            <td>{book.id}</td>
            <td><Link to={`/books/${book.id}`}>{book.title}</Link></td>
          </tr>
        )}
      </tbody>
    </table>
  )
}