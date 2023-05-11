import React, { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { cardsData } from "../assets/dummy/dummyDatos";
//import { aeropuertos } from "../assets/dummy/aeropuertos_iata"; 
import cardImage from "../assets/dummy/images/3.jpg";
import Link from "next/link";
import { useStateContext } from '../context/StateContext';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'


const AirportCard = ({ aeropuertos }) => {

  const favURL = "https://flytrax-backend.vercel.app/saveAirports";
  const desFavURL = "https://flytrax-backend.vercel.app/deleteFavAirports";
  //const favAirportsListURL = "https://flytrax-backend.vercel.app/getFavAirports";

  const [email, setEmail] = useState("");
  const [data, setData] = useState(false);
  const [page, setPage] = useState(1);
  //const [country, setCountry] = useState([]);
  const [airports, setAirports] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadMore = () => {
    setnoOfElement(noOfElement + noOfElement)
  }

  const [noOfElement, setnoOfElement] = useState(12);
  const slice = aeropuertos.slice(0, noOfElement)

  const { country, airport } = useStateContext();

  const favAirport = async (iata_code) => {
    const data = {
      email : email,
      iata: iata_code
    }

    await axios
      .post(favURL, data)
      .then((res) => {
        if (res.status === 200) {
          console.log("Airport saved");
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
    const data = {
      email : email,
      iata: iata_code
    }

    await axios
      .post(desFavURL, data)
      .then((res) => {
        if (res.status === 200) {
          console.log("Airport delete from favs");
        } else {
          alert("Error al desfavear aeropuerto");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Error al desfavear aeropuerto");
      });
    }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://reqres.in/api/users?page=2')
        const json = res.json()
        setData(json.data)
      } catch (e) {
        console.log(e)
      }
    }
    fetchData()

    if(country != ""){
      const filtered = aeropuertos.filter(function (item) {
        return item.country_code === country;
      });
      setAirports(filtered);
    }

  }, [page])


  const favList = async () => {
    const data = {
      email : email,
    }

    //Get fav airports

    /*const getCountryFromLocation = async (latitude, longitude) => {
      try {
        const response = await fetch(
          `https://api-bdc.net/data/reverse-geocode?latitude=${latitude}&longitude=${longitude}&localityLanguage=en&key=${BDC_API_KEY}`
        );
        const data = await response.json();
        const countryCode = data.countryCode;
        setCountry(countryCode);
      } catch (error) {
        console.error("Failed to get country from location:", error);
      }*/

    //setListOfFavAirports(res.data);
  }


  function isFavorite(airport) {
    return listOfFavAirports.includes(airport);
  }

  const [listOfFavAirports, setListOfFavAirports] = useState([]);

  return (
    <div className="container mx-auto px-8">
      <div className="grid xl:-mt-5 lg:grid-cols-3 lg:mt-0 md:grid-cols-2 md:mt-5 grid-cols-1 mt-20 gap-6">
        
        {slice.map((card, index) => {
          let countryCode = card.country_code;
          let flagUrl = `https://www.countryflagicons.com/FLAT/64/${countryCode}.png`;
          return(
            
            card.iata_code ? ( 
              <Link href={`/airports/${card.iata_code}`}>
              <div 
                key={index} 
                className="shadow-lg rounded-lg transform transition duration-500 hover:scale-110 relative"
              >
                {/*<Image className="rounded-t-lg" src={flagUrl} width={width} height={height} alt="" />*/}

                { isFavorite(card.iata_code) ? (
                  <div className="p-5">
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
                  <div className="p-5">
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
            </Link>
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
