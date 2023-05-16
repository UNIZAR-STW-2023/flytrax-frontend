import React, { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Alert, Snackbar } from "@mui/material";
import Link from "next/link";
import TextField from "@mui/material/TextField";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import axios from "axios";
import { useRouter } from "next/router";

// URLs para manejo de datos en la BD
const resetPasswd_URL =
  "https://flytrax-backend.vercel.app/resetPasswordByEmail/";

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

const ForgotPasswd = () => {
  const router = useRouter();

  // Variables de estado
  const [email, setEmail] = useState("");

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
  const handleForgot = () => {
    // Comprobar si hay campos vacíos
    if (email === "") {
      setShowEmptyAlert(true);
    } else {
      sendEmail();
    }
  };

  // Función para enviar el correo de recuperación
  const sendEmail = async () => {
    await axios
      .post(resetPasswd_URL + email)
      .then((response) => {
        if (response.status === 200) {
          setShowSuccessAlert(true);
          setTimeout(() => {
            router.push("/login");
          }, 3000);
          return () => clearTimeout(timeout);
        } else {
          setShowErrorAlert(true);
        }
      })
      .catch((error) => {
        setShowErrorAlert(true);
        console.log(error);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="App-header justify-center select-none pt-24">
        <h1
          className="text-4xl max-sm:text-3xl font-bold text-slate-900
        my-5"
        >
          Recuperar contraseña
        </h1>
        <div className="w-80 md:w-96">
          <p className="mb-5 text-justify text-gray-600 sm:mt-4 sm:text-xl font-light">
            <span className="font-medium text-red-600">
              ¿Has olvidado tu contraseña?
            </span>{" "}
            <br className="inline" />
            ¡No te preocupes! Aquí podrás restaurarla de nuevo. Simplemente
            introduce tu correo electrónico para recibir un enlace de
            recuperación.
          </p>
        </div>
        <div className="grid gap-3">
          <div className="grid grid-cols-10 items-center text-center gap-1">
            <div className="grid place-items-center col-span-1 bg-slate-600 shadow-sm shadow-slate-400 rounded-t-md h-full">
              <AlternateEmailIcon sx={{ color: "white" }} />
            </div>
            <TextField
              onKeyDown={handleKeyDown}
              className="col-span-9"
              id="filled"
              type="text"
              label="Correo electrónico"
              placeholder="Introduce tu correo electrónico"
              variant="filled"
              onChange={({ target }) => setEmail(target.value)}
            />
          </div>
          <button
            onClick={handleForgot}
            className="bg-rose-600 text-slate-50 uppercase rounded-xl hover:bg-rose-800 ease-in-out duration-150 shadow-md h-10"
          >
            Enviar
          </button>
          <div className="grid items-center w-80 md:w-96">
            <p className="text-center text-zinc-700">
              <Link
                className="font-medium text-rose-600 hover:text-rose-800 ease-in duration-150"
                href="/login"
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
              message="Petición procesada con éxito — comprueba tu correo electrónico"
              open={showSuccessAlert}
              autoHideDuration={3000}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
            >
              <Alert onClose={handleClose} severity="success">
                Petición procesada con éxito —{" "}
                <strong>comprueba tu correo electrónico</strong>
              </Alert>
            </Snackbar>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default ForgotPasswd;
