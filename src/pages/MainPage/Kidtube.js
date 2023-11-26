import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./Kidtube.css";
import Header from "../../components/header/Header";

const Kidtube = () => {
  const navigate = useNavigate();

  const onVid2ContainerClick = useCallback(() => {
    navigate("/video");
  }, [navigate]);

  const onVid1ContainerClick = useCallback(() => {
    navigate("/video");
  }, [navigate]);

  const onCate1Click = useCallback(() => {
    navigate("/list");
  }, [navigate]);

  const onCate2ContainerClick = useCallback(() => {
    navigate("/list");
  }, [navigate]);

  const onCate3ContainerClick = useCallback(() => {
    navigate("/list");
  }, [navigate]);

  const onCate4ContainerClick = useCallback(() => {
    navigate("/list");
  }, [navigate]);

  const onCate5ContainerClick = useCallback(() => {
    navigate("/list");
  }, [navigate]);

  return (
    <div className="kidtube">
      < Header />
      <div className="decor">
        <img className="image-9-icon" alt="" src="/image-9@2x.png" />
        <img className="image-10-icon" alt="" src="/image-10@2x.png" />
      </div>
      <div className="rcm">
        <div className="vid2" onClick={onVid2ContainerClick}>
          <div className="lexis-adventure-time">Lexi’s adventure time</div>
          <img className="image-8-icon" alt="" src="/image-8@2x.png" />
        </div>
        <div className="vid1" onClick={onVid1ContainerClick}>
          <div className="new-sweetie">New | Sweetie paradise for children</div>
          <img className="image-8-icon" alt="" src="/image-7@2x.png" />
        </div>
        <button className="right-button">
          <img className="vector-icon" alt="" src="/vector.svg" />
          <img className="vector-icon1" alt="" src="/vector1.svg" />
        </button>
        <button className="left-button">
          <img className="vector-icon" alt="" src="/vector.svg" />
          <img className="vector-icon3" alt="" src="/vector2.svg" />
        </button>
        <div className="recommend-for-you">Recommend for you</div>
      </div>
      <div className="category">
        <main className="cate1" onClick={onCate1Click}>
          <div className="animals">Animals</div>
          <img className="thumnail1-icon" alt="" src="/thumnail1@2x.png" />
        </main>
        <div className="cate2" onClick={onCate2ContainerClick}>
          <div className="art">Art</div>
          <img className="thumnail1-icon" alt="" src="/thumnail2@2x.png" />
        </div>
        <div className="cate3" onClick={onCate3ContainerClick}>
          <div className="creative">Creative</div>
          <img className="thumnail1-icon" alt="" src="/thumnail3@2x.png" />
        </div>
        <div className="cate4" onClick={onCate4ContainerClick}>
          <div className="numbers">Numbers</div>
          <img className="thumnail1-icon" alt="" src="/thumnail4@2x.png" />
        </div>
        <div className="cate5" onClick={onCate5ContainerClick}>
          <div className="cartoons">Cartoons</div>
          <img className="thumnail1-icon" alt="" src="/thumnail41@2x.png" />
        </div>
        <div className="top-categories">Top categories</div>
      </div>
    </div>
  );
};

export default Kidtube;
