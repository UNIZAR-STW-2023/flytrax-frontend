import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { useRouter } from "next/router";
import { ForoItem, ForoForm, CommentFeed } from "../../../../components";
import { foroData } from "../../../../assets/dummy/dummyDatos";
import { useParams } from "react-router-dom";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useStateContext } from '../../../../context/StateContext';
import userLogo from '../../../../assets/images/user-logo.png'
import Image from 'next/image'
import CommentItem from "../../../../components/foro/comments/CommentItem";


const PostDetails = ({  }) => {
  const router = useRouter();
  
  const { postId, slug } = router.query;
  const { comentario, setRespuesta, respuesta } = useStateContext();

  const [fetchedPost, setFetchedPost] = useState(null);
  const [answersByTopic, setAnswersByTopic] = useState([]);
  const [backURL, setBackURL] = useState("")
  const [auxURL, setAuxURL] = useState("")
  const [isLoading, setIsLoading] = useState(true);
  const [topicsByIata, setTopicsByIata] = useState([]);
  const [actualPost, setActualPost] = useState([]);
  const [discusion, setDiscusion] = useState([]);
  const [value, setValue] = useState("")
  const [noOfElement, setnoOfElement] = useState(5);

  // Cookie de la sesión
  const USER_EMAIL = getCookie("userEmail");
  const BEARER_TOKEN = getCookie("sessionToken");

  const loadMore = () => {
      setnoOfElement(noOfElement + noOfElement)
  }

  const slice = respuesta.slice(0, noOfElement)

  const getAnswersByTopic = async () => {
    await axios.get(backURL, {
        headers: {
            'Authorization': `Bearer ${BEARER_TOKEN}`,
        }
    }).then((res) => {
        if (res.status === 200) {
          if (Array.isArray(res.data)) {
            console.log("Answers by Topic code retrieved");
            setAnswersByTopic(res.data);
            setRespuesta(res.data);
          } 
        } else {
            console.log("Error retrieving answers by Topic code");
        }
    })
  };

  const buscarPorId = (array, id) => {
    return array.find(elemento => elemento._id === id);
  };

  const getTopicsByIata = async () => {
    await axios.get(auxURL, {
        headers: {
            'Authorization': `Bearer ${BEARER_TOKEN}`,
        }
    }
        ).then((res) => {
        if (res.status === 200) {
          if (Array.isArray(res.data)) {
            console.log("Topics by IATA code retrieved");
            const elementoEncontrado = buscarPorId(res.data, postId);
            setDiscusion(elementoEncontrado);
          }
        } else {
            console.log("Error retrieving topics by IATA code");
        }
    })
};

  useEffect(() => {
    if (!router.isReady) return;
    setBackURL(`https://flytrax-backend.vercel.app/getAnswersByTopic/${postId}`)
    setActualPost(postId)
    setAuxURL(`https://flytrax-backend.vercel.app/getTopicsByIata/${slug}`)
    setIsLoading(false);
  
    getAnswersByTopic();
    getTopicsByIata();
    setIsLoading(false);
  }, [router.query.postId, router.query.slug, router.isReady, actualPost, setActualPost, backURL, setBackURL]);

  
  return (
    <>
  
        { actualPost.length == 0 ? (
          
          <div className="max-w-[1400px] m-auto w-full my-24">
            <div className="flex justify-center items-center h-full">
              <ClipLoader color="lightblue" size={80} />
            </div>
          </div>

        ) : (
          <div className="max-w-[1400px] m-auto w-full my-24">

            <h3 className='text-3xl font-bold mb-3 opacity-0'>Foro del aeropuerto </h3>
                  
            <h1 className="text-4xl text-center font-semibold mb-3">
                <span className="text-black">Hilo de mensajes </span> 
            </h1>

            <div className= "border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-100 transition shadow-lg rounded-lg transform duration-500 relative my-2">
              <div className="flex flex-row items-start gap-3 mb-5">
                <div>
                  <Image className='rounded-full h-12 w-12' src={userLogo} alt="" />
                </div>
                <div className='text-black'>
                  <div className="flex flex-row items-center gap-2">
                    <p className="font-semibold cursor-pointer"> {discusion.email} </p>
                    <span className="text-sm"> {discusion.date} </span>
                  </div>
                  <div className="mt-1"> {discusion.description} </div>
                </div>
              </div>
            </div>

            <ForoForm isTopic={"False"} topic={postId} getAnswersByTopic={getAnswersByTopic} />

            <div>
              {slice.map((resp, index) => (
                <CommentItem 
                  key={index} 
                  data={resp} 
                />
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
        )}

        
      
    </>
  );
};

export default PostDetails;
