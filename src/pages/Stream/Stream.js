import React from 'react';
import "./Stream.css";
import Header from "../../components/header/Header";

const Stream = () => {
  return (
    <div className="video">
      < Header/>
      <img className="video-using-anima-plugin"
        alt=""
        src="/video-using-anima-plugin.svg"
      />
    </div>
  );
};

export default Stream;
