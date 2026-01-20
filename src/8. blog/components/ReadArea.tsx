import { format } from "date-fns"
import { usePostStore } from "../stores/postStore"
import { useGetPost, usePostActions } from "../api/usePostAxios"
import { useParams } from "react-router"
import { useAuthStore } from "../stores/authStore"

export default function ReadArea() {
  const post = usePostStore((state) => state.postDetail);
  const { id } = useParams();
  useGetPost(String(id));
  
  const { deletePost } = usePostActions();
  const user = useAuthStore((state) => state.user);

  if(!post) return null;

  return (
    <article className="page__read">
      <section>
        <strong className="page__read-tag">{post.category}</strong>
        <h2 className="page__read-title">
          {post.title}
        </h2>
        <div className="page__read-meta-group">
          <p className="page__read-profile">{post.username} • {format(post.regdate, 'MMM dd, yyyy')}</p>
          {user?.email === post.author && 
          <button className="page__read-btn" onClick={() => deletePost(String(id))}>삭제</button>}
        </div>
        <img
          src={post.thumbnail}
          alt=""
          className="page__read-image"
        />
      </section>
      <section className="page__read-desc">
        <p>{post.desc}</p>
      </section>
    </article>
  )
}