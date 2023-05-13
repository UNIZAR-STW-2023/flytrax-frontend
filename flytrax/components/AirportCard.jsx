import React, { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { cardsData } from "../assets/dummy/dummyDatos";
//import { aeropuertos } from "../assets/dummy/aeropuertos_iata"; 
import cardImage from "../assets/dummy/images/3.jpg";
import Link from "next/link";
import { useStateContext } from '../context/StateContext';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { getCookie } from "cookies-next";
import axios from "axios";


const AirportCard = ({ aeropuertos, isFavorite }) => {

  const favURL = "https://flytrax-backend.vercel.app/saveAirports";
  const desFavURL = "https://flytrax-backend.vercel.app/deleteFavAirport";

  const [data, setData] = useState(false);
  const [page, setPage] = useState(1);
  //const [country, setCountry] = useState([]);
  const [airports, setAirports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [listOfFavAirports, setListOfFavAirports] = useState([]);

  const loadMore = () => {
    setnoOfElement(noOfElement + noOfElement)
  }

  const [noOfElement, setnoOfElement] = useState(12);
  const slice = aeropuertos.slice(0, noOfElement)
  
  if(isFavorite === "True"){
    console.log('Slice', slice)
  }

  const email = getCookie('userEmail')
  const favAirportsListURL = `https://flytrax-backend.vercel.app/getFavAirports/${email}`;
  const BEARER_TOKEN = getCookie("sessionToken");

  const { country, airport } = useStateContext();

  const favAirport = async (iata_code) => {

    console.log('Adding favorite airport...')

    const data = {
      email: email,
      iata: iata_code
    }

    await axios
      .post(favURL, data, {
        headers: {
          'Authorization': `Bearer ${BEARER_TOKEN}`,
        }
      })
      .then((res) => {
        if (res.status === 200) {
          console.log("Airport saved");
          getFavAirports();
        } else {
          alert("Error al favear aeropuerto");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Error al favear aeropuerto");
      });
  }

  const deleteFavAirport = async (iata_code) => {

    console.log('Deleting favorite airport...')

    const data_des = {
      email: email,
      iata: iata_code
    }

    await axios
      .post(desFavURL, data_des, {
        headers: {
          'Authorization': `Bearer ${BEARER_TOKEN}`,
        }
      })
      .then((res) => {
        if (res.status === 200) {
          console.log("Airport delete from favs");
          getFavAirports();
        } else {
          alert("Error al desfavear aeropuerto");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Error al desfavear aeropuerto");
      });
  }

  const getFavAirports = async () => {

    console.log('Loading favorites...')
    
    await axios.get(favAirportsListURL, {
      headers: {
        'Authorization': `Bearer ${BEARER_TOKEN}`,
        }
      }).then((res) => {
        if (res.status === 200) {
          setListOfFavAirports(res.data);
        } else {
          console.log("Failed to get list of favorites")
        }
      })
  }

  useEffect(() => {
  
    getFavAirports();
    setLoading(false);

    console.log('Lista de favoritos:', listOfFavAirports)

  }, [])


  function isFavorite(airport) {
    //return listOfFavAirports.includes(airport);
    return listOfFavAirports.find(componente => componente.iata === airport);
  }

  return (
    <div className="container mx-auto px-8">
      <div className="grid xl:-mt-5 lg:grid-cols-3 lg:mt-0 md:grid-cols-2 md:mt-5 grid-cols-1 mt-20 gap-6 z-10">
        
        {slice.map((card, index) => {
          let countryCode = card.country_code;
          let flagUrl = `https://www.countryflagicons.com/FLAT/64/${countryCode}.png`;
          return(
            
            card.iata_code ? ( 
              <div 
                key={index} 
                className="shadow-lg rounded-lg transform transition duration-500 hover:scale-110 relative"
              >
                {/*<Image className="rounded-t-lg" src={flagUrl} width={width} height={height} alt="" />*/}

                { isFavorite(card.iata_code) ? (
                  <div className="p-5 z-20">
                    <AiFillHeart 
                      className="absolute right-2 mb-5 text-red-700" 
                      size={30} 
                      onClick={() => deleteFavAirport(card.iata_code)}
                    />
                    <div className="flex flex-row items-center gap-3">
                      <Image className="rounded-t-lg" src={flagUrl} width={64} height={64} alt="" />
                      <h3 className="text-3xl font-bold text-slate-700 mb-3">
                        {card.iata_code}
                      </h3>
                    </div>
                    <p className="text-lg font-normal text-gray-600">{card.name}</p>
                  </div>
                ) : (
                  <div className="p-5 z-20">
                    <AiOutlineHeart 
                      className="absolute right-2 mb-5 " 
                      size={30} 
                      onClick={() => favAirport(card.iata_code)}
                    />
                    <div className="flex flex-row items-center gap-3">
                      <Image className="rounded-t-lg" src={flagUrl} width={64} height={64} alt="" />
                      <h3 className="text-3xl font-bold text-slate-700 mb-3">
                        {card.iata_code}
                      </h3>
                    </div>
                    <p className="text-lg font-normal text-gray-600">{card.name}</p>
                  </div>
                )}

              </div>
            ) : (
              null
            )
          )
        })}
      </div>

      <div className="flex items-center justify-center mt-10">
        <button 
          className="bg-blue-700 hover:bg-blue-800 px-10 w-full lg:max-w-[350px] h-14 rounded-xl flex justify-center items-center text-white text-xl xl:mt-10 lg:mt-6"
          onClick={() => loadMore()}
        >
            Load More
        </button>
      </div>
    </div>
  );
};

export default AirportCard;
