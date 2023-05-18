/*
  File's name: CommunityCard.jsx
  Authors: Paul Huszak & Guillermo Cánovas 
  Date: 16/05/2023
*/

import React, { useState } from "react";
import Link from "next/link";
import { Add, KeyboardDoubleArrowUp } from "@mui/icons-material";

const CommunityCard = ({ aeropuertos, query }) => {
  const [noOfElement, setnoOfElement] = useState(16);
  const slice = aeropuertos
    .filter((airport) => {
      if (query === "") {
        return airport;
      } else if (
        airport.name.toLowerCase().includes(query.toLowerCase()) ||
        airport.iata_code.toLowerCase().includes(query.toLowerCase())
      ) {
        return airport;
      }
    })
    .slice(0, noOfElement);

  const loadMore = () => {
    setnoOfElement(noOfElement + noOfElement);
  };

  const scrollToTop = () => {
    const element = document.getElementById("list-top");
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };

  return (
    <div className="container mx-auto max-sm:mt-12 mt-8 h-full">
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1  gap-6">
        {slice.map((airport, index) => (
          <Link key={index} href={`/community/${airport.iata_code}`}>
            <div className="border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-200 transition bg-neutral-100 text-black shadow-lg transform duration-200 hover:scale-105 rounded-lg relative my-1">
              <div className="flex flex-col items-start justify-start align-middle gap-3">
                <div className="flex flex-col items-start justify-center align-middle w-full gap-3 overflow-hidden truncate text-ellipsis">
                  <h3 className="max-sm:w-fit border-4 border-amber-700 rounded-lg text-amber-700 text-2xl px-1 font-semibold">
                    {airport.iata_code}
                  </h3>
                  <p className="font-light text-left text-md w-full truncate text-ellipsis overflow-hidden">
                    {airport.name}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {slice.length >= 16 ? (
        <div className="flex mt-12">
          <button
            data-test="more-button"
            type="button"
            className="flex pl-10  align-middle items-center w-full justify-center py-4 text-xl uppercase font-bold text-slate-800 hover:text-cyan-600 transition ease-in-out duration-200"
            onClick={loadMore}
          >
            <Add /> <h2>Ver más</h2>
          </button>
          <button
            data-test="more-button"
            type="button"
            className="flex px-3 sm:px-5 align-middle items-center w-fit justify-center py-4 text-xl uppercase font-bold text-slate-800 hover:text-cyan-600 transition ease-in-out duration-200"
            onClick={scrollToTop}
          >
            <KeyboardDoubleArrowUp />
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default CommunityCard;
