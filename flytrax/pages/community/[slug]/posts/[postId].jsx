/*
  File's name: /[slug]/posts/[postId].jsx
  Authors: Paul Huszak & Guillermo Cánovas 
  Date: 16/05/2023
*/

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ForoForm, Loader } from "../../../../components";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useStateContext } from "../../../../context/StateContext";
import Image from "next/image";
import CommentItem from "../../../../components/foro/comments/CommentItem";
import { Add, ArrowBack, KeyboardDoubleArrowUp } from "@mui/icons-material";

const PostDetails = ({}) => {
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

  const { postId, slug } = router.query;
  const { comentario, setRespuesta, respuesta } = useStateContext();

  const [fetchedPost, setFetchedPost] = useState(null);
  const [answersByTopic, setAnswersByTopic] = useState([]);
  const [backURL, setBackURL] = useState("");
  const [auxURL, setAuxURL] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [topicsByIata, setTopicsByIata] = useState([]);
  const [actualPost, setActualPost] = useState([]);
  const [discusion, setDiscusion] = useState([]);
  const [value, setValue] = useState("");
  const [noOfElement, setnoOfElement] = useState(5);

  // Cookie de la sesión
  const USER_EMAIL = getCookie("userEmail");
  const BEARER_TOKEN = getCookie("sessionToken");

  const loadMore = () => {
    setnoOfElement(noOfElement + noOfElement);
  };

  const scrollToTop = () => {
    const element = document.getElementById("list-top");
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };

  const slice = respuesta.slice(0, noOfElement);

  const getAnswersByTopic = async () => {
    await axios
      .get(backURL, {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          if (Array.isArray(res.data)) {
            setAnswersByTopic(res.data);
            setRespuesta(res.data);
          }
        } else {
          console.log("Error retrieving answers by Topic code");
        }
      });
  };

  const buscarPorId = (array, id) => {
    return array.find((elemento) => elemento._id === id);
  };

  const getTopicsByIata = async () => {
    await axios
      .get(auxURL, {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          if (Array.isArray(res.data)) {
            const elementoEncontrado = buscarPorId(res.data, postId);
            setDiscusion(elementoEncontrado);
          }
        } else {
          console.log("Error retrieving topics by IATA code");
        }
      });
  };

  useEffect(() => {
    if (!router.isReady) return;
    setBackURL(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}getAnswersByTopic/${postId}`
    );
    setActualPost(postId);
    setAuxURL(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getTopicsByIata/${slug}`);
    setIsLoading(false);

    getAnswersByTopic();
    getTopicsByIata();
    setRandomIndex(Math.floor(Math.random() * images.length));

    // eslint-disable-next-line
  }, [
    router.query.postId,
    router.query.slug,
    router.isReady,
    actualPost,
    setActualPost,
    backURL,
    setBackURL,
  ]);

  return (
    <>
      {actualPost.length === 0 ? (
        <Loader value={"respuestas"} />
      ) : (
        <>
          <div
            id="list-top"
            className="flex flex-col min-h-[70vh] justify-center items-center align-middle m-auto w-11/12 max-sm:w-10/12 my-24 select-none"
          >
            <div className="flex flex-col justify-center items-center align-middle m-auto w-10/12 -mb-6 select-none">
              <div className="w-full flex items-center align-center gap-2 my-10 text-black text-center justify-center font-bold max-sm:text-3xl sm:text-4xl">
                Hilo de mensajes
                <div className="flex items-center align-middle justify-center">
                  <h3 className="max-sm:w-fit max-sm:self-center border-2 border-gray-500 rounded-lg text-gray-500 text-2xl px-1 mx-2 font-normal">
                    {slug}
                  </h3>
                </div>
              </div>
            </div>

            <div className="w-full xl:w-2/3 border-b-[1px] border-neutral-800 p-5 cursor-pointer bg-slate-200 hover:bg-neutral-100 transition shadow-lg rounded-lg transform duration-200 relative my-2">
              <div className="flex flex-row items-start gap-3 mb-5">
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
                    <p className="font-semibold cursor-pointer">
                      {" "}
                      {discusion.nickname}{" "}
                    </p>
                    <span className="text-sm"> {discusion.date} </span>
                  </div>
                  <div className="mt-1"> {discusion.description} </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center align-middle w-full">
              <ForoForm
                isTopic={"False"}
                topic={postId}
                getAnswersByTopic={getAnswersByTopic}
              />
            </div>

            <div className="flex flex-col pl-5 my-10 border-l-2 border-gray-500 w-full xl:w-2/3 gap-2">
              {slice.map((resp, index) => (
                <CommentItem key={index} data={resp} />
              ))}
            </div>

            <div className="flex items-center justify-center mt-10 w-full xl:w-2/3">
              <button
                data-test="more-button"
                type="button"
                className="flex pl-10  align-middle items-center w-full justify-center py-4 text-xl uppercase font-bold text-slate-800 hover:text-cyan-600 transition ease-in-out duration-200"
                onClick={loadMore}
              >
                <Add /> <h2>Ver más</h2>
              </button>
              <button
                data-test="more-button"
                type="button"
                className="flex px-3 sm:px-5 align-middle items-center w-fit justify-center py-4 text-xl uppercase font-bold text-slate-800 hover:text-cyan-600 transition ease-in-out duration-200"
                onClick={scrollToTop}
              >
                <KeyboardDoubleArrowUp />
              </button>
            </div>
          </div>
          <button
            onClick={() => router.back()}
            className="flex gap-2 hover:text-orange-600 transition ease-in-out duration-200 font-semibold uppercase text-2xl align-middle items-center w-40 m-5"
          >
            <ArrowBack /> Volver
          </button>
        </>
      )}
    </>
  );
};

export default PostDetails;
