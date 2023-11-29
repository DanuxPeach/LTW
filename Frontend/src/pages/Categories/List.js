import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./List.css";
import axios from "axios"
import Header from "../../components/header/Header";

const List = () => {
  const navigate = useNavigate();
  const [videoList, setVideoList] = useState([]);
  const queryParams = new URLSearchParams(location.search);
  const titleQuery = queryParams.get('title');
  const categoryQuery = queryParams.get('category');

  const onVideoContainerClick = useCallback((uuid) => {
    navigate(`/video?v=${uuid}`);
  }, [navigate]);

  useEffect(() => {
    const fetchVideoList = async () => {
      try {
        if (titleQuery) {
          const response = await axios.get(`http://localhost:5000/list?title=${titleQuery}`);
          setVideoList(response.data);
          console.log('Response ?title: ', response.data);
        } else {
          const response = await axios.get(`http://localhost:5000/list?category=${categoryQuery}`);
          setVideoList(response.data);
          console.log('Response ?query: ', response.data);
        }
        
      } catch (error) {
        console.error('Error fetching video list:', error);
      }
    };
    fetchVideoList();
  }, []);

  return (
    <div className="list">
      < Header />
      <div className="video-list">
        {videoList.map((video) => (
          <div className="video-item" key={video.video_uuid} onClick={() => onVideoContainerClick(video.video_uuid)}>
            <img className="thumbnail-image" src={video.thumbnailUrl} alt="" />
            <div className="video-title">
              {video.title}
            </div>
            <img className="btnplay2-icon" alt="" src="/btnplay2.svg" />
          </div>
        ))}
      </div>
      
      <div className="video4" onClick={onVideoContainerClick}>
        <img className="image-19-icon" alt="" src="/image-18@2x.png" />
        <div className="wild-animals-coloring">
          Wild Animals coloring pages | EP.2
        </div>
        <img className="btnplay2-icon" alt="" src="/btnplay2.svg" />
      </div>
      <div className="decor2">
        <img className="image-9-icon2" alt="" src="/image-9@2x.png" />
        <img className="image-10-icon2" alt="" src="/image-10@2x.png" />
      </div>
    </div>
  );
};

export default List;