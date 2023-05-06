import React, { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { cardsData } from "../assets/dummy/dummyDatos";
//import { aeropuertos } from "../assets/dummy/aeropuertos_iata"; 
import cardImage from "../assets/dummy/images/3.jpg";
import Link from "next/link";
import { useStateContext } from '../context/StateContext';

const AirportCard = ({ aeropuertos }) => {

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


  /* Get airports data */
  

  return (
    <div className="container mx-auto px-8">
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
        {slice.map((card, index) => {
          let countryCode = card.country_code;
          let flagUrl = `https://www.countryflagicons.com/FLAT/64/${countryCode}.png`;
          return(
            
            card.iata_code ? ( 
              <Link href={`/airports/${card.iata_code}`}>
              <div key={index} className="shadow-lg rounded-lg transform transition duration-500 hover:scale-110">
                {/*<Image className="rounded-t-lg" src={flagUrl} width={width} height={height} alt="" />*/}
                <div className="p-5">
                  <div className="flex flex-row items-center gap-3">
                    <Image className="rounded-t-lg" src={flagUrl} width={64} height={64} alt="" />
                    <h3 className="text-3xl font-bold text-slate-700 mb-3">
                      {card.iata_code}
                    </h3>
                  </div>
                  <p className="text-lg font-normal text-gray-600">{card.name}</p>
                </div>
              </div>
            </Link>
            ) : (
              null
            )
          )
        })}
      </div>

      <div className="flex items-center justify-center">
        <button 
          className="bg-blue-700 hover:bg-blue-800 px-10 w-full lg:max-w-[350px] h-14 rounded-xl flex justify-center items-center text-white text-xl mt-6"
          onClick={() => loadMore()}
        >
            Load More
        </button>
      </div>
    </div>
  );
};

export default AirportCard;
