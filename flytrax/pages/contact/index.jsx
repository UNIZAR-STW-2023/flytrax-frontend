/*
  File's name: /contact/index.jsx
  Authors: Paul Huszak & Guillermo Cánovas 
  Date: 16/05/2023
*/

import React, { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Alert, Snackbar } from "@mui/material";
import TextField from "@mui/material/TextField";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import { useRouter } from "next/router";
import { Message } from "@mui/icons-material";
import Link from "next/link";

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

const Contact = () => {
  // Variables de estado
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

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

  // Función para gestionar tecla pulsada
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleForgot();
    } else {
      return;
    }
  };

  // Función de inicio de sesión
  const handleContact = () => {
    // Comprobar si hay campos vacíos
    if (email === "" || message === "") {
      setShowEmptyAlert(true);
    } else {
      setShowSuccessAlert(true);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="App-header justify-center select-none pt-24">
        <h1
          className="text-4xl max-sm:text-3xl font-bold text-slate-900
        my-5"
        >
          Contacta con nosotros
        </h1>
        <div className="w-80 md:w-96">
          <p className="mb-5 text-justify text-gray-600 sm:mt-4 sm:text-xl font-light">
            <span className="font-medium text-red-600">
              ¿Tienes alguna duda o sugerencia?
            </span>{" "}
            <br className="inline" />
            ¡No te preocupes! Aquí podrás resolverla. Simplemente introduce tu
            correo electrónico al que contestarte y el mensaje que quieres
            enviarnos.
          </p>
        </div>
        <form className="grid gap-3" onSubmit={handleContact}>
          <div className="grid grid-cols-10 items-center text-center gap-1">
            <div className="grid place-items-center col-span-1 bg-slate-600 shadow-sm shadow-slate-400 rounded-t-md h-full">
              <AlternateEmailIcon sx={{ color: "white" }} />
            </div>
            <TextField
              onKeyDown={handleKeyDown}
              className="col-span-9"
              id="filled-email"
              type="text"
              label="Correo electrónico"
              placeholder="Introduce tu correo electrónico"
              variant="filled"
              onChange={({ target }) => setEmail(target.value)}
            />
          </div>
          <div className="grid grid-cols-10 items-center text-center gap-1 h-[150px]">
            <div className="grid place-items-center col-span-1 bg-slate-600 shadow-sm shadow-slate-400 rounded-t-md h-full">
              <Message sx={{ color: "white" }} />
            </div>
            <TextField
              style={{ height: "100%" }}
              multiline
              rows={5}
              onKeyDown={handleKeyDown}
              className="col-span-9"
              id="filled-message"
              type="text"
              label="Mensaje"
              placeholder="Introduce tu correo electrónico"
              variant="filled"
              onChange={({ target }) => setMessage(target.value)}
            />
          </div>
          <button
            type="submit"
            onClick={handleContact}
            className="bg-rose-600 text-slate-50 uppercase rounded-xl hover:bg-rose-800 ease-in-out duration-150 shadow-md h-10"
          >
            Enviar
          </button>
          <div className="grid items-center w-80 md:w-96">
            <p className="text-center text-zinc-700">
              <Link
                className="font-medium text-rose-600 hover:text-rose-800 ease-in duration-150"
                href="/"
              >
                Volver
              </Link>{" "}
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
        </form>
      </div>
    </ThemeProvider>
  );
};

export default Contact;
