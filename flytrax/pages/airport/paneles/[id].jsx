import React from 'react'
import { useRouter } from 'next/router';
import { PanelesCard } from '../../../components';

const PanelDetails = () => {
  
    return (
        <div className='max-w-[1400px] m-auto w-full my-24'>
            <h1 className="text-xl text-center mb-4 font-semibold text-black">Aeropuerto X</h1>
            <h3 className="text-xl text-center mb-4 font-semibold text-black">Salidas</h3>
            <PanelesCard />
        </div>

    )
}

export default PanelDetails