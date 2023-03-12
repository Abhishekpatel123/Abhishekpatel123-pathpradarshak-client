import React from "react";

const VideoDetail = ({ video }) => {
  if (!video) {
    return <div>Loading....</div>;
  }

  //const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}`;

  return (
    <iframe
      style={{ width: "100%", minHeight: "450px" }}
      src={video.videoLink}
      title="videoplayer"
    />
  );
};

export default VideoDetail;
