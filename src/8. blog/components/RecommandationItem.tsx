import { NavLink } from "react-router";
import type { Post } from "../stores/postStore";
import { format } from "date-fns";

export default function RecommendationItem(post: Post) {
  return (
    <li>
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
    </li>
  )
}