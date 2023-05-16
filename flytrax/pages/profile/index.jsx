/*
  File's name: /profile/index.jsx
  Authors: Paul Huszak & Guillermo Cánovas 
  Date: 16/05/2023
*/

import React, { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useSession, signIn, signOut } from "next-auth/react";
import NotFound from "../404";
import PersonIcon from "@mui/icons-material/Person";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import PhoneIcon from "@mui/icons-material/Phone";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PublicIcon from "@mui/icons-material/Public";
import KeyIcon from "@mui/icons-material/Key";
import axios from "axios";
import { useRouter } from "next/router";
import { getCookie, deleteCookie } from "cookies-next";
import Image from "next/image";
import Loader from "../../components/Loader";

// URLs para manejo de datos en la BD
const getUserURL = process.env.NEXT_PUBLIC_BACKEND_URL + "usersByEmail/";

const theme = createTheme({
  typography: {
    fontFamily: [
      '"SF Pro Display Regular"',
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});

const Profile = () => {
  // Manejo de sesión y redirección
  const { data: session } = useSession();
  const router = useRouter();
  const USER_COOKIE = getCookie("sessionToken");
  const ADMIN_COOKIE = getCookie("adminSessionToken");
  const USER_EMAIL = getCookie("userEmail");

  // Variables de estado
  const [nickName, setNickName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState(
    !session ? USER_EMAIL : session.user.email
  );
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");
  const [countryName, setCountryName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [userSession, setUserSession] = useState(USER_COOKIE);
  const [adminSession, setAdminSession] = useState(ADMIN_COOKIE);
  const [loading, setLoading] = useState(true);

  // Función de cierre de sesión
  const handleLogout = () => {
    if (session) {
      // Borrar sesión previa
      deleteCookie("adminToken");
      deleteCookie("sessionToken");
      deleteCookie("userEmail");
      signOut({ callbackUrl: "/login" });
    } else {
      // Borrar sesión previa
      deleteCookie("adminToken");
      deleteCookie("sessionToken");
      deleteCookie("userEmail");
      // Redirigir a la página de inicio
      router.push("/login");
    }
  };

  useEffect(() => {
    // Fetch user cookie value
    const userSessionCookie = getCookie("sessionToken");
    // Update state with user cookie value
    setUserSession(userSessionCookie);

    const checkCountry = async () => {
      let paises = [];

      await fetch("/assets/data/countries.json")
        .then((response) => response.json())
        .then((data) => {
          // Use the data from the JSON file
          paises.push(...data.countries);
          const countryFound = paises.find((elem) => elem.code === country);

          if (countryFound === undefined) {
            setCountryName(null);
          } else {
            setCountryName(countryFound.name);
          }
        })
        .catch((error) => console.error(error));
    };

    const getUser = async () => {
      await axios
        .get(getUserURL + email, {
          headers: {
            Authorization: `Bearer ${userSession}`,
          },
        })
        .then((response) => {
          setFirstName(response.data[0].name);
          setLastName(response.data[0].surname);
          setNickName(response.data[0].nickname);
          setBirthday(response.data[0].dateOfBirth);
          setGender(response.data[0].gender);
          setCountry(response.data[0].country);
          setPhone(response.data[0].phone);
          setPassword(response.data[0].password);
        })
        .catch((error) => {
          console.log("Error fetching the data: ", error);
        });
      setTimeout(() => setLoading(false), 1000);
    };

    getUser();
    checkCountry();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userSession, setUserSession, adminSession, setAdminSession, country]);

  return !loading ? (
    session || userSession ? (
      <ThemeProvider theme={theme}>
        <div className="App-header justify-center select-none">
          <h1
            className="text-center text-4xl
        pt-32 pb-5 font-bold text-slate-900 w-full"
          >
            Bienvenido,
            <br />{" "}
            <span className="text-center text-3xl font-bold login-text">
              {session ? session.user.name : firstName + " " + lastName}
            </span>{" "}
          </h1>
          <div className="flex align-middle items-center rounded-full relative text-center py-3">
            <Image
              src={
                session
                  ? session.user.image
                  : gender === "M"
                  ? "/assets/icons/male_icon.svg"
                  : gender === "F"
                  ? "/assets/icons/female_icon.svg"
                  : gender === "NB"
                  ? "/assets/icons/nb_icon,svg"
                  : "/assets/icons/na_icon.svg"
              }
              alt="User Image"
              width={100}
              height={100}
              className="relative mx-auto rounded-full shadow-md border-4"
            />
          </div>
          <div className="grid lg:grid-cols-2 gap-3 my-10">
            <div className="grid col-span-1 gap-3 lg:w-96">
              <div className="grid grid-cols-10 items-center text-center gap-1">
                <div className="grid place-items-center col-span-1 bg-slate-600 shadow-sm shadow-slate-400 rounded-t-md h-full">
                  <PersonIcon sx={{ color: "white" }} />
                </div>
                <div className="flex align-middle items-center p-3 text-md backdrop-blur-sm bg-opacity-50 italic border-b-2 border-slate-600 rounded-t-md bg-slate-50 justify-start w-full h-full col-span-9">
                  {firstName}
                </div>
              </div>
            </div>
            <div className="grid col-span-1 gap-3 lg:w-96">
              <div className="grid grid-cols-10 items-center text-center gap-1">
                <div className="grid place-items-center col-span-1 bg-slate-600 shadow-sm shadow-slate-400 rounded-t-md h-full">
                  <PersonIcon sx={{ color: "white" }} />
                </div>
                <div className="flex align-middle items-center p-3 text-md backdrop-blur-sm bg-opacity-50 italic border-b-2 border-slate-600 rounded-t-md bg-slate-50 justify-start w-full h-full col-span-9">
                  {lastName}
                </div>
              </div>
            </div>
            <div className="grid col-span-1 gap-3 lg:w-96">
              <div className="grid grid-cols-10 items-center text-center gap-1">
                <div className="grid place-items-center col-span-1 bg-slate-600 shadow-sm shadow-slate-400 rounded-t-md h-full">
                  <PersonOutlineIcon sx={{ color: "white" }} />
                </div>
                <div className="flex align-middle items-center p-3 text-md backdrop-blur-sm bg-opacity-50 italic border-b-2 border-slate-600 rounded-t-md bg-slate-50 justify-start w-full h-full col-span-9">
                  {nickName}
                </div>
              </div>
            </div>
            <div className="grid col-span-1 gap-3 lg:w-96">
              <div className="grid grid-cols-10 items-center text-center gap-1">
                <div className="grid place-items-center col-span-1 bg-slate-600 shadow-sm shadow-slate-400 rounded-t-md h-full">
                  <AlternateEmailIcon sx={{ color: "white" }} />
                </div>
                <div className="flex align-middle items-center p-3 text-md backdrop-blur-sm bg-opacity-50 italic border-b-2 border-slate-600 rounded-t-md bg-slate-50 justify-start w-full h-full col-span-9">
                  {email}
                </div>
              </div>
            </div>
            <div className="grid col-span-1 gap-3 lg:w-96">
              <div className="grid grid-cols-10 items-center text-center gap-1">
                <div className="grid place-items-center col-span-1 bg-slate-600 shadow-sm shadow-slate-400 rounded-t-md h-full">
                  <CalendarMonthIcon sx={{ color: "white" }} />
                </div>
                <div className="flex align-middle items-center p-3 text-md backdrop-blur-sm bg-opacity-50 italic border-b-2 border-slate-600 rounded-t-md bg-slate-50 justify-start w-full h-full col-span-9">
                  {birthday}
                </div>
              </div>
            </div>
            <div className="grid col-span-1 gap-3 lg:w-96">
              <div className="grid grid-cols-10 items-center text-center gap-1">
                <div className="grid place-items-center col-span-1 bg-slate-600 shadow-sm shadow-slate-400 rounded-t-md h-full">
                  <PhoneIcon sx={{ color: "white" }} />
                </div>
                <div className="flex align-middle items-center p-3 text-md backdrop-blur-sm bg-opacity-50 italic border-b-2 border-slate-600 rounded-t-md bg-slate-50 justify-start w-full h-full col-span-9">
                  {phone}
                </div>
              </div>
            </div>
            <div className="grid col-span-1 gap-3 lg:w-96">
              <div className="grid grid-cols-10 items-center text-center gap-1">
                <div className="grid place-items-center col-span-1 bg-slate-600 shadow-sm shadow-slate-400 rounded-t-md h-full">
                  <PublicIcon sx={{ color: "white" }} />
                </div>
                <div className="flex align-middle items-center p-3 text-md backdrop-blur-sm bg-opacity-50 italic border-b-2 border-slate-600 rounded-t-md bg-slate-50 justify-start w-full h-full col-span-9">
                  {countryName}
                </div>
              </div>
            </div>
            <div className="grid col-span-1 gap-3 lg:w-96">
              <div className="grid grid-cols-10 items-center text-center gap-1">
                <div className="grid place-items-center col-span-1 bg-slate-600 shadow-sm shadow-slate-400 rounded-t-md h-full">
                  <KeyIcon sx={{ color: "white" }} />
                </div>
                <div className="flex align-middle items-center p-3 text-md backdrop-blur-sm bg-opacity-50 italic border-b-2 border-slate-600 rounded-t-md bg-slate-50 justify-start w-full h-full col-span-9">
                  *********
                </div>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="md:col-span-2 w-80 mt-3 md:w-96 md:mx-auto bg-rose-600 text-slate-50 uppercase rounded-xl hover:bg-rose-800 ease-in-out duration-150 shadow-md h-10"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </ThemeProvider>
    ) : (
      <NotFound />
    )
  ) : (
    <Loader value={"perfil"} />
  );
};

export default Profile;
