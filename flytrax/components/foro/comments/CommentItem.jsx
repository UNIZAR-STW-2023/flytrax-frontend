/*
  File's name: CommentItem.jsx
  Authors: Paul Huszak & Guillermo Cánovas 
  Date: 16/05/2023
*/

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

const CommentItem = ({ data }) => {
  const router = useRouter();
  const [randomIndex, setRandomIndex] = useState(null);

  const images = [
    "/assets/icons/avatars/avatar-1.svg",
    "/assets/icons/avatars/avatar-2.svg",
    "/assets/icons/avatars/avatar-3.svg",
    "/assets/icons/avatars/avatar-4.svg",
    "/assets/icons/avatars/avatar-5.svg",
    "/assets/icons/avatars/avatar-6.svg",
    "/assets/icons/avatars/avatar-7.svg",
    "/assets/icons/avatars/avatar-8.svg",
    "/assets/icons/avatars/avatar-9.svg",
    "/assets/icons/avatars/avatar-10.svg",
    "/assets/icons/avatars/avatar-11.svg",
    "/assets/icons/avatars/avatar-12.svg",
    "/assets/icons/avatars/avatar-13.svg",
    "/assets/icons/avatars/avatar-14.svg",
    "/assets/icons/avatars/avatar-15.svg",
  ];

  useEffect(() => {
    setRandomIndex(Math.floor(Math.random() * images.length));
    // eslint-disable-next-line
  }, []);

  return (
    <div className="w-full border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-200 transition bg-neutral-100 text-black shadow-lg rounded-lg transform duration-200 relative my-1">
      <div className="flex flex-row items-start gap-3">
        <div>
          <Image
            className="shadow-sm border-[1px] shadow-gray-500 bg-white rounded-full"
            src={images[randomIndex]}
            alt="User Image"
            width={50}
            height={50}
          />
        </div>
        <div>
          <div className="flex flex-row items-start gap-3">
            <p className="font-semibold cursor-pointer hover:underline">
              {" "}
              {data.nickname}{" "}
            </p>
            <span className="text-sm"> {data.date} </span>
          </div>
          <div className="mt-1"> {data.content} </div>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
