import React from 'react'
import { FaGithub } from 'react-icons/fa'
import Link from 'next/link'

const Footer = () => {
  return (
    <div className="text-center mt-5 px-8 py-3 flex-row gap-3 justify-center items-center">
      <p>2023 Flytrax ©</p>
      <p>All rights reserverd</p>
      <div className='flex items-center justify-center'>
        <Link href="https://github.com/UNIZAR-STW-2023" target="_blank">
            <FaGithub size={28}/>
        </Link>
      </div>
    </div>
  )
}

export default Footer