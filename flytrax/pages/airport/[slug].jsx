/*
  File's name: /airport/[slug].jsx
  Authors: Paul Huszak & Guillermo Cánovas 
  Date: 16/05/2023
*/

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Loader } from "../../components";
import { ArrowBack, InfoOutlined } from "@mui/icons-material";
import NotFound from "../404";
import Image from "next/image";
import FlightsBarChart from "../../components/charts/FlightsBarChart";
import Map from "../../components/map/index";
import axios from "axios";

const AirportDetails = () => {
  const router = useRouter();
  const { slug } = router.query;

  const AirLabs_API_KEY = process.env.NEXT_PUBLIC_AIRLABS_API_KEY;
  const AirLabs_URL = `https://airlabs.co/api/v9/airports?iata_code=${slug}&api_key=${AirLabs_API_KEY}`;

  const [airport, setAirport] = useState([]);
  const [details, setDetails] = useState([]);

  const [airportImage, setAirportImage] = useState("");
  const [loading, setLoading] = useState(true);

  const apiKey = process.env.NEXT_PUBLIC_PEXELS_API_KEY;
  const client = axios.create({
    baseURL: "https://api.pexels.com/v1/",
    headers: {
      Authorization: apiKey,
    },
  });

  const perPage = 1;

  useEffect(() => {
    if (!router.isReady) return;

    const checkAirport = async (slug) => {
      let aeropuertos = [];

      await fetch("/assets/data/[AirLabs]_Airports.json")
        .then((response) => response.json())
        .then((data) => {
          // Use the data from the JSON file
          aeropuertos.push(...data.response);
          const currentAirport = aeropuertos.find(
            (elem) => elem.iata_code === slug
          );
          if (currentAirport === undefined) {
            setAirport(null);
          } else {
            setAirport(currentAirport.iata_code);
          }
        })
        .catch((error) => console.error(error));
    };

    const getAirportDetails = async () => {
      await axios
        .get(AirLabs_URL)
        .then((response) => {
          setDetails(response.data.response[0]);
        })
        .catch((error) => {
          console.log("Error fetching the data: ", error);
        });
    };

    const getAirportInfo = async (airport) => {
      const aeropuerto = airport;
      const options = {
        method: "GET",
        url: "https://airport-info.p.rapidapi.com/airport",
        params: { iata: aeropuerto },
        headers: {
          "X-RapidAPI-Key":
            "4cf62832bemsh96ea30e00871225p19798ajsnd8093d9b9691",
          "X-RapidAPI-Host": "airport-info.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        const query = response.data.location.split(",")[0];
        client
          .get(`search?query=${query}&per_page=${perPage}`)
          .then((response) => {
            setAirportImage(response.data.photos[0].src.landscape);
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.error(error);
      }
    };

    checkAirport(slug);
    getAirportDetails();
    getAirportInfo(slug);

    setTimeout(() => setLoading(false), 5000);

    //fetchImage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.slug, router.isReady]);

  return !loading ? (
    airport !== null && airport !== undefined ? (
      <>
        <div className="flex flex-col justify-center items-center align-middle m-auto lg:w-3/4 max-sm:w-10/12 my-24 select-none">
          <div className="sm:flex items-center align-center gap-2 my-10 text-black text-center justify-center font-bold max-sm:text-3xl sm:text-4xl">
            {details.name}{" "}
            <div className="flex items-center align-middle justify-center">
              <h3 className="max-sm:w-fit max-sm:self-center border-2 border-gray-500 rounded-lg text-gray-500 text-2xl px-1 mx-2 font-normal">
                {details.iata_code}
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <div className="grid col-span-1 w-full h-full">
              <div className="flex flex-col rounded-2xl col-span-1 uppercase align-middle items-center justify-center font-bold w-full h-full">
                <div className="flex w-full flex-row gap-2 justify-end">
                  <button
                    onClick={() =>
                      router.push(`/airport/${airport}/flight-panel`)
                    }
                    /* onClick={getAirportInfo} */
                    className="w-full my-3 bg-amber-600 text-slate-50 uppercase rounded-xl hover:bg-amber-800 ease-in-out duration-150 shadow-md max-sm:h-16 h-10"
                  >
                    Ver paneles de vuelos
                  </button>
                  <button
                    onClick={() => router.push(`/community/${airport}`)}
                    /* onClick={getAirportInfo} */
                    className="w-full my-3 bg-rose-600 text-slate-50 uppercase rounded-xl hover:bg-rose-800 ease-in-out duration-150 shadow-md max-sm:h-16 h-10"
                  >
                    Ir al foro
                  </button>
                </div>
                <div className="flex flex-col w-full h-full gap-2">
                  <div className="w-full h-1/2 rounded-xl shadow-md uppercase text-2xl font-bold justify-center">
                    {airportImage ? (
                      <Image
                        className="rounded-xl w-full h-full object-fill"
                        width={500}
                        height={500}
                        src={airportImage}
                        alt={`${airport} City`}
                        style={{ objectFit: "cover" }}
                      />
                    ) : (
                      <Image
                        className="rounded-xl w-full h-full object-fill"
                        width={500}
                        height={500}
                        src="/assets/images/airports.jpg"
                        alt={`${airport} City`}
                        style={{ objectFit: "cover" }}
                      />
                    )}
                  </div>
                  <div className="w-full h-full flex align-middle items-center shadow-md rounded-xl uppercase text-2xl font-bold justify-center">
                    <FlightsBarChart airport={airport} />
                  </div>
                </div>
              </div>
            </div>
            <div className="grid col-span-1 w-full h-full">
              <Map
                latitude={details.lat}
                longitude={details.lng}
                country={details.country_code}
              />
            </div>
          </div>
        </div>
        <button
          onClick={() => router.back()}
          className="flex gap-2 hover:text-orange-600 transition ease-in-out duration-200 font-semibold uppercase text-2xl align-middle items-center w-40 m-5"
        >
          <ArrowBack /> Volver
        </button>
      </>
    ) : (
      <NotFound />
    )
  ) : (
    <Loader value={"información del aeropuerto"} />
  );
};

export default AirportDetails;
