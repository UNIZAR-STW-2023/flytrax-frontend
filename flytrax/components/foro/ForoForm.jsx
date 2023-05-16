import React, { useState, useContext, useEffect } from "react";
import Image from "next/image";
//import userAvatar from "/assets/icons/avatars/avatar-1.svg";
import Link from "next/link";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useStateContext } from "../../context/StateContext";
import NotFound from "../../pages/404";

const ForoForm = ({
  iata_code,
  isTopic,
  topic,
  getAnswersByTopic,
  getTopicsByIata,
}) => {
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

  const [body, setBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(false);

  const createTopicURL = `https://flytrax-backend.vercel.app/createTopics`;
  const createAnswerURL = `https://flytrax-backend.vercel.app/createAnswers`;

  const email = getCookie("userEmail");
  const BEARER_TOKEN = getCookie("sessionToken");

  const onSubmit = () => {
    setIsLoading(true);
    if (createPost()) {
      if (isTopic == "True") {
        getTopicsByIata();
        setBody("");
      } else {
        getAnswersByTopic();
        setBody("");
      }
    }
  };

  const createPost = async () => {
    if (isTopic == "True") {
      const data = {
        email: email,
        description: body,
        iata: iata_code,
        respuestas: [],
      };

      await axios
        .post(createTopicURL, data, {
          headers: {
            Authorization: `Bearer ${BEARER_TOKEN}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            console.log("Post creado correctamente");
            return true;
          } else {
            alert("Error al crear post");
          }
        })
        .catch((err) => {
          console.log(err);
          alert("Error al crear post");
        });

      return false;
    } else if (isTopic == "False") {
      const data = {
        email: email,
        topicId: topic,
        content: body,
      };

      await axios
        .post(createAnswerURL, data, {
          headers: {
            Authorization: `Bearer ${BEARER_TOKEN}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            console.log("Answer creado correctamente");
            return true;
          } else {
            alert("Error al crear answer");
          }
        })
        .catch((err) => {
          console.log(err);
          alert("Error al crear answer");
        });

      return false;
    } else {
      return False;
    }
  };

  useEffect(() => {
    setRandomIndex(Math.floor(Math.random() * images.length));
    // eslint-disable-next-line
  }, []);

  return (
    <div className="w-full xl:w-2/3 border-b-[1px] border-dashed border-neutral-800 px-5 py-2">
      <div className="flex flex-col gap-4 my-4 ">
        <div className="w-full flex flex-row gap-2 align-middle items-center justify-center">
          <Image
            className="shadow-sm border-[1px] shadow-gray-500 bg-white rounded-full"
            src={images[randomIndex]}
            alt="User Image"
            width={50}
            height={50}
          />
          <textarea
            onChange={(e) => setBody(e.target.value)}
            value={body}
            className="shadow-gray-700 shadow-sm placeholder:italic focus:bg-gray-200 hover:bg-gray-200 placeholder-slate-500 hover:placeholder-slate-500 transition ease-in duration-150 disabled:opacity-80 rounded-xl px-4 py-2 peer resize-none w-full ring-0 outline-none text-[18px] text-black"
            placeholder="Escribe tu comentario..."
          />
        </div>
        <div className="flex flex-row justify-end">
          <div
            className="cursor-pointer bg-orange-600 hover:bg-orange-800 uppercase shadow-sm shadow-gray-600 text-white px-4 py-2 rounded-lg transition duration-200"
            onClick={onSubmit}
          >
            Enviar
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForoForm;
