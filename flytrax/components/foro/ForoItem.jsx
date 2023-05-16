import React, { useCallback } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import userLogo from "../../assets/images/user-logo.png";
import { FaComments } from "react-icons/fa";
import { useStateContext } from "../../context/StateContext";
import Link from "next/link";

const ForoItem = ({ data, iata }) => {
  const router = useRouter();

  const { setComentario } = useStateContext();

  const goToPost = useCallback(() => {
    setComentario(data);
  }, [router, data._id]);

  return (
    <Link href={`/community/${iata}/posts/${data._id}`}>
      <div className="w-full border-b-[1px] border-neutral-800 p-5 cursor-pointer bg-slate-200 hover:bg-neutral-100 transition shadow-lg rounded-lg transform duration-200 hover:scale-105 relative my-1">
        <div className="flex flex-row items-start gap-3">
          <div>
            <Image className="rounded-full h-12 w-12" src={userLogo} alt="" />
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
