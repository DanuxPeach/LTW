import React, { useCallback, useState , useRef, useEffect, useLayoutEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import VideoPlayer from "react-video-js-player"
import "./Video.css";
import Header from "../../components/header/Header";

const Stream = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const videoUUID = searchParams.get("v");

  const [recommendList, setRecommendList] = useState([]);
  const [videoDetails, setVideoDetails] = useState([]);
  const [videoKey, setVideoKey] = useState(0);

  const [comments, setComments] = useState([]);
  const [likesCount, setLikesCount] = useState(0);
  const [user, setUser] = useState(null);

  const onVideoContainerClick = useCallback((uuid) => {
    navigate(`/video?v=${uuid}`);
    setVideoKey((prevKey) => prevKey + 1);
  }, [navigate]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/video/comments/${videoUUID}`);
        setComments(response.data);
      } catch (error) {
        console.error('Fetch comments error:', error);
        setComments([]);
      }
    };

    const fetchLikesCount = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/video/likes/${videoUUID}`);
        setLikesCount(response.data.like_count);
      } catch (error) {
        console.error('Fetch likes count error:', error);
        setLikesCount(0);
      }
    };
    const fetchRecommendations = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/recommend/${videoUUID}`);
        setRecommendList(response.data);
        console.log('Response Recommend: ', response.data);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      }
    };
    fetchComments();
    fetchLikesCount();
    fetchRecommendations();
  }, [videoUUID]);

  const handleLike = async () => {
    if (!user) {
      // Xử lý khi người dùng chưa đăng nhập
      return;
    }

    try {
      // Gửi request để thực hiện like video
      await axios.post(`http://localhost:5000/video/like`, { videoUUID, userId: user.user_id });
      // Cập nhật số lượt like sau khi thực hiện like thành công
      setLikesCount(prevCount => prevCount + 1);
    } catch (error) {
      console.error('Like video error:', error);
    }
  };

  const handleComment = async (commentText) => {
    if (!user) {
      // Xử lý khi người dùng chưa đăng nhập
      return;
    }

    try {
      // Gửi request để thêm comment vào video
      await axios.post(`http://localhost:5000/video/comment`, { videoUUID, userId: user.user_id, commentText });
      // Lấy lại danh sách comments sau khi thêm comment thành công
      const response = await axios.get(`http://localhost:5000/video/comments/${videoUUID}`);
      setComments(response.data);
    } catch (error) {
      console.error('Add comment error:', error);
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
          setVideoKey(uuidQuery);
          console.log('API Response:', response.data);
        } catch (error) {
          console.error('Error fetching video details:', error);
        }
      } else {
        console.error('UUID is missing in the query parameters');
      }
    };

    fetchVideoDetails();
  },[location.search]);
  
  const commentInputRef = useRef(null);

  const handleEnterKey = (event) => {
    if (event.key === 'Enter') {
      const commentText = event.target.value.trim();
      if (commentText !== '') {
        handleComment(commentText);
        event.target.value = ''; // Clear input field after adding comment
      }
    }
  };

  return (
    <div className="video">
      <Header user={user} setUser={setUser} />
      <div className="video-content" key={videoKey}>
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
          <span>{likesCount}</span>
        </div>
        <div className="comment-container">
          <div className="comment-section">
            <h3>Comments:
              <input
                type="text"
                className="comment"
                placeholder="Add a comment"
                ref={commentInputRef}
                onKeyDown={handleEnterKey}
              />
            </h3>
            <ul style={{ textAlign:"left" }}>
              {comments.map((comment, index) => (
                <li key={index} >
                  <span>{comment.username}: </span>
                  <span>{comment.comment_text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="recommendations-container">
        {recommendList.map((video) => (
            <div className="video-item" key={video.video_uuid} onClick={() => onVideoContainerClick(video.video_uuid)}>
              {console.log('Thumbnail URL:', `http://localhost:5000/${video.thumbnail_url.replace(/\\/g, '/')}`)}
              <img className="thumbnail-image" src={`http://localhost:5000/${video.thumbnail_url.replace(/\\/g, '/')}`} alt="" />
              <div className="video-title">
                {video.title}
              </div>
            </div>
          ))}
      </div>
      
    </div>
  );
};

export default Stream;
