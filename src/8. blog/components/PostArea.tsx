import PostItem from "./PostItem";
import { usePostStore } from "../stores/postStore";
import { useFetchPosts } from "../api/usePostAxios";

export default function PostArea() {
  const posts = usePostStore((state) => state.posts);
  const isLoading = usePostStore((state) => state.isLoading);
  const error = usePostStore((state) => state.error);
  const query = usePostStore((state) => state.query);
  
  // 전체 조회 + 검색
  useFetchPosts(query);

  if(isLoading) return <h1>Loading ...</h1>
  if(error !== "") return <h1>Error: {error}</h1>

  return (
    <section className="posts-area">
      {posts && posts.map(post => <PostItem key={post.id} {...post} />)}
    </section>
  )
}