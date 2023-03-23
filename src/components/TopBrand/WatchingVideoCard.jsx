import React from "react";

const WatchingVideoCard = () => {
  return (
    <div className="">
      <iframe
        width="520"
        height="280"
        src={"https://www.youtube.com/embed/jwmS1gc9S5A"}
        frameBorder="0"
        allowFullScreen
        title="Embedded youtube"
        className="md:rounded-xl md:shadow-md"
      />
    </div>
  );
};

export default WatchingVideoCard;
