import React from 'react'
import { useRouter } from 'next/router';

const AirportDetails = () => {

  const router = useRouter();
  const { id } = router.query;
  console.log("airportId es: " + id)

  return (
    <div className='max-w-[1400px] m-auto w-full my-24'>Página para el aeropuerto X</div>
  )
}

export default AirportDetails