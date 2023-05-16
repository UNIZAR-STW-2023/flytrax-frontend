import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { deleteCookie, setCookie } from "cookies-next";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import Image from "next/image";

// URLs para manejo de datos en la BD
const loginURL = "https://flytrax-backend.vercel.app/loginUsers";
const nexLoginURL = "https://flytrax-backend.vercel.app/nextLogin";

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

const RedirectRegister = ({ session }) => {
  const router = useRouter();

  const [nextUser, setNextUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [newUser, setNewUser] = useState(false);
  const [loading, setLoading] = useState(false);

  const nextAuthLogin = async () => {
    const PROVIDER_KEY = "customProvider";

    const data = {
      email: session.user.email,
      provider: PROVIDER_KEY,
    };

    await axios
      .post(nexLoginURL, data)
      .then((response) => {
        if (response.status === 200) {
          deleteCookie("sessionToken");
          deleteCookie("userEmail");
          const newSession = response.data.TokenAuth;
          setCookie("userEmail", session.user.email, {
            maxAge: 60 * 60 * 24 * 2,
          });
          setCookie("sessionToken", newSession, {
            maxAge: 60 * 60 * 24 * 2,
          });
          // Redireccionar a la página del mapa
          setTimeout(() => {
            router.push("/map");
          }, 500);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Función de inicio de sesión
  const checkLoginUser = async () => {
    const passwd =
      "3f4d0d4fffe75ba48e75dffdce387e960a5deb95fc118367c2f7bac33d534550";
    // Datos a enviar en la petición
    const data = {
      email: session.user.email,
      password: passwd,
    };

    // Petición POST a la API de Flytrax
    await axios
      .post(loginURL, data)
      .then((response) => {
        if (response.data.status === "No existe ese usuario") {
          setNewUser(true);
          // Borrar sesión previa
          deleteCookie("sessionToken");
          // Guardar sesión en una cookie (48h máximo)
          const adminSession = response.data.tokenAdmin;
          const newSession = response.data.token;
          if (adminSession === "") {
            setCookie("sessionToken", newSession, { maxAge: 60 * 60 * 24 * 2 });
          } else {
            setCookie("adminSessionToken", adminSession, {
              maxAge: 60 * 60 * 24 * 2,
            });
          }
          // Guardar sesión en el estado
          setLoggedIn(true);
          // Redireccionar a la página principal
          setTimeout(() => {
            setLoading(true);
            router.push("/register");
          }, 5000);
        } else {
          setNewUser(false);
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          console.log(error);
          nextAuthLogin();
        }
      });
  };

  useEffect(() => {
    checkLoginUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newUser, loading]);

  return !newUser ? (
    <ThemeProvider theme={theme}>
      <div className="App-header justify-center select-none pt-24">
        <div className="flex flex-col items-center justify-center py-2 my-3 max-md:w-3/5 md:w-2/5 max-sm:mx-2">
          <div className="flex align-middle items-center rounded-full relative text-center">
            <Image
              src={session.user.image}
              alt="User Image"
              width={100}
              height={100}
              className="relative mx-auto rounded-full"
            />
            <div className="absolute inset-0 text-center justify-center w-full h-full">
              <CircularProgress color="success" size={100} thickness={1.5} />
            </div>
          </div>
          <div className="flex flex-col align-middle items-center justify-center text-center text-4xl font-bold text-slate-900 my-5 w-full">
            Es genial tenerte a bordo,
            <br />{" "}
            <span className="text-center text-3xl font-bold login-text">
              {session.user.name}
            </span>{" "}
            <h2 className="text-center text-gray-600 font-medium text-xl">
              Te estamos redirigiendo para que puedas disfrutar de los
              servicios...
            </h2>
          </div>
        </div>
      </div>
    </ThemeProvider>
  ) : (
    <ThemeProvider theme={theme}>
      <div className="App-header justify-center select-none pt-24">
        <div className="grid gap-3 justify-center py-2 my-3 w-80 md:w-96 max-sm:mx-2">
          <div className="text-center text-4xl font-bold text-slate-900">
            <span className="text-red-700">¡Vaya!</span>
            <p className="text-3xl">
              Parece que es la primera vez que ingresas con este correo.
            </p>
          </div>
          <h2 className="text-center text-gray-600 font-regular text-xl">
            Te estamos redirigiendo a la página de registro...
          </h2>
          <div className="text-center">
            <CircularProgress color="error" />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default RedirectRegister;
