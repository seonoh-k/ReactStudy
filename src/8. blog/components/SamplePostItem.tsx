import { NavLink } from "react-router";
import { dummyImage1, dummyImage2 } from "../../assets/images/images";

export default function  SamplePostItem() {
  return (
    <>
    <article className="posts-area__post">
      <NavLink to="/" className="posts-area__post-link">
        <img
          src={dummyImage1}
          alt="dummy-image-1"
          className="posts-area__post-image"
        />
        <em className="posts-area__post-tag">Sample</em>
        <h2 className="posts-area__post-title">
          My Travel Stories from the Past Year
        </h2>
        <p className="posts-area__post-meta">
          George Costanazv • Aug 16, 2025
        </p>
        <p className="posts-area__post-excerpt">
          Over the past year, I had the opportunity to explore new places
          and immerse myself in different cultures. From the vibrant
          streets of Europe to the serene beaches of Asia, each journey
          taught me something unique. The experience of stepping out of my
          comfort zone helped me grow as a person, providing new
          perspectives on life. Traveling also allowed me to reconnect
          with myself, as I embraced moments of solitude while navigating
          unfamiliar environments.
        </p>
      </NavLink>
    </article>
    <article className="posts-area__post">
      <NavLink to="#" className="posts-area__post-link">
        <img
          src={dummyImage2}
          alt="dummy-image-2"
          className="posts-area__post-image"
        />
        <em className="posts-area__post-tag">Sample</em>
        <h2 className="posts-area__post-title">
          Delicious Chicken Dishes & Tips
        </h2>
        <p className="posts-area__post-meta">
          George Costanazv • Aug 16, 2025
        </p>
        <p className="posts-area__post-excerpt">
          Chicken is one of the most versatile and beloved foods around
          the world. Whether it’s roasted, fried, grilled, or baked,
          chicken has a unique way of fitting into every culture and
          cuisine. In this post, we’ll explore everything you need to know
          about chicken, including delicious recipes, helpful cooking
          tips, and some fun facts you might not know!
        </p>
      </NavLink>
    </article>
    <article className="posts-area__post">
      <NavLink to="#" className="posts-area__post-link">
        <img
          src={dummyImage1}
          alt="dummy-image-1"
          className="posts-area__post-image"
        />
        <em className="posts-area__post-tag">Sample</em>
        <h2 className="posts-area__post-title">
          My Travel Stories from the Past Year
        </h2>
        <p className="posts-area__post-meta">
          George Costanazv • Aug 16, 2025
        </p>
        <p className="posts-area__post-excerpt">
          Over the past year, I had the opportunity to explore new places
          and immerse myself in different cultures. From the vibrant
          streets of Europe to the serene beaches of Asia, each journey
          taught me something unique. The experience of stepping out of my
          comfort zone helped me grow as a person, providing new
          perspectives on life. Traveling also allowed me to reconnect
          with myself, as I embraced moments of solitude while navigating
          unfamiliar environments.
        </p>
      </NavLink>
    </article>
    <article className="posts-area__post">
      <NavLink to="#" className="posts-area__post-link">
        <img
          src={dummyImage2}
          alt="dummy-image-2"
          className="posts-area__post-image"
        />
        <em className="posts-area__post-tag">Sample</em>
        <h2 className="posts-area__post-title">
          Delicious Chicken Dishes & Tips
        </h2>
        <p className="posts-area__post-meta">
          George Costanazv • Aug 16, 2025
        </p>
        <p className="posts-area__post-excerpt">
          Chicken is one of the most versatile and beloved foods around
          the world. Whether it’s roasted, fried, grilled, or baked,
          chicken has a unique way of fitting into every culture and
          cuisine. In this post, we’ll explore everything you need to know
          about chicken, including delicious recipes, helpful cooking
          tips, and some fun facts you might not know!
        </p>
      </NavLink>
    </article>
    </>
  )
}