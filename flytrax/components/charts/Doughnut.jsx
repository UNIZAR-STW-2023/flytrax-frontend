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
import { Doughnut } from "react-chartjs-2";
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

const DoughnutChart = ({ array }) => {
  const [adminToken, setAdminToken] = useState("");
  const [usersBannedByGender, setUsersBannedByGender] = useState(array);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user cookie value
    const adminSessionCookie = getCookie("adminSessionToken");
    // Update state with user cookie value
    setAdminToken(adminSessionCookie);
    setUsersBannedByGender(array);

    setTimeout(() => setLoading(false), 1500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adminToken, setAdminToken, array]);

  const labels = ["Hombres", "Mujeres", "No binario", "No especificado"];

  const data = {
    labels,
    datasets: [
      {
        label: "(%)",
        data: [
          usersBannedByGender.male.toFixed(2),
          usersBannedByGender.female.toFixed(2),
          usersBannedByGender.nonbinary.toFixed(2),
          usersBannedByGender.nonespecificado.toFixed(2),
        ],
        backgroundColor: [
          "rgba(102, 188, 255, 0.5)",
          "rgba(255, 99, 132, 0.5)",
          "rgba(29, 126, 5, 0.5)",
          "rgba(127, 133, 135, 0.5)",
        ],
      },
    ],
  };

  return (
    <div className="flex flex-col shadow-md align-middle items-center justify-center w-full h-96 relative my-5 p-4 border rounded-lg bg-white">
      <div className="flex flex-col align-middle items-center justify-center w-full h-full">
        <div className="flex align-middle items-center justify-center w-full h-1/6 rounded-lg bg-slate-200">
          <h1 className="text-lg sm:text-2xl font-bold text-center uppercase">
            Ratio de bans por género
          </h1>
        </div>
        <div className="flex align-middle items-center justify-center w-full h-5/6">
          <Doughnut data={data} />
        </div>
      </div>
    </div>
  );
};

export default DoughnutChart;
