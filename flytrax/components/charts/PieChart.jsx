/*
  File's name: PieChart.jsx
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
  ArcElement,
} from "chart.js";
import { Pie } from "react-chartjs-2";
import { getCookie } from "cookies-next";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const PieChart = ({ array }) => {
  const [adminToken, setAdminToken] = useState("");
  const [usersBanned, setUsersBanned] = useState(array);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user cookie value
    const adminSessionCookie = getCookie("adminSessionToken");
    // Update state with user cookie value
    setAdminToken(adminSessionCookie);
    setUsersBanned(array);

    setTimeout(() => setLoading(false), 1500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adminToken, setAdminToken, array]);

  const labels = ["Baneados", "No baneados"];

  const data = {
    labels,
    datasets: [
      {
        label: "(%)",
        data: [
          usersBanned.bannedPercentage.toFixed(2),
          usersBanned.unbannedPercentage.toFixed(2),
        ],
        backgroundColor: ["rgba(218, 21, 21, 0.5)", "rgba(21, 218, 67, 0.5)"],
      },
    ],
  };

  return (
    <div className="flex flex-col shadow-md align-middle items-center justify-center w-full h-96 relative my-5 p-4 border rounded-lg bg-white">
      <div className="flex flex-col align-middle items-center justify-center w-full h-full">
        <div className="flex align-middle items-center justify-center w-full h-1/6 rounded-lg bg-slate-200">
          <h1 className="text-lg sm:text-2xl font-bold text-center uppercase">
            Ratio de bans
          </h1>
        </div>
        <div className="flex align-middle items-center justify-center w-full h-5/6">
          <Pie data={data} />
        </div>
      </div>
    </div>
  );
};

export default PieChart;
