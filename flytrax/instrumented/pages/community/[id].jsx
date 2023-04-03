import React from 'react'
import { ForoFeed, ForoForm } from '../../components'

const CommunityDetails = () => {
  return (
    <div>
      <h3 className='text-3xl font-bold mb-3 text-black'>Foro del aeropuerto X</h3>
      <ForoForm />
      <ForoFeed />
    </div>
  )
}

export default CommunityDetails