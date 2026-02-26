import { Link } from "react-router-dom";
import "../style/PostCard.css"

function PostCard({ post }) {
  return (
    <div className="post-card">

      <h2>{post.title}</h2>

      <p className="content">{post.content.substring(0, 100)}...</p> 
      {/* //how to show the post content */}

      <p><strong>Author :</strong> {post.author?.username}</p>

      <p className="time"><strong>Posted on :</strong> {new Date(post.createdAt).toLocaleString()}</p>

      <Link to={`/post/${post._id}`}>Read More</Link>
      
    </div>
  );
}

export default PostCard;