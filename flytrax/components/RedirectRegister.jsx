import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { deleteCookie, setCookie } from "cookies-next";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import Image from "next/image";

// URLs para manejo de datos en la BD
const loginURL = "http://localhost:3000/loginUsers";

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
  const [loggedIn, setLoggedIn] = useState(false);
  const [newUser, setNewUser] = useState(false);
  const [loading, setLoading] = useState(false);

  // Función de inicio de sesión
  const checkLoginUser = async () => {
    const passwd = "CONTRASENYA";
    // Datos a enviar en la petición
    const data = {
      email: session.user.email,
      password: passwd,
    };

    // Petición POST a la API de Flytrax
    await axios
      .post(loginURL, data)
      .then((response) => {
        console.log("Entro al login");
        console.log(response);
        if (response.data.status === "No existe ese usuario") {
          setNewUser(true);
          console.log(newUser);
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
            console.log("Es la primera vez que ingresas con este correo.");
            setLoading(true);
            router.push("/register");
          }, 5000);
        } else {
          setNewUser(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const router = useRouter();
  useEffect(() => {
    console.log(newUser);
    checkLoginUser();
  }, [newUser, loading]);

  return !newUser ? (
    <ThemeProvider theme={theme}>
      <div className="App-header justify-center select-none pt-24">
        <div className="flex flex-col items-center justify-center py-2 my-3 max-md:w-3/5 md:w-2/5 max-sm:mx-2">
          <h1 className="text-center text-4xl font-bold text-slate-900 my-5 w-full">
            Bienvenido,
            <br />{" "}
            <span className="text-center text-3xl font-bold login-text">
              {session.user.name}
            </span>{" "}
          </h1>
          <div className="flex align-middle items-center rounded-full relative text-center">
            <Image
              src={session.user.image}
              alt="User Image"
              width={100}
              height={100}
              className="relative mx-auto rounded-full"
            />
            <div className="absolute inset-0 text-center justify-center w-full h-full">
              <CircularProgress color="success" size={100} thickness="1.3" />
            </div>
          </div>
          {/* <button
            onClick={() => {
              signOut();
            }}
            className="items-center w-1/2 bg-rose-600 text-slate-50 uppercase rounded-xl hover:bg-rose-800 ease-in-out duration-150 shadow-md h-10 my-3"
          >
            Cerrar sesión
          </button> */}
        </div>
      </div>
    </ThemeProvider>
  ) : (
    <ThemeProvider theme={theme}>
      <div className="App-header justify-center select-none pt-24">
        <div className="grid gap-3 justify-center py-2 my-3 w-80 md:w-96 max-sm:mx-2">
          <h1 className="text-center text-4xl font-bold text-slate-900">
            <span className="text-red-700">¡Vaya!</span>
            <p className="text-3xl">
              Parece que es la primera vez que ingresas con este correo.
            </p>
          </h1>
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
