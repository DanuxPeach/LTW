import { useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Kidtube.css";

const Kidtube = () => {
  const navigate = useNavigate();
  const [videos, setVideos] = useState([])
  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState([])

  const onChangeHandler = (query) => {
    let matches = []
    if (query.length>0) {
      matches = videos.filter(video => {
        const regex = new RegExp(`${query}`, "gi")
        return video.title.match(regex)
      })
    }
    console.log('matches', matches)
    setSuggestions(matches)
    setQuery(query)
  }

  const onSearchSubmit = useCallback((e) => {
    e.preventDefault();
    const results = performSearch(searchQuery); 
  setSearchResults(results);
  navigate("/search?query=" + searchQuery);
  }, [navigate, searchQuery])

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

  const onSignUpClick = useCallback(() => {
    navigate("/register");
  }, [navigate]);

  const onLoginClick = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  return (
    <div className="kidtube">
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
      <img className="home-icon" alt="" src="/home.svg" />
      <div className="header">
        <div className="logo">
          <div className="kidtube1">Kidtube</div>
          <img className="logo-child" alt="" src="/group-244.svg" />
        </div>
        <input className="search" placeholder="Search" type="text" value={query} onChange={(e) => onChangeHandler(e.target.value)} />
        <button className="sign-up" onClick={onSignUpClick}>
          <div className="button">Sign up</div>
        </button>
        <button className="login" onClick={onLoginClick}>
          <div className="button1">Sign in</div>
        </button>
      </div>
    </div>
  );
};

export default Kidtube;
