import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import "../style/Home.css"

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("https://backend-blog-app-hq13.onrender.com/api/posts")
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(err => console.log(err));
  }, []);

  return (
  <div className="home-container">
    <h2 className="home-heading">All Blog Posts</h2>

    {posts.length === 0 && (
      <p className="no-posts"> No posts available </p>
    )}

    {posts.map(post => (
      <PostCard key={post._id} post={post} />
    ))}
  </div>
);
}

export default Home;