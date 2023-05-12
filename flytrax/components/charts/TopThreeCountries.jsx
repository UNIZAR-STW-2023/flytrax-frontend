import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { Bar, Doughnut } from "react-chartjs-2";
import { getCookie } from "cookies-next";
import axios from "axios";
import Image from "next/image";
import Loader from "../Loader";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const TopThreeCountries = ({ array }) => {
  const [adminToken, setAdminToken] = useState("");
  const usersByCountryURL =
    "https://flytrax-backend.vercel.app/getUsersByCountry";

  const [countries, setCountries] = useState([
    {
      code: "ES",
      name: "Spain",
    },
    {
      code: "US",
      name: "United States",
    },
    {
      code: "FR",
      name: "France",
    },
  ]);
  const [usersByCountry, setUsersByCountry] = useState(array);
  const [loading, setLoading] = useState(true);

  const getTop3Countries = async (usersByCountry) => {
    let paises = [];
    let countryObj = [];

    const top3Countries = Object.entries(usersByCountry)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);

    top3Countries.map((country) => {
      paises.push({ code: country[0], count: country[1] });
    });

    await fetch("/assets/data/countries.json")
      .then((response) => response.json())
      .then((data) => {
        countryObj = data.countries;
        const matching = countryObj.filter((o1) =>
          paises.some((o2) => o1.code === o2.code)
        );
        setCountries(matching);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    // Fetch user cookie value
    const adminSessionCookie = getCookie("adminSessionToken");
    // Update state with user cookie value
    setAdminToken(adminSessionCookie);
    setUsersByCountry(array);

    getTop3Countries(usersByCountry);
    setTimeout(() => setLoading(false), 1500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adminToken, setAdminToken, array]);

  return (
    <div className="flex flex-col shadow-md align-middle items-center justify-center w-full h-96 relative my-5 p-4 border rounded-lg bg-white">
      <div className="flex flex-col align-middle items-center justify-center w-full h-full">
        <div className="flex align-middle items-center justify-center w-full h-1/6 rounded-md bg-slate-200">
          <h1 className="flex align-middle items-center justify-center text-lg sm:text-2xl font-bold text-center uppercase">
            Top 3 países con más usuarios
          </h1>
        </div>
        <div className="flex flex-col mt-auto align-bottom items-center justify-center h-5/6">
          <div className="grid grid-cols-3 w-full">
            <div className="flex flex-col align-middle items-center justify-end w-20 md:w-40">
              <h1 className="font-bold silver-text text-7xl text-center">2</h1>
              <Image
                src={`https://flagcdn.com/40x30/${countries[1].code.toLowerCase()}.png`}
                srcSet={`https://flagcdn.com/80x60/${countries[1].code.toLowerCase()}.png 2x`}
                width="40"
                height="30"
                alt={countries[1].name}
              />
              <p className="text-center font-regular text-md w-full truncate text-ellipsis">
                {countries[1].name}
              </p>
            </div>
            <div className="flex flex-col items-center justify-end w-20 md:w-40">
              <h1 className="font-bold gold-text text-9xl text-center">1</h1>
              <Image
                src={`https://flagcdn.com/40x30/${countries[0].code.toLowerCase()}.png`}
                srcSet={`https://flagcdn.com/80x60/${countries[0].code.toLowerCase()}.png 2x`}
                width="40"
                height="30"
                alt={countries[0].name}
              />
              <p className="text-center font-regular text-md w-full truncate text-ellipsis">
                {countries[0].name}
              </p>
            </div>
            <div className="flex flex-col items-center justify-end w-20 md:w-40">
              <h1 className="font-bold bronze-text text-5xl text-center">3</h1>
              <Image
                src={`https://flagcdn.com/40x30/${countries[2].code.toLowerCase()}.png`}
                srcSet={`https://flagcdn.com/80x60/${countries[2].code.toLowerCase()}.png 2x`}
                width="40"
                height="30"
                alt={countries[2].name}
              />
              <p className="text-center font-regular text-md w-full truncate text-ellipsis">
                {countries[2].name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopThreeCountries;
