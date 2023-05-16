/*
  File's name: FlightsBarChart.jsx
  Authors: Paul Huszak & Guillermo Cánovas 
  Date: 16/05/2023
*/

import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { getCookie } from "cookies-next";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const FlightsBarChart = ({ airport }) => {
  const USER_COOKIE = getCookie("sessionToken");
  const [userToken, setUserToken] = useState(USER_COOKIE);
  const numFlightsURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}getFlightsEachDay/${airport}`;

  const [numFlights, setNumFlights] = useState([]);
  const [loading, setLoading] = useState(true);

  const getNumFlights = async () => {
    await axios
      .get(numFlightsURL, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((response) => {
        setNumFlights(response.data);
      })
      .catch((error) => {
        console.log("Error fetching the data: ", error);
      });
  };

  useEffect(() => {
    // Fetch user cookie value
    const userSessionCookie = getCookie("sessionToken");
    // Update state with user cookie value
    setUserToken(userSessionCookie);

    getNumFlights();
    setTimeout(() => setLoading(false), 1500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userToken, setUserToken]);

  const labels = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Número de vuelos",
        data: [
          numFlights.mon,
          numFlights.tue,
          numFlights.wed,
          numFlights.thu,
          numFlights.fri,
          numFlights.sat,
          numFlights.sun,
        ],
        backgroundColor: [
          "rgba(247, 191, 102, 0.5)",
          "rgba(89, 12, 34, 0.5)",
          "rgba(210, 31, 104, 0.5)",
          "rgba(43, 190, 78, 0.5)",
          "rgba(246, 76, 54, 0.5)",
          "rgba(32, 98, 178, 0.5)",
          "rgba(77, 224, 245, 0.5)",
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <div className="flex flex-col shadow-md align-middle items-center justify-center w-full h-full relative p-4 border rounded-lg bg-white">
      <div className="flex flex-col align-middle items-center justify-center w-full h-full">
        <div className="flex align-middle items-center justify-center w-full h-1/6 rounded-lg bg-slate-200">
          <h1 className="text-lg sm:text-2xl font-bold text-center uppercase">
            Número de vuelos por día
          </h1>
        </div>
        <div className="flex align-middle items-center justify-center w-full h-5/6">
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default FlightsBarChart;
