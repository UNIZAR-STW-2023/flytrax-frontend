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

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const RegisteredLastWeek = ({ array, arrayUsers }) => {
  const [adminToken, setAdminToken] = useState("");
  const usersBannedByGenderURL =
    "https://flytrax-backend.vercel.app/getUsersBannedByGenre";

  const [users, setUsers] = useState(arrayUsers);
  const [lastWeek, setLastWeek] = useState();
  const [usersRegisteredByPeriod, setUsersRegisteredByPeriod] = useState(array);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user cookie value
    const adminSessionCookie = getCookie("adminSessionToken");
    // Update state with user cookie value
    setAdminToken(adminSessionCookie);
    setUsers(arrayUsers);
    setUsersRegisteredByPeriod(array);

    const weeksArray = Object.entries(usersRegisteredByPeriod);
    const lastItem = weeksArray[weeksArray.length - 1];

    setLastWeek(lastItem[1]);

    setTimeout(() => setLoading(false), 1500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adminToken, setAdminToken, array, arrayUsers]);

  return (
    <div className="flex flex-col shadow-md align-middle items-center justify-center w-full h-96 relative my-5 p-4 border rounded-lg bg-white">
      <div className="flex flex-col align-middle items-center justify-center w-full h-full">
        <div className="flex align-middle items-center justify-center w-full h-1/6 rounded-lg bg-slate-200">
          <h1 className="flex align-middle items-center justify-center text-lg sm:text-2xl font-bold text-center uppercase">
            Nuevos usuarios
          </h1>
        </div>
        <div className="flex flex-col align-middle items-center justify-center h-5/6">
          <h1 className="font-bold stats-text text-9xl text-center">
            {lastWeek}
          </h1>
          <div className="flex align-middle items-center justify-center">
            <ArrowOutwardIcon
              sx={{ color: "white", fontSize: 30, color: "green" }}
            />
            <h1 className="w-fit text-lg sm:text-xl font-semibold">
              {((lastWeek / users.length) * 100).toFixed(1)}%
            </h1>
            <h2 className="mx-2 uppercase text-gray-700 font-light text-md sm:text-xl italic">
              En la última semana
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisteredLastWeek;
