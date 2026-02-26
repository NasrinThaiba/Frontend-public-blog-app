import { useEffect, useState } from "react";
import "../style/CommentSection.css"

function CommentSection({ postId }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  const token = localStorage.getItem("token");

  const fetchComments = () => {
    fetch(`https://backend-blog-app-hq13.onrender.com/api/comments/post/${postId}`)
      .then(res => res.json())
      .then(data => setComments(data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!comment.trim()) return;

    const res = await fetch(`https://backend-blog-app-hq13.onrender.com/api/comments/${postId}`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ comment }) // this send that comment to backend
      }
    );

    if (res.ok) {
      setComment(""); // clear input
      fetchComments(); //refreshes the list of comments to show the new one
    } else {
      alert("Login required to comment");
    }
  };

  return (
    <div className="comment-section">
      <h3>Comments</h3>

      {comments.map((comment) => (
        <div key={comment._id} className="comment-box">
          
          <div className="comment-header">
            <strong>{comment.user?.username}</strong>

            <span className="comment-time">
              {new Date(comment.createdAt).toLocaleString("en-IN", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </span>
          </div>
                
        <p className="comment-content">{comment.comment}</p>

  </div>
))}
      
      <form onSubmit={handleSubmit}>
        <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Write a comment..." />
        <button type="submit">Add Comment</button>
      </form>
    </div>
  );
}

export default CommentSection;