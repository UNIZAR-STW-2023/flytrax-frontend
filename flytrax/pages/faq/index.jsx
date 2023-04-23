import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Link from "next/link";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert, Snackbar } from "@mui/material";

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

const FAQ = () => {
  // Variables de estado
  const [query, setQuery] = useState("");

  // Alerta de error
  const [showAlert, setShowAlert] = useState(false);

  // Cerrar alerta
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowAlert(false);
  };

  // Función de inicio de sesión
  const handleForgot = (event) => {
    event.preventDefault();
    // Comprobar si hay campos vacíos
    if (query === "") {
      setShowAlert(true);
    } else {
      //sendEmail();
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="App-header justify-center select-none pt-24">
        <h1
          className="text-4xl max-sm:text-3xl font-bold text-slate-900
        my-5"
        >
          Preguntas frecuentes
        </h1>
        <div className="w-80 md:w-96">
          <p className="mb-5 text-justify text-gray-600 sm:mt-4 sm:text-xl font-light">
            Introduce tu pregunta en la caja de búsqueda y te daremos una
            respuesta lo antes posible.
          </p>
        </div>
        <div className="grid gap-3">
          <div className="grid grid-cols-10 items-center text-center gap-1">
            <div className="grid place-items-center col-span-1 bg-slate-600 shadow-sm shadow-slate-400 rounded-t-md h-full p-1">
              <FontAwesomeIcon
                className="text-zinc-200"
                icon={faQuestion}
                size="1x"
              />
            </div>
            <TextField
              className="col-span-9"
              id="filled"
              type="text"
              label="Pregunta"
              placeholder="Escribe aquí tu pregunta"
              variant="filled"
              onChange={({ target }) => setQuery(target.value)}
            />
          </div>
          <button
            onClick={handleForgot}
            className="bg-rose-600 text-slate-50 uppercase rounded-xl hover:bg-rose-800 ease-in-out duration-150 shadow-md h-10"
          >
            Enviar
          </button>
          <div class="grid items-center w-80 md:w-96">
            <p class="text-center text-zinc-700">
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
              open={showAlert}
              autoHideDuration={4000}
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
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default FAQ;
