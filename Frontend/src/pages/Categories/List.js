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
  const [user, setUser] = useState(null);

  const onVideoContainerClick = useCallback((uuid) => {
    navigate(`/video?v=${uuid}`);
  }, [navigate]);

  useEffect(() => {
    const fetchVideoList = async () => {
      try {
        let response;
        if (titleQuery) {
          response = await fetch(`http://localhost:5000/list?title=${titleQuery}`);
        } else {
          response = await fetch(`http://localhost:5000/list?category=${categoryQuery}`);
        }
        if (response.ok) {
          const data = await response.json();
          setVideoList(data);
          console.log(titleQuery ? 'Response ?title:' : 'Response ?query:', data);
        } else {
          console.error('Error fetching video list:', response.status);
        }
      } catch (error) {
        console.error('Error fetching video list:', error);
      }
    };
    fetchVideoList();
  }, []);

  return (
    <div className="list">
      < Header user={user} setUser={setUser} />
      <div className="video-list">
        {videoList.map((video) => (
          <div className="video-item" key={video.video_uuid} onClick={() => onVideoContainerClick(video.video_uuid)}>
            {console.log('Thumbnail URL:', `http://localhost:5000/${video.thumbnail_url.replace(/\\/g, '/')}`)}
            <img className="thumbnail-image" src={`http://localhost:5000/${video.thumbnail_url.replace(/\\/g, '/')}`} alt="" />
            <div className="video-title">
              {video.title}
            </div>
            <img className="btnplay2-icon" alt="" src="/btnplay2.svg" />
          </div>
        ))}
      </div>
      <div className="decor2">
        <img className="image-9-icon2" alt="" src="/image-9@2x.png" />
        <img className="image-10-icon2" alt="" src="/image-10@2x.png" />
      </div>
    </div>
  );
};

export default List;