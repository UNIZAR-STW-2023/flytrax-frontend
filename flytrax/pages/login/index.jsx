import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Link from "next/link";
import {
  faLock,
  faEye,
  faEyeSlash,
  faUserAstronaut,
} from "@fortawesome/free-solid-svg-icons";
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

const Login = () => {
  // Variables de estado
  const [nickName, setNickName] = useState("");
  const [password, setPassword] = useState("");

  // Visibilidad de la contraseña
  const [typePass, setTypePass] = useState("password");
  const [iconPass, setIconPass] = useState(faEyeSlash);

  // Alerta de error
  const [showAlert, setShowAlert] = useState(false);

  // Mostrar contraseña
  const handleToggle = () => {
    if (typePass === "password") {
      setIconPass(faEye);
      setTypePass("text");
    } else {
      setIconPass(faEyeSlash);
      setTypePass("password");
    }
  };

  // Cerrar alerta
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowAlert(false);
  };

  // Función de inicio de sesión
  const handleLogin = (event) => {
    event.preventDefault();
    // Comprobar si hay campos vacíos
    if (nickName === "" || password === "") {
      setShowAlert(true);
    } else {
      //loginUser();
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="App-header select-none pt-24">
        <h1
          className="text-4xl font-bold text-slate-900
        my-5"
        >
          Iniciar sesión
        </h1>
        <div className="grid gap-3">
          <div className="grid grid-cols-10 items-center text-center gap-1">
            <div className="grid place-items-center col-span-1 bg-slate-600 shadow-sm shadow-slate-400 rounded-t-md h-full">
              <FontAwesomeIcon
                className="text-zinc-200"
                icon={faUserAstronaut}
                size="lg"
              />
            </div>
            <TextField
              className="col-span-9"
              id="filled"
              type="text"
              label="Nombre de usuario"
              placeholder="Introduce tu nombre de usuario"
              variant="filled"
              onChange={({ target }) => setNickName(target.value)}
            />
          </div>
          <div className="grid grid-cols-10 items-center text-center gap-1">
            <div className="grid place-items-center col-span-1 bg-slate-600 shadow-sm shadow-slate-400 rounded-t-md h-full">
              <FontAwesomeIcon
                className="text-zinc-200"
                icon={faLock}
                size="lg"
              />
            </div>
            <TextField
              className="col-span-8"
              id="filled"
              type={typePass}
              label="Contraseña"
              placeholder="Introduce tu contraseña"
              variant="filled"
              onChange={({ target }) => setPassword(target.value)}
            />
            <div
              onClick={handleToggle}
              className="grid place-items-center col-span-1 bg-stone-400 bg-opacity-20 cursor-pointer hover:bg-slate-300 ease-in-out duration-150 shadow-sm shadow-slate-600 rounded-t-md h-full"
            >
              <FontAwesomeIcon
                className="text-zinc-600"
                icon={iconPass}
                size="lg"
              />
            </div>
          </div>
          <button
            onClick={handleLogin}
            className="bg-rose-600 text-slate-50 uppercase rounded-xl hover:bg-rose-800 ease-in-out duration-150 shadow-md h-10"
          >
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
          <div class="grid items-center w-80 md:w-96">
            <p class="text-center text-zinc-700">
              <Link
                className="italic text-zinc-700 hover:text-rose-800 ease-in duration-150"
                href="/forgot-passwd"
              >
                ¿Has olvidado tu contraseña?
              </Link>{" "}
            </p>
          </div>
          <div>
            <Snackbar
              message="No puedes dejar campos vacíos — comprueba los datos"
              open={showAlert}
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
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Login;
