import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useRouter } from "next/router";
import Image from 'next/image'
import { aeropuertos } from '../../assets/dummy/aeropuertos_iata';
import BannerImage from "../../assets/images/banner-image.jpg";
import ClipLoader from "react-spinners/ClipLoader";


const AirportDetails = () => {

  const router = useRouter();
  const { slug } = router.query;

  //const UNSPLASH_ACCESS_KEY = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;
  const UNSPLASH_ACCESS_KEY = "TzhXe7X0RHz8T6XMyyEe1jEXRAiO7GyIlUTSz4Zu5RM";
  
  console.log(UNSPLASH_ACCESS_KEY)

  const AirLabs_API_KEY = process.env.NEXT_PUBLIC_AIRLABS_API_KEY;
  console.log(AirLabs_API_KEY)

  const [airport, setAirport] = useState([]);
  const [airportImage, setAirportImage] = useState("");
  const [flagUrl, setFlagUrl] = useState("");
  const [loading, setIsLoading] = useState(true);


  useEffect(() => {

    if (!router.isReady) return;

    const query = `airport ${slug}`
    const auth = `Client-ID ${UNSPLASH_ACCESS_KEY}`

    const fetchImage = async () => {
      try {
        const response = await axios.get('https://api.unsplash.com/search/photos', {
          params: {
            query: query,
          },
          headers: {
            Authorization: auth,
          }
        });
        console.log(response.data.results[1].urls.raw)
        setAirportImage(response.data.results[1].urls.raw)
      } catch (error) {
        console.error(error); // Manejar el error aquí
      }
    };

    const getAirport = aeropuertos.filter((airport) => airport.iata_code === slug);
    setAirport(getAirport[0]);
    let countryCode = getAirport[0].country_code;
    setFlagUrl(`https://www.countryflagicons.com/FLAT/64/${countryCode}.png`)

    setIsLoading(false);

    //fetchImage();
  }, [router.query.slug, router.isReady]);

  return (

    !loading ? (

      <div>

        {/* Titulo */}  
        <div className="flex flex-col justify-center items-center align-middle m-auto w-10/12 mt-24 -mb-6 select-none">
            <h1 className="sm:flex items-center align-center gap-2 my-10 text-black text-center justify-center font-bold max-sm:text-3xl sm:text-4xl">
                {airport.name}
                <h2 className="flex items-center align-middle justify-center">
                    <h3 className="max-sm:w-fit max-sm:self-center border-2 border-gray-500 rounded-lg text-gray-500 text-2xl px-1 mx-2 font-normal">
                        {slug}
                    </h3>
                </h2>
            </h1>
        </div>

        {/* Info del aeropuerto */}
        <div className='container mx-auto min-h-[800px] mb-14'>
          <div className='flex flex-col justify-center items-center align-middle m-auto w-11/12 my-24 select-none'>
            <h2>{slug}</h2>
            <h3>{airport.name}</h3>
            <h3>{airport.country_code}</h3>
            <Image className="rounded-t-lg" src={flagUrl} width={64} height={64} alt="" />
          </div>
        </div>

        {/* Imagen */}
        <div className="flex-1 lg:flex justify-end items-end mb-6">
          <Image
            src={BannerImage}
            className="rounded-lg shadow-xl"
            alt="Home page"
          />
        </div>

        {/* Mapa */}

        {/* Paneles de vuelo */}
        <div className="flex items-center justify-center mb-10">
          <button 
            className="bg-blue-700 hover:bg-blue-800 px-10 w-full lg:max-w-[350px] h-14 rounded-xl flex justify-center items-center text-white text-xl xl:mt-10 lg:mt-6"
            //onClick={() => router.push(`/airport/${airport.iata_code}/flight-panels`)}
          >
              Ver paneles de vuelo
          </button>
        </div>

      </div>
    ) : (
      <div className="max-w-[1400px] m-auto w-full my-24 py-20">
          <div className="flex items-center justify-center">
          <ClipLoader
              loading={loading}
              size={100}
              aria-label="Loading Spinner"
              data-testid="loader"
          />
          </div>
      </div>
    )
  )
}

export default AirportDetails