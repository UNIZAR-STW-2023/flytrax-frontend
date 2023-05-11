import React, { useState } from 'react'
import Link from 'next/link'

const CommunityCard = ({ aeropuertos }) => {

    const loadMore = () => {
        setnoOfElement(noOfElement + noOfElement)
    }
    
    const [noOfElement, setnoOfElement] = useState(24);
    const slice = aeropuertos.slice(0, noOfElement)

    return (
        <div className="container mx-auto px-8">
            <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1  gap-6">
                
                {slice.map((airport, index) => (
                    <Link href={`/community/${airport.iata_code}`}> 
                        <div key={index} className= "border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-200 transition bg-neutral-100 text-black shadow-lg  hover:scale-110 rounded-lg transform duration-500 relative my-1">
                            <div className="flex flex-row items-start gap-3">
                                <div className="flex flex-row items-start gap-3">
                                    <p className="font-semibold cursor-pointer hover:underline"> {airport.iata_code} </p>
                                </div>
                            </div>
                        </div>
                    </Link>
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
    )
}

export default CommunityCard