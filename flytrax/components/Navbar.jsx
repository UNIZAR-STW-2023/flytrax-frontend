import React from 'react'
import Link from 'next/link'; 
import Logo from '../assets/images/logo_desktop.png'
import Image from 'next/image'

const Navbar = () => {
  return (
    <div className='flex justify-between relative my-3 mx-5 mb-4'>
      <Link href='/'>
        <Image src={Logo} className="w-40" alt='Flytrax Logo' />
      </Link>
      <div className='flex items-center gap-6'>
        <Link className="hover:text-violet-900" href='/login'>Iniciar sesión</Link>
        <Link className="bg-violet-700 hover:bg-violet-800 text-white px-4 py-3 rounded-lg transition" href='/register'>Registrarse</Link>
      </div>
    </div>
  )
}

export default Navbar