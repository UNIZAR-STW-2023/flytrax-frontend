import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Link from "next/link";
import { faLock, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
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

const RestorePasswd = () => {
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");

  // Visibilidad de la contraseña
  const [typePass, setTypePass] = useState("password");
  const [typeCPass, setTypeCPass] = useState("password");
  const [iconPass, setIconPass] = useState(faEyeSlash);
  const [iconCPass, setIconCPass] = useState(faEyeSlash);

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

  // Mostrar contraseña
  const handleToggle2 = () => {
    if (typeCPass === "password") {
      setIconCPass(faEye);
      setTypeCPass("text");
    } else {
      setIconCPass(faEyeSlash);
      setTypeCPass("password");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="App-header select-none">
        <h1
          className="text-4xl font-bold text-slate-900
        my-5"
        >
          Restaurar contraseña
        </h1>
        <div className="w-80 md:w-96">
          <p className="mb-5 text-justify text-gray-600 sm:mt-4 sm:text-xl font-light">
            <span className="font-medium text-red-600">¿Nueva contraseña?</span>{" "}
            <br className="inline" />
            Introduce debajo tu nueva contraseña para poder restaurarla y
            acceder nuevamente al sistema.
          </p>
        </div>
        <div className="grid gap-3">
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
              type={typeCPass}
              label="Confirmar contraseña"
              placeholder="Confirma tu contraseña"
              variant="filled"
              onChange={({ target }) => setCPassword(target.value)}
            />
            <div
              onClick={handleToggle2}
              className="grid place-items-center col-span-1 bg-stone-400 bg-opacity-20 cursor-pointer hover:bg-slate-300 ease-in-out duration-150 shadow-sm shadow-slate-600 rounded-t-md h-full"
            >
              <FontAwesomeIcon
                className="text-zinc-600"
                icon={iconCPass}
                size="lg"
              />
            </div>
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

export default RestorePasswd;
