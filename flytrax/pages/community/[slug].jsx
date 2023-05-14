import React, { useEffect, useState } from 'react'
import { ForoFeed, ForoForm } from '../../components'
import { useRouter } from 'next/router'
import ClipLoader from "react-spinners/ClipLoader";
import NotFound from "../404";
import Loader from '../../components';
import axios from "axios";
import { aeropuertos } from "../../assets/dummy/aeropuertos_iata";
import { getCookie } from "cookies-next";
import ForoItem from "../../components/foro/ForoItem";


const CommunityDetails = () => {
    const router = useRouter()
    const { slug } = router.query

    const [airports, setAirports] = useState([]);
    const [actualAirport, setActualAirport] = useState(null);
    const [loading, setIsLoading] = useState(true);
    const [topicsByIata, setTopicsByIata] = useState([]);
    const [backURL, setBackURL] = useState("")

    // Cookie de la sesión
    const USER_EMAIL = getCookie("userEmail");
    const BEARER_TOKEN = getCookie("sessionToken");

    const loadMore = () => {
        getTopicsByIata()
        setnoOfElement(noOfElement + noOfElement)
    }

    const [noOfElement, setnoOfElement] = useState(5);
    const slice = topicsByIata.slice(0, noOfElement)

    const getTopicsByIata = async () => {
        await axios.get(backURL, {
            headers: {
                'Authorization': `Bearer ${BEARER_TOKEN}`,
            }
        }
            ).then((res) => {
            if (res.status === 200) {
                console.log("Topics by IATA code retrieved");
                setTopicsByIata(res.data); 
            } else {
                console.log("Error retrieving topics by IATA code");
            }
        })
    };

    useEffect(() => {

        if (!router.isReady) return;
        setBackURL(`https://flytrax-backend.vercel.app/getTopicsByIata/${slug}`)
        aeropuertos.map(function (item) {
            if (item.iata_code === slug) {
                setActualAirport(item.iata_code);
                setIsLoading(false);
            }
        })

        setIsLoading(false);

        if (actualAirport != null && actualAirport != undefined) {
            getTopicsByIata();
        }

        console.log('Topics by IATA: ', topicsByIata)

    }, [router.query.slug, router.isReady, actualAirport, setActualAirport]);


    return (

        actualAirport != null || actualAirport != undefined ? (
            <div className="max-w-[1400px] m-auto w-11/12 my-24">
                <div className="flex flex-col justify-center items-center align-middle m-auto w-10/12 mt-24 -mb-6 select-none">
                    <h1 className="sm:flex items-center align-center gap-2 my-10 text-black text-center justify-center font-bold max-sm:text-3xl sm:text-4xl">
                        Foro del aeropuerto
                        <h2 className="flex items-center align-middle justify-center">
                            <h3 className="max-sm:w-fit max-sm:self-center border-2 border-gray-500 rounded-lg text-gray-500 text-2xl px-1 mx-2 font-normal">
                                {slug}
                            </h3>
                        </h2>
                    </h1>
                </div>

                <ForoForm isTopic={"True"} iata_code={slug} getTopicsByIata={getTopicsByIata} />

                <div>
                    {slice.map((post, index) => (
                        <ForoItem key={index} data={post} iata={slug} />
                    ))}
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
            <>
                {!loading ? (
                <div className="flex items-center justify-center">
                    <NotFound />
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
                )}
            </>   
        )
    )
}

export default CommunityDetails