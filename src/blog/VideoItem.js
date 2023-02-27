import React from "react";
import "./VideoItem.css";

const VideoItem = ({ lecture, onVideoSelect, index, selectedLectureIndex }) => {
  return (
    <div
      onClick={() => onVideoSelect(index)}
      style={{
        cursor: "pointer",
        color: selectedLectureIndex === index ? "green" : "#333",
      }}
    >
      <div className="content">
        <br />
        <div>
          <h5>{lecture.title}</h5>
          <hr />
        </div>
      </div>
    </div>
  );
};

export default VideoItem;
