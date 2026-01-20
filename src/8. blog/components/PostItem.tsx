import { NavLink } from "react-router";
import { format } from "date-fns";
import type { Post } from "../stores/postStore";

export default function  PostItem(post: Post) {
  return (
    <article className="posts-area__post">
      <NavLink to={`/read/${post.id}`} className="posts-area__post-link">
        <img
          src={post.thumbnail}
          alt="dummy-image-1"
          className="posts-area__post-image"
        />
        <em className="posts-area__post-tag">{post.category}</em>
        <h2 className="posts-area__post-title">
          {post.title}
        </h2>
        <p className="posts-area__post-meta">
          {post.username} • {format(post.regdate, 'MMM dd, yyyy')}
        </p>
        <p className="posts-area__post-excerpt">
          {post.desc}
        </p>
      </NavLink>
    </article>
  )
}