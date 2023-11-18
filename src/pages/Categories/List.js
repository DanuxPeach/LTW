import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./List.css";

const List = () => {
  const navigate = useNavigate();

  const onLogoContainerClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const onSignUpClick = useCallback(() => {
    navigate("/register");
  }, [navigate]);

  const onLoginClick = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  const onVideo2ContainerClick = useCallback(() => {
    navigate("/video");
  }, [navigate]);

  const onVideo3ContainerClick = useCallback(() => {
    navigate("/video");
  }, [navigate]);

  const onVideo4ContainerClick = useCallback(() => {
    navigate("/video");
  }, [navigate]);

  const onVideo1ContainerClick = useCallback(() => {
    navigate("/video");
  }, [navigate]);

  return (
    <div className="list">
      <div className="header1">
        <div className="header-child" />
        <div className="logo2" onClick={onLogoContainerClick}>
          <div className="kidtube3">Kidtube</div>
          <img className="logo-inner" alt="" src="/group-2442.svg" />
        </div>
        <input className="search1" placeholder="Search" type="text" />
        <button className="sign-up1" onClick={onSignUpClick}>
          <div className="button3">Sign up</div>
        </button>
        <button className="login2" onClick={onLoginClick}>
          <div className="button4">Sign in</div>
        </button>
      </div>
      <div className="video2" onClick={onVideo2ContainerClick}>
        <div className="learning-farm-animals-for-kids-parent">
          <div className="learning-farm-animals">
            Learning Farm Animals for kids - Fun animals video for kids
          </div>
          <img className="image-19-icon" alt="" src="/image-19@2x.png" />
          <img className="btnplay2-icon" alt="" src="/btnplay2.svg" />
        </div>
      </div>
      <div className="video3" onClick={onVideo3ContainerClick}>
        <img className="image-19-icon" alt="" src="/image-17@2x.png" />
        <div className="learning-farm-animals">
          Animal quiz with me | Vocabulary Quiz - Learn Entry
        </div>
        <img className="btnplay2-icon" alt="" src="/btnplay2.svg" />
      </div>
      <div className="video4" onClick={onVideo4ContainerClick}>
        <img className="image-19-icon" alt="" src="/image-18@2x.png" />
        <div className="wild-animals-coloring">
          Wild Animals coloring pages | EP.2
        </div>
        <img className="btnplay2-icon" alt="" src="/btnplay2.svg" />
      </div>
      <div className="video1" onClick={onVideo1ContainerClick}>
        <div className="top-15-amazing">
          TOP 15 Amazing animals for kids | All Things Animal TV
        </div>
        <img className="image-19-icon" alt="" src="/vid1@2x.png" />
        <button className="btnplay1">
          <div className="btnplay1-child" />
          <img className="vector-icon4" alt="" src="/vector3.svg" />
        </button>
      </div>
      <div className="decor2">
        <img className="image-9-icon2" alt="" src="/image-9@2x.png" />
        <img className="image-10-icon2" alt="" src="/image-10@2x.png" />
      </div>
    </div>
  );
};

export default List;
