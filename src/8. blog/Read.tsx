import ReadArea from "./components/ReadArea"
import RecommendationArea from "./components/RecommandationArea"

export default function Read() {
  return (
    <main className="page__main">
      {/* ReadArea */}
        <ReadArea />      
      {/* RecommendationArea */}
        <RecommendationArea />
    </main>
  )
}