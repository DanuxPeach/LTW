import React, { useCallback, useState , useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Video.css";
import Header from "../../components/header/Header";

const Stream = () => {
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState(0);
  const commentInputRef = useRef(null);


  const handleComment = useCallback((event) => {
    event.preventDefault();
    const newComment = event.target.comment.value;
    setComments((prevComments) => [...prevComments, newComment]);
    event.target.comment.value = ""; // Clear the input field after adding comment
  }, []);

  const handleLike = useCallback(() => {
    setLikes((prevLikes) => prevLikes + 1);
  }, []);

  const handleEnterKey = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const newComment = commentInputRef.current.value;
      if (newComment.trim() !== '') {
        setComments((prevComments) => [newComment, ...prevComments]);
        commentInputRef.current.value = ''; // Clear the input field after adding comment
      }
    }
  };

  useEffect(() => {
    const inputRef = commentInputRef.current;
    if (inputRef) {
      inputRef.addEventListener('keypress', handleEnterKey);
    }
    return () => {
      if (inputRef) {
        inputRef.removeEventListener('keypress', handleEnterKey);
      }
    };
  }, [handleEnterKey]);

  return (
    <div className="video">
      <Header />
      <div class="video-content">
        <img
          className="video-using-anima-plugin"
          alt=""
          src="/video-using-anima-plugin.svg"
        />
      </div>
      <div className="video-actions">
        <div className="like-container">
          <button className="like-button" onClick={handleLike}>
            <img src="/like.png" alt="Like" />
          </button>
          <span>{likes}</span>
        </div>
        <div className="comment-container">
          <div className="comment-section">
            <h3>Comments:
              <input
                type="text"
                className="comment"
                placeholder="Add a comment"
                ref={commentInputRef}
              />
            </h3>
            <ul>
              {comments.map((comment, index) => (
                <li key={index}>{comment}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stream;
