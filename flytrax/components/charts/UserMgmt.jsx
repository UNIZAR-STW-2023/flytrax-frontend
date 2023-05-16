/*
  File's name: UserMgmt.jsx
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
import { getCookie } from "cookies-next";
import UserIcon from "/assets/images/man.svg";
import Image from "next/image";
import Link from "next/link";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const UserMgmt = ({ array }) => {
  const [adminToken, setAdminToken] = useState("");
  const usersBannedByGenderURL =
    "https://flytrax-backend.vercel.app/getUsersBannedByGenre";

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
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <div className="flex flex-col shadow-md align-middle items-center justify-center w-full h-96 relative my-5 p-4 border rounded-lg bg-white hover:bg-indigo-500 transition ease-in-out duration-300">
      <div className="flex flex-col align-middle items-center justify-center w-full h-full">
        <div className="flex align-middle items-center justify-center w-full h-1/6 rounded-md bg-slate-200">
          <h1 className="text-lg sm:text-2xl font-bold text-center uppercase">
            Gestionar usuarios
          </h1>
        </div>
        <Link
          href="/admin/user-management"
          className="flex align-middle items-center justify-center w-full h-5/6"
        >
          <Image
            className="shadow-xl border-4 rounded-full"
            width={250}
            src={UserIcon}
            alt="User Icon"
          />
        </Link>
      </div>
    </div>
  );
};

export default UserMgmt;
