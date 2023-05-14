import React, { useState, useEffect } from "react";
import Image from "next/image";
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { getCookie } from "cookies-next";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";



const FavAirportCard = ({ aeropuertos }) => {

  const loadMore = () => {
    setnoOfElement(noOfElement + noOfElement)
  }

  const [listOfFavAirports, setListOfFavAirports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noOfElement, setnoOfElement] = useState(12);
  const slice = listOfFavAirports.slice(0, noOfElement)
  console.log('Slice', slice)

  const email = getCookie('userEmail')
  const favAirportsListURL = `https://flytrax-backend.vercel.app/getFavAirports/${email}`;
  const desFavURL = "https://flytrax-backend.vercel.app/deleteFavAirport";
  const BEARER_TOKEN = getCookie("sessionToken");

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
          console.log("Fav airports list");
          setListOfFavAirports(res.data);
        } else {
          console.log("Failed to get list of favorites")
        }
      })
  }

  function isFavorite(airport) {
    //return listOfFavAirports.includes(airport);
    return listOfFavAirports.find(componente => componente.iata === airport);
  }

  useEffect(() => {
    getFavAirports();

    const timer = setTimeout(() => {
      setLoading(false);
      console.log('List of favorites', listOfFavAirports);
    }, 3000);

    return () => clearTimeout(timer);

  }, [])
  
  return (

    !loading ? (


    <div className="container mx-auto px-8">
      <div className="grid xl:-mt-5 lg:grid-cols-3 lg:mt-0 md:grid-cols-2 md:mt-5 grid-cols-1 mt-20 gap-6 z-10">
        
        {slice.map((card, index) => {
          let countryCode = card.country_code;
          let flagUrl = `https://www.countryflagicons.com/FLAT/64/${countryCode}.png`;
          return(
            
            isFavorite(card.iata) ? ( 
              <div 
                key={index} 
                className="shadow-lg rounded-lg transform transition duration-500 hover:scale-110 relative"
              >
                {/*<Image className="rounded-t-lg" src={flagUrl} width={width} height={height} alt="" />*/}
                
                <div className="p-5 z-20">
                    <AiFillHeart 
                    className="absolute right-2 mb-5 text-red-700" 
                    size={30} 
                    onClick={() => deleteFavAirport(card.iata)}
                    />
                    <div className="flex flex-row items-center gap-3">
                    <Image className="rounded-t-lg" src={flagUrl} width={64} height={64} alt="" />
                    <h3 className="text-3xl font-bold text-slate-700 mb-3">
                        {card.iata}
                    </h3>
                    </div>
                    <p className="text-lg font-normal text-gray-600">{card.name}</p>
                </div>

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
  );
};

export default FavAirportCard;
