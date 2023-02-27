import React from "react";
import VideoItem from "./VideoItem";

const VideoList = ({ lectures, onVideoSelect, selectedLectureIndex }) => {
  const renderedList = lectures.map((lecture, index) => {
    return (
      <VideoItem
        selectedLectureIndex={selectedLectureIndex}
        key={lecture._id}
        index={index}
        onVideoSelect={onVideoSelect}
        lecture={lecture}
      />
    );
  });

  return <div className="ui relaxed divided list">{renderedList}</div>;
};

export default VideoList;
