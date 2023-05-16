/*
  File's name: /who-we-are/index.jsx
  Authors: Paul Huszak & Guillermo Cánovas 
  Date: 16/05/2023
*/

import React, { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Alert, Snackbar } from "@mui/material";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import PaulAvatar from "../../assets/images/huszak_avatar.png";
import SergioAvatar from "../../assets/images/sergio_avatar.png";
import WillyAvatar from "../../assets/images/willy_avatar.png";
import BernalAvatar from "../../assets/images/bernal_avatar.png";

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

const WhoWeAre = () => {
  const router = useRouter();

  // Alerta de error
  const [showEmptyAlert, setShowEmptyAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  // Cerrar alerta
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowEmptyAlert(false);
    setShowErrorAlert(false);
    setShowSuccessAlert(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="App-header justify-center h-full select-none pt-24">
        <div
          className="text-4xl max-sm:text-3xl font-bold text-slate-900
        my-10"
        >
          Conoce al equipo de{" "}
          <h2 className="text-center text-4xl font-bold home-text uppercase italic">
            Flytrax
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 w-11/12 h-2/3 xl:w-2/3">
          <div className="flex flex-col col-span-1 gap-5">
            <div className="flex flex-row gap-3 align-middle p-5 justify-start hover:scale-105 transform transition ease-in-out duration-200 border-[3px] rounded-3xl shadow-xl bg-slate-400 backdrop-blur-sm bg-opacity-50 w-full h-1/2">
              <Image
                className="shadow-md border-2 shadow-gray-500 bg-white rounded-full"
                src={PaulAvatar}
                alt="Paul Huszak Image"
                width={150}
                height={150}
              />
              <div className="w-full flex flex-col items-start align-top justify-between">
                <h1 className="max-sm:text-xl text-2xl px-1 font-bold">
                  Ioan Paul Huszak
                </h1>
                <h3 className="max-sm:text-sm px-1 text-md font-light italic">
                  Front-End Developer & Design Team Leader
                </h3>
                <div className="flex w-full flex-row items-center justify-start align-middle gap-3">
                  <Link
                    href="https://www.linkedin.com/in/paul-huszak-2ba25115a/"
                    target="_blank"
                  >
                    <Image
                      src="/assets/icons/icons8-linkedin.svg"
                      alt="Linkedin Icon"
                      width={40}
                      height={40}
                    />
                  </Link>
                  <Link href="https://github.com/paul-huszak" target="_blank">
                    <Image
                      src="/assets/icons/icons8-github.svg"
                      alt="GitHub Icon"
                      width={40}
                      height={40}
                    />
                  </Link>
                  <Link href="https://instagram.com/huszvk" target="_blank">
                    <Image
                      src="/assets/icons/icons8-instagram.svg"
                      alt="Instagram Icon"
                      width={40}
                      height={40}
                    />
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex flex-row gap-3 align-middle p-5 justify-start hover:scale-105 transform transition ease-in-out duration-200 border-[3px] rounded-3xl shadow-xl bg-slate-400 backdrop-blur-sm bg-opacity-50 w-full h-1/2">
              <Image
                className="shadow-md border-2 shadow-gray-500 bg-white rounded-full"
                src={WillyAvatar}
                alt="Guille Cánovas Image"
                width={150}
                height={150}
              />
              <div className="w-full flex flex-col items-start align-top justify-between">
                <h1 className="max-sm:text-xl text-2xl px-1 font-bold">
                  Guillermo Cánovas Gónzalez
                </h1>
                <h3 className="max-sm:text-sm px-1 text-md font-light italic">
                  Front-End Developer & Data Analyst
                </h3>
                <div className="flex w-full flex-row items-center justify-start align-middle gap-3">
                  <Link
                    href="https://www.linkedin.com/in/guillermo-c%C3%A1novas-gonz%C3%A1lez-96976a246/"
                    target="_blank"
                  >
                    <Image
                      src="/assets/icons/icons8-linkedin.svg"
                      alt="Linkedin Icon"
                      width={40}
                      height={40}
                    />
                  </Link>
                  <Link href="https://github.com/guillecanovas" target="_blank">
                    <Image
                      src="/assets/icons/icons8-github.svg"
                      alt="GitHub Icon"
                      width={40}
                      height={40}
                    />
                  </Link>
                  <Link href="https://instagram.com/leomessi" target="_blank">
                    <Image
                      src="/assets/icons/icons8-instagram.svg"
                      alt="Instagram Icon"
                      width={40}
                      height={40}
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col col-span-1 gap-5">
            <div className="flex flex-row gap-3 align-middle p-5 justify-start hover:scale-105 transform transition ease-in-out duration-200 border-[3px] rounded-3xl shadow-xl bg-slate-400 backdrop-blur-sm bg-opacity-50 w-full h-1/2">
              <Image
                className="shadow-md border-2 shadow-gray-500 bg-white rounded-full"
                src={SergioAvatar}
                alt="Sergio Hernández Image"
                width={150}
                height={150}
              />
              <div className="w-full flex flex-col items-start align-top justify-between">
                <h1 className="max-sm:text-xl text-2xl px-1 font-bold">
                  Sergio Hernández Julián
                </h1>
                <h3 className="max-sm:text-sm px-1 text-md font-light italic">
                  Back-End Developer & Data Analyst
                </h3>
                <div className="flex w-full flex-row items-center justify-start align-middle gap-3">
                  <Link
                    href="https://www.linkedin.com/in/sergio-hern%C3%A1ndez-juli%C3%A1n-723615183/"
                    target="_blank"
                  >
                    <Image
                      src="/assets/icons/icons8-linkedin.svg"
                      alt="Linkedin Icon"
                      width={40}
                      height={40}
                    />
                  </Link>
                  <Link href="https://github.com/SergioHer" target="_blank">
                    <Image
                      src="/assets/icons/icons8-github.svg"
                      alt="GitHub Icon"
                      width={40}
                      height={40}
                    />
                  </Link>
                  <Link
                    href="https://instagram.com/sergio_herzz"
                    target="_blank"
                  >
                    <Image
                      src="/assets/icons/icons8-instagram.svg"
                      alt="Instagram Icon"
                      width={40}
                      height={40}
                    />
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex flex-row gap-3 align-middle p-5 justify-start hover:scale-105 transform transition ease-in-out duration-200 border-[3px] rounded-3xl shadow-xl bg-slate-400 backdrop-blur-sm bg-opacity-50 w-full h-1/2">
              <Image
                className="shadow-md border-2 shadow-gray-500 bg-white rounded-full"
                src={BernalAvatar}
                alt="Jorge Bernal Image"
                width={150}
                height={150}
              />
              <div className="w-full flex flex-col items-start align-top justify-between">
                <h1 className="max-sm:text-xl text-2xl px-1 font-bold">
                  Jorge Bernal Romero
                </h1>
                <h3 className="max-sm:text-sm px-1 text-md font-light italic">
                  Back-End Developer & Cloud Engineer
                </h3>
                <div className="flex w-full flex-row items-center justify-start align-middle gap-3">
                  <Link
                    href="https://www.linkedin.com/in/jorge-bernal-romero-011005230/"
                    target="_blank"
                  >
                    <Image
                      src="/assets/icons/icons8-linkedin.svg"
                      alt="Linkedin Icon"
                      width={40}
                      height={40}
                    />
                  </Link>
                  <Link
                    href="https://github.com/JorgeBernalRomero"
                    target="_blank"
                  >
                    <Image
                      src="/assets/icons/icons8-github.svg"
                      alt="GitHub Icon"
                      width={40}
                      height={40}
                    />
                  </Link>
                  <Link
                    href="https://instagram.com/jorge_bernal77"
                    target="_blank"
                  >
                    <Image
                      src="/assets/icons/icons8-instagram.svg"
                      alt="Instagram Icon"
                      width={40}
                      height={40}
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid items-center w-80 md:w-96">
          <p className="text-center text-zinc-700 my-10">
            <button
              className="font-medium text-rose-600 hover:text-rose-800 ease-in duration-150"
              onClick={() => router.back()}
            >
              Volver
            </button>{" "}
          </p>
        </div>
        <div>
          <Snackbar
            message="No puedes dejar campos vacíos — comprueba los datos"
            open={showEmptyAlert}
            autoHideDuration={3000}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
          >
            <Alert onClose={handleClose} severity="error">
              No puedes dejar campos vacíos —{" "}
              <strong>comprueba los datos</strong>
            </Alert>
          </Snackbar>
          <Snackbar
            message="Error al procesar tu petición — comprueba los datos"
            open={showErrorAlert}
            autoHideDuration={3000}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
          >
            <Alert onClose={handleClose} severity="error">
              Error al procesar tu petición —{" "}
              <strong>comprueba los datos</strong>
            </Alert>
          </Snackbar>
          <Snackbar
            message="¡Éxito! Gracias por enviar tu mensaje."
            open={showSuccessAlert}
            autoHideDuration={3000}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
          >
            <Alert onClose={handleClose} severity="success">
              ¡Éxito! Gracias por enviar tu mensaje.
            </Alert>
          </Snackbar>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default WhoWeAre;
