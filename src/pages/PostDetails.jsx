import { useEffect, useState } from "react";
import { useParams, useNavigate  } from "react-router-dom";
import CommentSection from "../components/CommentSection";
import "../style/PostDetails.css"

function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/api/posts/${id}`)
      .then(res => res.json())
      .then(data => setPost(data))
      .catch(err => console.log(err));
  }, [id]);

  if (!post) return <p>Loading...</p>;

  return (
    <div className="post-details">
      <div className="post-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>{post.title}</h2>
        <button className="button" onClick={() => navigate("/")}>
           Home
        </button>
      </div>

      <p className="post-meta">{post.content}</p>
      <p><strong>Author:</strong> {post.author?.username}</p>

      <p className="time">
        <strong>Posted on:</strong>{" "}
        {post.createdAt &&
        new Date(post.createdAt).toLocaleString("en-IN", {
          dateStyle: "medium",
          timeStyle: "short",
        })}
      </p>

      <hr />

      <CommentSection postId={id} />
    </div>
  );
}

export default PostDetails;