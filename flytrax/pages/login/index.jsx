import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Link from "next/link";
import axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Alert, Snackbar } from "@mui/material";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import KeyIcon from "@mui/icons-material/Key";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import RedirectRegister from "../../components/RedirectRegister";
import GoogleButton from "../../components/buttons/GoogleButton";
import GitHubButton from "../../components/buttons/GitHubButton";
import { useEffect } from "react";

// URLs para manejo de datos en la BD
const loginURL = "https://flytrax-backend.vercel.app/loginUsers";

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
  const { data: session } = useSession();
  const router = useRouter();
  const SESSION_COOKIE = getCookie("sessionToken");
  const ADMIN_COOKIE = getCookie("adminSessionToken");

  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);

  // Variables de estado
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  // Visibilidad de la contraseña
  const [typePass, setTypePass] = useState("password");
  const [iconPass, setIconPass] = useState(false);

  // Alertas de error
  const [showAlertEmpty, setShowAlertEmpty] = useState(false);
  const [showAlertLogin, setShowAlertLogin] = useState(false);

  // Función para gestionar tecla pulsada
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleLogin();
    } else {
      return;
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

  // Cerrar alerta
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowAlertEmpty(false);
    setShowAlertLogin(false);
  };

  // Función de inicio de sesión
  const handleLogin = () => {
    // Comprobar si hay campos vacíos
    if (email === "" || password === "") {
      setShowAlertEmpty(true);
    } else {
      loginUser();
    }
  };

  // Función de inicio de sesión
  const loginUser = async () => {
    // Datos a enviar en la petición
    const data = {
      email: email,
      password: password,
    };

    // Petición POST a la API de Flytrax
    await axios
      .post(loginURL, data)
      .then((response) => {
        if (response.status === 200) {
          if (response.data.status === "Successful") {
            // Borrar sesión previa
            deleteCookie("sessionToken");
            // Guardar sesión en una cookie (48h máximo)
            const adminSession = response.data.tokenAdmin;
            const newSession = response.data.tokenUser;
            if (adminSession === "") {
              setCookie("userEmail", email, { maxAge: 60 * 60 * 24 * 2 });
              setCookie("sessionToken", newSession, {
                maxAge: 60 * 60 * 24 * 2,
              });
              // Redireccionar a la página del mapa
              setTimeout(() => {
                router.push("/map");
              }, 500);
            } else {
              setCookie("adminSessionToken", adminSession, {
                maxAge: 60 * 60 * 24 * 2,
              });
              // Redireccionar a la página de gestión
              setTimeout(() => {
                router.push("/admin");
              }, 500);
            }
            // Guardar sesión en el estado
            setLoggedIn(true);
          } else {
            setShowAlertLogin(true);
          }
        } else {
          setShowAlertLogin(true);
        }
      })
      .catch((error) => {
        console.log(error);
        setShowAlertLogin(true);
      });
  };

  useEffect(() => {
    // Fetch user cookie value
    const sessionCookie = getCookie("sessionToken");
    const adminCookie = getCookie("adminSessionToken");
    // Update state with user cookie value
    setUser(sessionCookie);
    setAdmin(adminCookie);

    // Comprobar si hay sesión iniciada
    if (user || admin) {
      if (router.pathname === "/login") router.push("/profile");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, setUser, admin, setAdmin, SESSION_COOKIE, ADMIN_COOKIE]);

  return !session ? (
    <ThemeProvider theme={theme}>
      <div className="App-header justify-center select-none pt-24">
        <h1
          className="text-4xl font-bold text-slate-900
        my-5"
        >
          Iniciar sesión
        </h1>
        <div className="flex justify-between gap-3">
          <GoogleButton /> <GitHubButton />
        </div>

        <div className="grid gap-3 justify-center border-t-2 border-gray-400 py-2 my-3 w-80 md:w-96 max-sm:mx-2">
          <h2 className="py-3 text-gray-500 text-sm flex flex-col items-center justify-center text-center">
            O inicia sesión con tus credenciales
          </h2>
          <div className="grid grid-cols-10 items-center text-center gap-1">
            <div className="grid place-items-center col-span-1 bg-slate-600 shadow-sm shadow-slate-400 rounded-t-md h-full">
              <AlternateEmailIcon sx={{ color: "white" }} />
            </div>
            <TextField
              onKeyDown={handleKeyDown}
              className="col-span-9"
              id="email"
              type="email"
              label="Correo electrónico	"
              placeholder="Introduce tu electrónico"
              variant="filled"
              onChange={({ target }) => setEmail(target.value)}
            />
          </div>
          <div className="grid grid-cols-10 items-center text-center gap-1">
            <div className="grid place-items-center col-span-1 bg-slate-600 shadow-sm shadow-slate-400 rounded-t-md h-full">
              <KeyIcon sx={{ color: "white" }} />
            </div>
            <TextField
              onKeyDown={handleKeyDown}
              className="col-span-8"
              id="password"
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
          </div>
          <button
            onClick={handleLogin}
            className="bg-rose-600 text-slate-50 uppercase rounded-xl hover:bg-rose-800 ease-in-out duration-150 shadow-md h-10"
          >
            Entrar
          </button>
          <div className="flex flex-col justify-center items-center">
            <div className="grid items-center w-80 md:w-96">
              <p className="text-center mt-3 text-zinc-700">
                ¿Aún no eres miembro?{" "}
                <Link
                  className="font-medium text-rose-600 hover:text-rose-800 ease-in duration-150"
                  href="/register"
                >
                  Regístrate ahora
                </Link>{" "}
              </p>
            </div>
            <div className="grid items-center w-80 md:w-96">
              <p className="text-center text-zinc-700">
                <Link
                  className="italic text-zinc-700 hover:text-rose-800 ease-in duration-150"
                  href="/forgot-passwd"
                >
                  ¿Has olvidado tu contraseña?
                </Link>{" "}
              </p>
            </div>
          </div>
          <div>
            <Snackbar
              message="No puedes dejar campos vacíos — comprueba los datos"
              open={showAlertEmpty}
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
              message="Correo electrónico o contraseña incorrecta — comprueba los datos"
              open={showAlertLogin}
              autoHideDuration={3000}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
            >
              <Alert onClose={handleClose} severity="error">
                Correo electrónico o contraseña incorrecta —{" "}
                <strong>comprueba los datos</strong>
              </Alert>
            </Snackbar>
          </div>
        </div>
      </div>
    </ThemeProvider>
  ) : (
    <RedirectRegister session={session} />
  );
};

export default Login;
