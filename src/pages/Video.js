import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./Video.css";

const Video = () => {
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

  return (
    <div className="video">
      <div className="header2">
        <div className="header-item" />
        <div className="logo3" onClick={onLogoContainerClick}>
          <div className="kidtube4">Kidtube</div>
          <img className="group-icon" alt="" src="/group-2443.svg" />
        </div>
        <input className="search2" placeholder="Search" type="text" />
        <button className="sign-up2" onClick={onSignUpClick}>
          <div className="button5">Sign up</div>
        </button>
        <button className="login3" onClick={onLoginClick}>
          <div className="button6">Sign in</div>
        </button>
      </div>
      <img
        className="video-using-anima-plugin"
        alt=""
        src="/video-using-anima-plugin.svg"
      />
    </div>
  );
};

export default Video;
