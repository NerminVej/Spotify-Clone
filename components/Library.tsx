"use client";

import React from "react";
import { TbPlaylist } from "react-icons/tb";

const Library = () => {
  const onClick = () => {
    // Handle upload
  };
  return (
    <div className="flex flex-col">
      <div
        className="
            flex
            items-center
            justify-between
            px-5
            pt-4
            "
      >
        <div
          className="
            inline-flex
            items-center
            gap-x-2
            "
        ></div>
        <TbPlaylist />
      </div>
    </div>
  );
};

export default Library;
