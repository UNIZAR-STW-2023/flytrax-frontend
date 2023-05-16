import React, { useEffect, useState } from "react";
import { ForoFeed, ForoForm } from "../../components";
import { useRouter } from "next/router";
import NotFound from "../404";
import Loader from "../../components/Loader";
import axios from "axios";
import { aeropuertos } from "../../assets/dummy/aeropuertos_iata";
import { getCookie } from "cookies-next";
import ForoItem from "../../components/foro/ForoItem";
import { Add, ArrowBack, KeyboardDoubleArrowUp } from "@mui/icons-material";

const CommunityDetails = () => {
  const router = useRouter();
  const { slug } = router.query;

  const [airports, setAirports] = useState([]);
  const [actualAirport, setActualAirport] = useState(null);
  const [loading, setIsLoading] = useState(true);
  const [topicsByIata, setTopicsByIata] = useState([]);
  const [backURL, setBackURL] = useState("");

  // Cookie de la sesión
  const USER_EMAIL = getCookie("userEmail");
  const BEARER_TOKEN = getCookie("sessionToken");
  const [noOfElement, setnoOfElement] = useState(5);
  const slice = topicsByIata.slice(0, noOfElement);

  const loadMore = () => {
    getTopicsByIata();
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

  const getTopicsByIata = async () => {
    await axios
      .get(backURL, {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setTopicsByIata(res.data);
        } else {
          console.log("Error retrieving topics by IATA code");
        }
      });
  };

  useEffect(() => {
    if (!router.isReady) return;
    setBackURL(`https://flytrax-backend.vercel.app/getTopicsByIata/${slug}`);
    aeropuertos.map(function (item) {
      if (item.iata_code === slug) {
        setActualAirport(item.iata_code);
        setIsLoading(false);
      }
    });

    setIsLoading(false);

    if (actualAirport !== null && actualAirport !== undefined) {
      getTopicsByIata();
    }
  }, [router.query.slug, router.isReady, actualAirport, setActualAirport]);

  return actualAirport !== null || actualAirport !== undefined ? (
    <>
      <div className="flex flex-col min-h-[70vh] justify-center items-center align-middle m-auto w-11/12 max-sm:w-10/12 my-24 select-none">
        <div
          id="list-top"
          className="flex flex-col items-center align-middle justify-center w-full my-10"
        >
          <div className="w-full flex items-center align-center gap-2 my-10 text-black text-center justify-center font-bold max-sm:text-3xl sm:text-4xl">
            Foro del aeropuerto
            <div className="flex items-center align-middle justify-center">
              <h3 className="max-sm:w-fit max-sm:self-center border-2 border-gray-500 rounded-lg text-gray-500 text-2xl px-1 mx-2 font-normal">
                {slug}
              </h3>
            </div>
          </div>
          {topicsByIata.length > 0 ? null : (
            <div className="font-normal text-xl text-gray-600">
              Todavía no hay discusiones en este foro, ¡sé el primero en iniciar
              una!
            </div>
          )}
        </div>

        <ForoForm
          isTopic={"True"}
          iata_code={slug}
          getTopicsByIata={getTopicsByIata}
        />

        <div className="flex flex-col my-10 w-full xl:w-2/3 gap-2">
          {slice.map((post, index) => (
            <ForoItem key={index} data={post} iata={slug} />
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
        className="flex gap-2 hover:text-orange-600 transition ease-in-out duration-200 font-semibold uppercase text-2xl align-middle items-center w-40 m-5 mt-10"
      >
        <ArrowBack /> Volver
      </button>
    </>
  ) : (
    <>{!loading ? <NotFound /> : <Loader value={"comentarios"} />}</>
  );
};

export default CommunityDetails;
