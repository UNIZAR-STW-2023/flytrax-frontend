import React from "react";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Button } from "@mui/material";
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

const Login = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="App-header">
        <h1
          className="text-4xl font-bold text-slate-900
        my-5"
        >
          Iniciar sesión
        </h1>
        <div className="grid gap-3">
          <TextField
            id="filled"
            type="text"
            label="Nombre de usuario"
            placeholder="Introduce tu nombre de usuario"
            variant="filled"
          />
          <TextField
            id="filled"
            type="password"
            label="Contraseña"
            placeholder="Introduce tu contraseña"
            variant="filled"
          />
          <button className="bg-rose-600 text-slate-50 uppercase rounded-xl hover:bg-rose-800 ease-in-out duration-150 shadow-md h-10">
            Entrar
          </button>
          <div class="grid items-center w-80 md:w-96">
            <p class="text-center mt-3 text-zinc-700">
              ¿Aún no eres miembro?{" "}
              <Link
                className="font-medium text-rose-600 hover:text-rose-800 ease-in duration-150"
                href="/register"
              >
                Regístrate ahora
              </Link>{" "}
            </p>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Login;
