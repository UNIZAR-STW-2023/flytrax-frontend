/*
  File's name: ForoItem.jsx
  Authors: Paul Huszak & Guillermo Cánovas 
  Date: 16/05/2023
*/

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { FaComments } from "react-icons/fa";
import { useStateContext } from "../../context/StateContext";
import Link from "next/link";

const ForoItem = ({ data, iata }) => {
  const router = useRouter();
  const { setComentario } = useStateContext();

  const goToPost = useCallback(() => {
    setComentario(data);
    // eslint-disable-next-line
  }, [router, data._id]);

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
    <Link className="w-full" href={`/community/${iata}/posts/${data._id}`}>
      <div className="w-full border-b-[1px] border-neutral-800 p-5 cursor-pointer bg-slate-200 hover:bg-neutral-100 transition shadow-lg rounded-lg transform duration-200 hover:scale-105 relative my-1">
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
          <div className="text-black">
            <div className="flex flex-row items-center gap-2">
              <p className="font-semibold cursor-pointer"> {data.nickname} </p>
              <span className="text-sm"> {data.date} </span>
            </div>
            <div className="mt-1"> {data.description} </div>
            <div className="flex flex-row items-center mt-3 gap-10">
              <div className="flex flex-row items-center  gap-2 cursor-pointer transition hover:text-violet-800">
                <FaComments size={20} />
                <p> {data.respuesta?.length || 0} </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ForoItem;
