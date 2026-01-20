import { useState } from "react";
import { usePostActions } from "./api/usePostAxios"

export default function Wrtie() {
  // 서버로 전달할 폼 데이터 상태
  const [ title, setTitle ] = useState<string>("");
  const [ category, setCategory ] = useState<string>("");
  const [ username, setUsername ] = useState<string>("");
  const [ thumbnail, setThumbnail ] = useState<string | null>(null);
  const [ desc, setDesc ] = useState<string>("");

  // 게시글 추가 함수
  const { createPost } = usePostActions();

  const encodeFileToBase64 = (image: File) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = (event) => {
        const target = event.target as FileReader | null;
        if(target && target.result) {
          resolve(target.result);
        }else {
          reject(new Error("File Reading Failed"));
        }
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handelFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = (e.target.files && e.target.files[0]) || null;
    if(!file) return;
    const convertedFile = await encodeFileToBase64(file);
    setThumbnail(convertedFile as string);
  }

  // const { title, category, thumbnail, desc, username } = req.body;
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title || !category || !username || !thumbnail || !desc) {
      alert("입력값이 누락되었습니다.");
      return;
    }
    createPost(title, category, username, thumbnail, desc);
  }

  return (
    <main className="page__main">
      <div className="page__write">
        <h2 className="page__write-text">새로운 글 작성</h2>
        <form onSubmit={handleSubmit}>
          <div className="page__write-form">
            <div className="page__write-group">
              <label htmlFor="title" className="page__write-label">제목</label>
              <input
                type="text"
                name="title"
                id="title"
                className="page__write-input"
                placeholder="Type product name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="category" className="page__write-label">카테고리</label>
              <select id="category" className="page__write-select" value={category}
              onChange={(e) => setCategory(e.target.value)} required>
                <option value="">Select category</option>
                <option value="Travel">Travel</option>
                <option value="Food">Food</option>
                <option value="Life">Life</option>
              </select>
            </div>
            <div>
              <label htmlFor="writer" className="page__write-label">작성자</label>
              <input
                type="text"
                name="writer"
                id="writer"
                className="page__write-input"
                placeholder="Type product name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="page__write-group">
              <div>
                <label htmlFor="item-weight" className="page__write-label">썸네일</label>
                <label className="page__write-file--hidden" htmlFor="user_avatar">Upload file</label>
                <input
                  className="page__write-file"
                  aria-describedby="user_avatar_help"
                  id="user_avatar"
                  type="file"
                  accept="image/*"
                  onChange={handelFileChange}
                  required
                />
              </div>
            </div>
            <div className="page__write-group">
              <label htmlFor="description" className="page__write-label">내용</label>
              <textarea
                id="description"
                className="page__write-textarea"
                placeholder="Your description here"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                required
              ></textarea>
            </div>
          </div>
          <button type="submit" className="page--btn">글등록</button>
        </form>
      </div>
    </main>
  )
}