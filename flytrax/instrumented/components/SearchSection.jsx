import React, { useState, useEffect, useContext } from "react";
import {
  FaSearch,
  FaSearchLocation,
  FaMapMarkerAlt,
  FaAngleDown,
  FaAngleUp,
  FaPen,
} from "react-icons/fa";
import { Menu } from "@headlessui/react";
import { useStateContext } from "../context/StateContext";
import SearchBar from "./SearchBar";

const SearchSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { countries, airports, country, setCountry } = useStateContext();

  return (
    <div className="px-[30px] py-6 max-w-[1170px] mx-auto flex flex-col lg:flex-row justify-between gap-4 lg:gap-x-3 relative lg:-top-4 lg:shadow-lg bg-white lg:bg-transparent rounded-lg">
      {/* Airport by Country Searcher */}
      <Menu
        as="div"
        className="w-full lg:max-w-[296px] cursor-pointer relative"
      >
        <Menu.Button
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-[64px] items-center px-[18px] border rounded-lg w-full text-left"
        >
          <FaMapMarkerAlt className="text-2xl mr-[18px] text-violet-700" />
          <div>
            <div className="text-[15px] font-medium leading-tight text-black">
              {country}
            </div>
            <div className="text-[13px] text-black">Buscar por país</div>
          </div>
          {isOpen ? (
            <FaAngleDown className="text-2xl text-violet-700 ml-auto" />
          ) : (
            <FaAngleUp className="text-2xl text-violet-700 ml-auto" />
          )}
        </Menu.Button>

        {/* mapear los countries */}
        <Menu.Items className="px-6 py-8 text-[15px] space-y-6 shadow-md text-zinc-800 bg-white absolute w-full z-10 list-none rounded-b-lg">
          {countries.map((country, index) => {
            return (
              <Menu.Item
                onClick={() => setCountry(country)}
                className="cursor-pointer hover:text-violet-700 transition"
                as="li"
                key={index}
              >
                {country}
              </Menu.Item>
            );
          })}
        </Menu.Items>
      </Menu>

      {/* Airport by Name Searcher */}

      <SearchBar />

      {/* Search Button */}
      <button className="bg-violet-700 hover:bg-violet-800 transition w-full lg:max-w-[100px] h-16 rounded-lg flex justify-center items-center text-white text-lg">
        <FaSearch />
      </button>
    </div>
  );
};

export default SearchSection;
