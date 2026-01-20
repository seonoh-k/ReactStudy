import { useRef } from "react";
import { search } from "../../assets/images/images";
import { usePostStore } from "../stores/postStore";

export default function SearchArea() {
  const setQuery = usePostStore((state) => state.setQuery);
  const ref = useRef<HTMLInputElement>(null);
  
  function searchPost() {
    if(!ref.current) return;
    const text = ref.current?.value;
    setQuery(text);
  }

  // input 태그에서 엔터 입력시 아이템 추가
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Enter 키를 눌렀고 지금 문자를 조합 중이 아니라면 addItem 실행 
    // (한국어, 일본어, 중국어 등 문자 조합이 필요한 입력에 사용)
    if(e.key == 'Enter' && !e.nativeEvent.isComposing) {
      e.preventDefault();
      searchPost();
    }
  };

  return (
    <section className="search-area">
      <article className="search-area__search">
        <h2 className="search-area__title">The Sucoding Blog</h2>
        <p className="search-area__description">
          A Blog About Food, Experience, and Recipes.
        </p>
        <form method="get" className="search-area__form" onSubmit={(e) => e.preventDefault}>
          <input
            type="text"
            name="q"
            placeholder="Search"
            className="search-area__input"
            autoComplete="off"
            onKeyDown={handleKeyDown}
            ref={ref}
          />
          <button type="button" className="search-area__submit" onClick={searchPost}>
            <img
              src={search}
              alt="search-icon"
              className="search-area__icon"
            />
          </button>
        </form>
      </article>
    </section>
  )
}