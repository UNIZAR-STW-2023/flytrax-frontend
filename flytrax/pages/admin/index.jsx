import React, { useState, useEffect } from "react";
import { getCookie } from "cookies-next";
import BarChart from "../../components/charts/BarChart";
import axios from "axios";
import Loader from "../../components/Loader";
import DoughnutChart from "../../components/charts/Doughnut";
import RegisteredLastWeek from "../../components/charts/RegisteredLastWeek";
import TopThreeCountries from "../../components/charts/TopThreeCountries";
import PieChart from "../../components/charts/PieChart";
import UserMgmt from "../../components/charts/UserMgmt";

const Dashboard = () => {
  const ADMIN_COOKIE = getCookie("adminSessionToken");
  const usersURL = "https://flytrax-backend.vercel.app/users";
  const usersByGenderURL = "https://flytrax-backend.vercel.app/getUsersByGenre";
  const usersBannedURL = "https://flytrax-backend.vercel.app/getUsersBanned";
  const usersBannedByGenderURL =
    "https://flytrax-backend.vercel.app/getUsersBannedByGenre";
  const usersByAgeRangeURL =
    "https://flytrax-backend.vercel.app/getUsersByAgeRange";
  const usersByCountryURL =
    "https://flytrax-backend.vercel.app/getUsersByCountry";
  const usersRegisteredByPeriodURL =
    "https://flytrax-backend.vercel.app/getUsersRegisteredByPeriod";

  const [adminToken, setAdminToken] = useState(ADMIN_COOKIE);
  const [users, setUsers] = useState([]);
  const [usersByGender, setUsersByGender] = useState([]);
  const [usersBanned, setUsersBanned] = useState([]);
  const [usersBannedByGender, setUsersBannedByGender] = useState([]);
  const [usersByAgeRange, setUsersByAgeRange] = useState([]);
  const [usersByCountry, setUsersByCountry] = useState([]);
  const [usersRegisteredByPeriod, setUsersRegisteredByPeriod] = useState([]);
  const [loading, setLoading] = useState(true);

  const getUsers = async () => {
    await axios
      .get(usersURL, {
        headers: { Authorization: `Bearer ${adminToken}` },
      })
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log("Error fetching the data: ", error);
      });
  };

  const getUsersByGender = async () => {
    await axios
      .get(usersByGenderURL, {
        headers: { Authorization: `Bearer ${adminToken}` },
      })
      .then((response) => {
        setUsersByGender(response.data);
      })
      .catch((error) => {
        console.log("Error fetching the data: ", error);
      });
  };

  const getUsersBanned = async () => {
    await axios
      .get(usersBannedURL, {
        headers: { Authorization: `Bearer ${adminToken}` },
      })
      .then((response) => {
        setUsersBanned(response.data);
      })
      .catch((error) => {
        console.log("Error fetching the data: ", error);
      });
  };

  const getUsersBannedByGender = async () => {
    await axios
      .get(usersBannedByGenderURL, {
        headers: { Authorization: `Bearer ${adminToken}` },
      })
      .then((response) => {
        setUsersBannedByGender(response.data);
      })
      .catch((error) => {
        console.log("Error fetching the data: ", error);
      });
  };

  const getUsersByAgeRange = async () => {
    await axios
      .get(usersByAgeRangeURL, {
        headers: { Authorization: `Bearer ${adminToken}` },
      })
      .then((response) => {
        setUsersByAgeRange(response.data.ageData);
      })
      .catch((error) => {
        console.log("Error fetching the data: ", error);
      });
  };

  const getUsersByCountry = async () => {
    await axios
      .get(usersByCountryURL, {
        headers: { Authorization: `Bearer ${adminToken}` },
      })
      .then((response) => {
        setUsersByCountry(response.data);
      })
      .catch((error) => {
        console.log("Error fetching the data: ", error);
      });
  };

  const getUsersRegisteredByPeriod = async () => {
    await axios
      .get(usersRegisteredByPeriodURL, {
        headers: { Authorization: `Bearer ${adminToken}` },
      })
      .then((response) => {
        setUsersRegisteredByPeriod(response.data);
      })
      .catch((error) => {
        console.log("Error fetching the data: ", error);
      });
  };

  useEffect(() => {
    // Fetch user cookie value
    const adminSessionCookie = getCookie("adminSessionToken");
    // Update state with user cookie value
    setAdminToken(adminSessionCookie);

    getUsers();
    getUsersByGender();
    getUsersBanned();
    getUsersBannedByGender();
    getUsersByAgeRange();
    getUsersByCountry();
    getUsersRegisteredByPeriod();

    setTimeout(() => setLoading(false), 1500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adminToken, setAdminToken]);

  return !loading ? (
    <div className="flex flex-col justify-center items-center align-middle m-auto w-11/12 max-sm:w-10/12 my-24 select-none">
      <h1 className="sm:flex items-center align-center gap-2 my-10 text-black text-center justify-center font-bold max-sm:text-3xl sm:text-4xl">
        Panel de administración
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 w-full lg:gap-5">
        <div className="col-span-1">
          <UserMgmt array={usersBanned} />
          <RegisteredLastWeek
            array={usersRegisteredByPeriod}
            arrayUsers={users}
          />
          <TopThreeCountries array={usersByCountry} />
        </div>
        <div className="col-span-2">
          <BarChart array={usersByAgeRange} />
          <PieChart array={usersBanned} />
          <DoughnutChart array={usersBannedByGender} />
        </div>
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default Dashboard;
