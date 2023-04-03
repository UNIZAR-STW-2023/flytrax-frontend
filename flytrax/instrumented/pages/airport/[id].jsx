import React from 'react'
import { useRouter } from 'next/router';

const AirportDetails = () => {

  const router = useRouter();
  const { id } = router.query;
  console.log("airportId es: " + id)

  return (
    <div>Página para el aeropuerto X</div>
  )
}

export default AirportDetails