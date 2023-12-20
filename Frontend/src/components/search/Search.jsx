import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Search.css";

const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [videoList, setVideoList] = useState([]);
    const navigate = useNavigate();

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            navigate(`/list?title=${searchTerm}`)
        }
    };
    const handleChange = (event) => {
      const newSearchTerm = event.target.value;
      setSearchTerm(newSearchTerm);
      if (newSearchTerm.length >= 3 ) {
        fetchVideoList();
      } else {
        setVideoList([]);
      }
    };

    const fetchVideoList = async () => {
      try {
        let response;
        response = await fetch(`http://localhost:5000/list?title=${searchTerm}`);
        if (response.ok) {
          const data = await response.json();
          setVideoList(data);
          console.log('Response:', data);
        } else {
          console.error('Error fetching video list:', response.status);
        }
      } catch (error) {
        console.error('Error fetching video list:', error);
      }
    };

  return (
    <div>
      <input className='search' type="text" placeholder="Search" value={searchTerm} onChange={handleChange} onKeyDown={handleKeyDown} />
      <div className='searchrecommend'>
        {videoList.map((video) => (
            <div key={video.video_uuid}className="serachtitle">{video.title}</div>
        ))}
      </div>
    </div>
  );
};

export default Search;