import React, { useState } from "react";
import Link from "next/link";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Alert, Snackbar } from "@mui/material";
import PasswordStrengthBar from "react-password-strength-bar";
import KeyIcon from "@mui/icons-material/Key";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useRouter } from "next/router";

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
  const router = useRouter();
  const currentUrl = router.asPath;
  console.log("URL: " + currentUrl);

  // Variables de estado
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [passwdStrength, setPasswdStrength] = useState("");

  // Visibilidad de la contraseña
  const [typePass, setTypePass] = useState("password");
  const [typeCPass, setTypeCPass] = useState("password");
  const [iconPass, setIconPass] = useState(false);
  const [iconCPass, setIconCPass] = useState(false);

  // Alertas de error
  const [showAlertPasswd, setShowAlertPasswd] = useState(false);
  const [showAlertEmpty, setShowAlertEmpty] = useState(false);
  const [showAlertPassStrength, setShowAlertPassStrength] = useState(false);

  // Cerrar alertas
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowAlertPasswd(false);
    setShowAlertEmpty(false);
    setShowAlertPassStrength(false);
  };

  // Comprobar si hay campos vacíos
  const checkNullForm = () => {
    if (password === "" || cPassword === "") {
      return true;
    } else {
      return false;
    }
  };

  // Comprobar si las contraseñas son iguales
  const checkPassword = () => {
    if (password !== cPassword) {
      return true;
    } else {
      return false;
    }
  };

  // Comprobar la fuerza de la contraseña
  const checkPasswordStrength = () => {
    if (passwdStrength <= 1) {
      return true;
    } else {
      return false;
    }
  };

  // Función para gestionar tecla pulsada
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleRestore();
    } else {
      return;
    }
  };

  // Función de inicio de sesión
  const handleRestore = () => {
    if (checkNullForm()) {
      setShowAlertEmpty(true);
    } else if (checkPassword()) {
      setShowAlertPasswd(true);
    } else if (checkPasswordStrength()) {
      setShowAlertPassStrength(true);
    } else {
      //restorePasswd();
    }
  };

  // Mostrar contraseña
  const handleToggle = () => {
    if (typePass === "password") {
      setIconPass(true);
      setTypePass("text");
    } else {
      setIconPass(false);
      setTypePass("password");
    }
  };

  // Mostrar contraseña
  const handleToggle2 = () => {
    if (typeCPass === "password") {
      setIconCPass(true);
      setTypeCPass("text");
    } else {
      setIconCPass(false);
      setTypeCPass("password");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="App-header justify-center select-none pt-24">
        <h1
          className="text-4xl max-sm:text-3xl font-bold text-slate-900
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
              <KeyIcon sx={{ color: "white" }} />
            </div>
            <TextField
              onKeyDown={handleKeyDown}
              name="password"
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
              {iconPass ? (
                <VisibilityIcon className="text-slate-600" />
              ) : (
                <VisibilityOffIcon className="text-slate-600" />
              )}
            </div>
            <PasswordStrengthBar
              className="col-span-10"
              password={password}
              shortScoreWord="Demasiado corta"
              scoreWords={[
                "Muy poco segura",
                "Débil",
                "Buena",
                "Muy buena",
                "Excelente",
              ]}
              minLength={8}
            />
          </div>
          <div className="grid grid-cols-10 items-center text-center gap-1">
            <div className="grid place-items-center col-span-1 bg-slate-600 shadow-sm shadow-slate-400 rounded-t-md h-full">
              <KeyIcon sx={{ color: "white" }} />
            </div>
            <TextField
              onKeyDown={handleKeyDown}
              name="cpassword"
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
              {iconCPass ? (
                <VisibilityIcon className="text-slate-600" />
              ) : (
                <VisibilityOffIcon className="text-slate-600" />
              )}
            </div>
            <PasswordStrengthBar
              className="col-span-10"
              password={cPassword}
              shortScoreWord="Demasiado corta"
              scoreWords={[
                "Muy poco segura",
                "Débil",
                "Buena",
                "Muy buena",
                "Excelente",
              ]}
              minLength={8}
              onChangeScore={(score, feedback) => {
                setPasswdStrength(score);
              }}
            />
          </div>
          <button
            onClick={handleRestore}
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
              open={showAlertEmpty}
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
            <Snackbar
              message="Las contraseñas no coinciden — comprueba los datos"
              open={showAlertPasswd}
              autoHideDuration={4000}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
            >
              <Alert onClose={handleClose} severity="error">
                Las contraseñas no coinciden —{" "}
                <strong>comprueba los datos</strong>
              </Alert>
            </Snackbar>
            <Snackbar
              message="La contraseña es demasiado débil — ¡piensa en algo más seguro!"
              open={showAlertPassStrength}
              autoHideDuration={4000}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
            >
              <Alert onClose={handleClose} severity="error">
                La contraseña es demasiado débil —{" "}
                <strong>¡piensa en algo más seguro!</strong>
              </Alert>
            </Snackbar>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default RestorePasswd;
