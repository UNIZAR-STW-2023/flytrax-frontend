import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { cardsData } from '../assets/dummy/dummyData'
import cardImage from '../assets/dummy/images/3.jpg'

const AirportCard = () => {
  return (
    <div className='container mx-auto px-8'>
      <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6'>
        {cardsData.map((card) => (
          <div className='shadow-lg rounded-lg'>
            <Image className='rounded-t-lg' src={cardImage} alt="" />
            <div className='p-5'>
              <h3 className='text-3xl font-bold text-slate-700 mb-3'>{card.title}</h3>
              <p className='text-lg font-normal text-gray-600'>{card.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AirportCard