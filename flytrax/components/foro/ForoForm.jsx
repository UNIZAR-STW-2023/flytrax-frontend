import React, { useState, useContext, useEffect } from 'react'
import Image from 'next/image'
import userLogo from '../../assets/images/user-logo.png'
import Link from 'next/link'
import axios from "axios";
import { getCookie } from "cookies-next";
import { useStateContext } from '../../context/StateContext';

const ForoForm = ( { iata_code, isTopic, topic, getAnswersByTopic, getTopicsByIata }) => {

    const [body, setBody] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [currentUser, setCurrentUser] = useState(false)

    const createTopicURL = `https://flytrax-backend.vercel.app/createTopics`
    const createAnswerURL = `https://flytrax-backend.vercel.app/createAnswers`
  
    const email = getCookie('userEmail')
    const BEARER_TOKEN = getCookie("sessionToken");

    const onSubmit = () => {
        setIsLoading(true)
        if(createPost()) {
            if(isTopic == "True"){
                getTopicsByIata()
                setBody('')
            } else {
                getAnswersByTopic()
                setBody('')
            }
        }
    }

    const createPost = async () => {

        if (isTopic == "True"){

            const data = {
                email : email,
                description : body,
                iata: iata_code,
                respuestas: [],
            }
        
            await axios
            .post(createTopicURL, data, {
                headers: {
                    'Authorization': `Bearer ${BEARER_TOKEN}`,
                }
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

        } else if(isTopic == "False"){
            const data = {
                email : email,
                topicId : topic,
                content : body,
            }
        
            await axios
            .post(createAnswerURL, data, {
                headers: {
                    'Authorization': `Bearer ${BEARER_TOKEN}`,
                }
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
        }

        else{
            return False
        }
    }
   

    return (
        <div className='border-b-[1px] border-neutral-800 px-5 py-2'>
            { BEARER_TOKEN !== undefined ? (
                <div className='flex flex-row gap-4 mt-1 mb-5 '>
                    <div>
                        <Image className='rounded-full h-12 w-12 mt-5' src={userLogo} alt="" />
                    </div>
                    <div className='w-full'>
                        <textarea
                            onChange={(e) => setBody(e.target.value)}
                            value={body}
                            className="disabled:opacity-80 rounded-xl px-4 py-2 peer resize-none mt-3 w-full ring-0 outline-none text-[18px] text-black"
                            placeholder="Escribe tu comentario..."
                        >
                        </textarea>
                        <hr className='peer-focus:opacity-100 h-[1px] w-full transition' />
                        <div className='mt-4 flex flex-row justify-end'>
                            <div 
                                className="bg-violet-700 hover:bg-violet-800 text-white px-4 py-2 rounded-lg transition"
                                onClick={onSubmit}
                            >
                                Publicar
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="py-8">
                    <h1 className="text-xl text-center mb-4 font-semibold text-black">Inicia sesión para comentar!</h1>
                    <div className="flex flex-row items-center justify-center gap-4">
                        <div className="hover:text-violet-900 text-black" href="/login">Iniciar sesión</div>
                        <Link className="bg-violet-700 hover:bg-violet-800 text-white px-4 py-3 rounded-lg transition" href='/register'>Registrarse</Link>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ForoForm