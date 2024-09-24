"use client";
import React from "react";

const RecentStreams = ({ recentStreams }) => {
  console.log("Recent Streams", recentStreams);

  const stream = recentStreams.map((item) => {
    return <div></div>;
  });

  return <div>RecentStreams</div>;
};

export default RecentStreams;
