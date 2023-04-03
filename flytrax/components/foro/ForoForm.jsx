import React, { useState, useContext } from 'react'
import Image from 'next/image'
import userLogo from '../../assets/images/user-logo.png'
import Link from 'next/link'

const ForoForm = () => {

    const [body, setbBody] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const [currentUser, setCurrentUser] = useState(false)


    const onSubmit = () => {
        setIsLoading(true)
        console.log('body', body)
    }

    const handleLogin = () => {
        setCurrentUser(true)
    }

    return (
        <div className='border-b-[1px] border-neutral-800 px-5 py-2'>
            { currentUser ? (
                <div className='flex flex-row gap-4 mb-10'>
                    <div>
                        <Image className='rounded-full h-12 w-12' src={userLogo} alt="" />
                    </div>
                    <div className='w-full'>
                        <textarea
                            disabled={isLoading}
                            onChange={(e) => setbBody(e.target.value)}
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
                    <h1 className="text-xl text-center mb-4 font-semibold">Inicia sesión para comentar!</h1>
                    <div className="flex flex-row items-center justify-center gap-4">
                        <div className="hover:text-violet-900" onClick={handleLogin}>Iniciar sesión</div>
                        <Link className="bg-violet-700 hover:bg-violet-800 text-white px-4 py-3 rounded-lg transition" href='/register'>Registrarse</Link>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ForoForm