import PostArea from "./components/PostArea"
import SearchArea from "./components/SearchArea"

export default function Home() {
  return (
    <main className="page__main">
      <SearchArea />
      <PostArea />
    </main>
  )
}