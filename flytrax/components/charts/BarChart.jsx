/*
  File's name: BarChart.jsx
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ array }) => {
  const [adminToken, setAdminToken] = useState("");
  const [usersByAgeRange, setUsersByAgeRange] = useState(array);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user cookie value
    const adminSessionCookie = getCookie("adminSessionToken");
    // Update state with user cookie value
    setAdminToken(adminSessionCookie);
    setUsersByAgeRange(array);

    setTimeout(() => setLoading(false), 1500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adminToken, setAdminToken, array]);

  const labels = [
    "<18 años",
    "18-24 años",
    "25-34 años",
    "35-44 años",
    "45-54 años",
    "55-64 años",
    ">64 años",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Número de usuarios",
        data: [
          usersByAgeRange["Menores de edad"].count,
          usersByAgeRange["18-24 años"].count,
          usersByAgeRange["25-34 años"].count,
          usersByAgeRange["35-44 años"].count,
          usersByAgeRange["45-54 años"].count,
          usersByAgeRange["55-64 años"].count,
          usersByAgeRange["Mayores de 64 años"].count,
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
    <div className="flex flex-col shadow-md align-middle items-center justify-center w-full h-96 relative my-5 p-4 border rounded-lg bg-white">
      <div className="flex flex-col align-middle items-center justify-center w-full h-full">
        <div className="flex align-middle items-center justify-center w-full h-1/6 rounded-lg bg-slate-200">
          <h1 className="text-lg sm:text-2xl font-bold text-center uppercase">
            Usuarios por rango de edad
          </h1>
        </div>
        <div className="flex align-middle items-center justify-center w-full h-5/6">
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default BarChart;
