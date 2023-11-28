import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./List.css";
import Header from "../../components/header/Header";

const List = () => {
  const navigate = useNavigate();
  
  const onVideoContainerClick = useCallback(() => {
    navigate("/video");
  }, [navigate]);

  return (
    <div className="list">
      < Header />
      <div className="video1" onClick={onVideoContainerClick}>
        <div className="top-15-amazing">
          TOP 15 Amazing animals for kids | All Things Animal TV
        </div>
        <img className="image-19-icon" alt="" src="/vid1@2x.png" />
        <button className="btnplay1">
          <div className="btnplay1-child" />
          <img className="vector-icon4" alt="" src="/vector3.svg" />
        </button>
      </div>
      <div className="video2" onClick={onVideoContainerClick}>
        <div className="learning-farm-animals-for-kids-parent">
          <div className="learning-farm-animals">
            Learning Farm Animals for kids - Fun animals video for kids
          </div>
          <img className="image-19-icon" alt="" src="/image-19@2x.png" />
          <img className="btnplay2-icon" alt="" src="/btnplay2.svg" />
        </div>
      </div>
      <div className="video3" onClick={onVideoContainerClick}>
        <img className="image-19-icon" alt="" src="/image-17@2x.png" />
        <div className="learning-farm-animals">
          Animal quiz with me | Vocabulary Quiz - Learn Entry
        </div>
        <img className="btnplay2-icon" alt="" src="/btnplay2.svg" />
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