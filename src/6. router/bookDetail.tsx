import { useBookStore } from "./bookStore";
import { Link, useParams } from "react-router";

export default function BookDetail() {
  // useParams()는 객체를 반환
  const { id } = useParams();
  const bookId = Number(id);
  // 도서 상세 정보 받아오기
  const book = useBookStore((state) => state.getDetail(bookId));

  return (
    <>
    {book == undefined
    ? <h2>도서의 상세 정보가 없습니다.</h2>
    : <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>TITLE</th>
            <th>AUTHOR</th>
            <th>PUBLISH YEAR</th>
            <th>DESCRIPTION</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{book.id}</td>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>{book.publishYear}</td>
            <td>{book.description}</td>
          </tr>
        </tbody>
      </table>
    }
    {/* 도서 리스트로 */}
    <Link to='/books'>List</Link>
    </>
  )
}