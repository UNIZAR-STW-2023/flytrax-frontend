import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Link from "next/link";
import { faAt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
  // Variables de estado
  const [email, setEmail] = useState("");

  return (
    <ThemeProvider theme={theme}>
      <div className="App-header select-none">
        <h1
          className="text-4xl font-bold text-slate-900
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
              <FontAwesomeIcon
                className="text-zinc-200"
                icon={faAt}
                size="lg"
              />
            </div>
            <TextField
              className="col-span-9"
              id="filled"
              type="text"
              label="Correo electrónico"
              placeholder="Introduce tu correo electrónico"
              variant="filled"
              onChange={({ target }) => setEmail(target.value)}
            />
          </div>
          <button className="bg-rose-600 text-slate-50 uppercase rounded-xl hover:bg-rose-800 ease-in-out duration-150 shadow-md h-10">
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
        </div>
      </div>
    </ThemeProvider>
  );
};

export default ForgotPasswd;
