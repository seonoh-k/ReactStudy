import RecommendationItem from "./RecommandationItem"
import { usePostStore } from "../stores/postStore"
import { useParams } from "react-router";
import { useGetRecommandationPost } from "../api/usePostAxios";

export default function RecommendationArea() {
  const posts = usePostStore((state) => state.posts);
  const { id } = useParams();
  useGetRecommandationPost(String(id));
  
  return (
    <article className="page__recommend">
        <h3 className="page__recommend-title">Recommend Reading</h3>
        <ul className="page__recommend-lists">
          {posts && posts.map(post => <RecommendationItem key={post.id} {...post} />)}
        </ul>
    </article>
  )
}