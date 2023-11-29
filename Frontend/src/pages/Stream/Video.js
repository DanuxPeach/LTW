import React, { useCallback, useState , useRef, useEffect, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import VideoPlayer from "react-video-js-player"
import "./Video.css";
import Header from "../../components/header/Header";

const Stream = () => {
  const location = useLocation();

  const [videoDetails, setVideoDetails] = useState([]);
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

  useLayoutEffect(() => {
    const fetchVideoDetails = async () => {
      const queryParams = new URLSearchParams(location.search);
      const uuidQuery = queryParams.get('v');
      if (uuidQuery) {
        try {
          // Make an API call using Axios with async/await
          const response = await axios.get(`http://localhost:5000/videodetails?v=${uuidQuery}`);
          setVideoDetails(response.data);
          console.log('API Response:', response.data);
        } catch (error) {
          console.error('Error fetching video details:', error);
        }
      } else {
        console.error('UUID is missing in the query parameters');
      }
    };

    fetchVideoDetails();
  },[]);

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
      <div className="video-content">
        {console.log('Rendering with videoDetails:', videoDetails[0]?.thumbnail_url, videoDetails[0]?.video_url)}
        {videoDetails.length > 0 && videoDetails[0]?.thumbnail_url && videoDetails[0]?.video_url ?(
            <>
              <VideoPlayer
                poster={`http://localhost:5000/${videoDetails[0]?.thumbnail_url.replace(/\\/g, '/')}`}
                src={`http://localhost:5000/${videoDetails[0]?.video_url.replace(/\\/g, '/')}`}
              />
            </>
          ) : (
            <p>Loading...</p>
          )}
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
