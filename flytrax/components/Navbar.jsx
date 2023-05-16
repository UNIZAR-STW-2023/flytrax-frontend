/*
  File's name: Navbar.jsx
  Authors: Paul Huszak & Guillermo Cánovas 
  Date: 16/05/2023
*/

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "../assets/images/logo_desktop_gray.png";
import LogoMobile from "../assets/images/logo_mobile.png";
import Image from "next/image";
import { getCookie, deleteCookie } from "cookies-next";
import { useRouter } from "next/router";
import CustomLink from "./CustomLink";
import { useSession } from "next-auth/react";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  List,
  ListItem,
  ListItemButton,
  SwipeableDrawer,
} from "@mui/material";

const Navbar = () => {
  // Rutas y sesión de usuario
  const router = useRouter();
  const { data: session } = useSession();

  // Cookie de la sesión
  const SESSION_COOKIE = getCookie("sessionToken");
  const ADMIN_COOKIE = getCookie("adminSessionToken");

  // Links para el menú de navegación (logged in)
  const linksLoggedIN = [
    {
      name: "Mapa",
      value: "/map",
    },
    { name: "Aeropuertos", value: "/airports-list" },
    { name: "Favoritos", value: "/fav-airports" },
    { name: "Comunidad", value: "/community" },
    { name: "Tienda", value: "/store" },
  ];

  // Links para el menú de navegación (logged out)
  const linksLoggedOUT = [
    {
      name: "Quiénes somos",
      value: "/who-we-are",
    },
    { name: "Contacto", value: "/contact" },
    { name: "FAQ", value: "/faq" },
    { name: "Tienda", value: "/store" },
  ];

  // Posición del menú de navegación
  const anchor = "top";

  const [user, setUser] = useState("");
  const [admin, setAdmin] = useState("");
  const [state, setState] = useState({
    top: false,
  });

  useEffect(() => {
    // Fetch user cookie value
    const sessionCookie = getCookie("sessionToken");
    const adminCookie = getCookie("adminSessionToken");
    // Update state with user cookie value
    setUser(sessionCookie);
    setAdmin(adminCookie);
  }, [user, setUser, admin, setAdmin, SESSION_COOKIE, ADMIN_COOKIE]);

  const handleLogoutAdmin = () => {
    deleteCookie("adminSessionToken");
    router.push("/login");
  };

  // Abrir y cerrar el menú de navegación
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  // Lista del menú de navegación (logged in)
  const listLoggedIN = (anchor) => (
    <Box
      sx={{ width: anchor === "top" ? "auto" : 250, height: "100%" }}
      role="presentation"
    >
      <AppBar
        sx={{
          background: "linear-gradient(220.55deg, #5D85A6 0%, #0E2C5E 100%)",
        }}
        position="sticky"
      ></AppBar>
      <List
        onClick={toggleDrawer(anchor, false)}
        sx={{
          height: "fit-content",
          paddingTop: 13,
          fontSize: 20,
        }}
      >
        {linksLoggedIN.map((item, index) => (
          <ListItem
            id="list-login"
            onKeyDown={toggleDrawer(anchor, false)}
            disablePadding
            key={index}
            sx={{
              borderBottom: "2px dashed #E5E5E5",
              borderTop: "2px dashed #E5E5E5",
            }}
          >
            <ListItemButton
              sx={{
                marginX: "auto",
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: 50,
              }}
            >
              <CustomLink
                className="hover:text-orange-600 ease-in-out duration-150 uppercase"
                to={item.value}
              >
                {item.name}
              </CustomLink>
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem
          id="list-login-b"
          onKeyDown={toggleDrawer(anchor, false)}
          disablePadding
          sx={{
            borderBottom: "2px dashed #E5E5E5",
            borderTop: "2px dashed #E5E5E5",
          }}
        >
          <ListItemButton
            sx={{
              marginX: "auto",
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: 50,
            }}
          >
            <CustomLink
              className="hover:text-orange-600 ease-in-out duration-150 uppercase"
              to={"/profile"}
            >
              Perfil
            </CustomLink>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  // Lista del menú de navegación (logged in)
  const listAdmin = (anchor) => (
    <Box
      sx={{ width: anchor === "top" ? "auto" : 250, height: "100%" }}
      role="presentation"
    >
      <AppBar
        sx={{
          background: "linear-gradient(220.55deg, #5D85A6 0%, #0E2C5E 100%)",
        }}
        position="sticky"
      ></AppBar>
      <List
        onClick={toggleDrawer(anchor, false)}
        sx={{
          height: "fit-content",
          paddingTop: 13,
          fontSize: 20,
        }}
      >
        <ListItem
          id="list-login-b"
          onKeyDown={toggleDrawer(anchor, false)}
          disablePadding
          sx={{
            borderBottom: "2px dashed #E5E5E5",
            borderTop: "2px dashed #E5E5E5",
          }}
        >
          <ListItemButton
            sx={{
              marginX: "auto",
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: 50,
            }}
          >
            <CustomLink
              className="hover:text-orange-600 ease-in-out duration-150 uppercase"
              to={"/admin"}
            >
              Administración
            </CustomLink>
          </ListItemButton>
        </ListItem>
        <ListItem
          id="list-login-b"
          onKeyDown={toggleDrawer(anchor, false)}
          disablePadding
          sx={{
            borderBottom: "2px dashed #E5E5E5",
            borderTop: "2px dashed #E5E5E5",
          }}
        >
          <ListItemButton
            sx={{
              marginX: "auto",
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: 50,
            }}
          >
            <button
              onClick={handleLogoutAdmin}
              className="text-gray-700 font-bold uppercase text-xl hover:text-orange-600 ease-in-out duration-150"
            >
              Salir
            </button>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  // Lista del menú de navegación (logged out)
  const listLoggedOUT = (anchor) => (
    <Box sx={{ width: anchor === "top" ? "auto" : 250 }} role="presentation">
      <AppBar
        sx={{
          background: "linear-gradient(220.55deg, #5D85A6 0%, #0E2C5E 100%)",
        }}
        position="sticky"
      ></AppBar>
      <List
        onClick={toggleDrawer(anchor, false)}
        sx={{ height: 380, paddingTop: 13, fontSize: 20 }}
      >
        {linksLoggedOUT.map((item, index) => (
          <ListItem
            id="list-logout"
            onKeyDown={toggleDrawer(anchor, false)}
            disablePadding
            key={index}
            sx={{
              borderBottom: "2px dashed #E5E5E5",
              borderTop: "2px dashed #E5E5E5",
            }}
          >
            <ListItemButton
              sx={{
                marginX: "auto",
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: 50,
              }}
            >
              <CustomLink
                className="hover:text-orange-600 ease-in-out duration-150 uppercase"
                to={item.value}
              >
                {item.name}
              </CustomLink>
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem
          id="list-logout-b"
          onKeyDown={toggleDrawer(anchor, false)}
          disablePadding
          sx={{
            borderBottom: "2px dashed #E5E5E5",
            borderTop: "2px dashed #E5E5E5",
          }}
        >
          <ListItemButton
            sx={{
              marginX: "auto",
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: 50,
            }}
          >
            <CustomLink
              className="font-bold hover:text-orange-600 ease-in-out duration-150 uppercase"
              to={"/login"}
            >
              Entrar
            </CustomLink>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return user || session ? (
    <nav className="max-lg:shadow-md h-24 w-full bg-slate-200 fixed top-0 left-0 shadow-md backdrop-blur-md navbar">
      <div className="flex justify-between mx-8 lg:mx-16 h-24">
        <div className="grid grid-cols-6 max-lg:w-full">
          <Link
            href="/"
            className="grid sm:grid-cols-4 lg:grid-cols-3 max-md:grid-cols-5 col-span-5 justify-items-center lg:gap-2"
          >
            <Image
              src={LogoMobile}
              className="max-sm:w-20 w-12 lg:w-16 self-center col-span-1"
              alt="Flytrax Logo"
            />
            <Image
              src={Logo}
              className="md:w-32 lg:w-40 self-center justify-self-start md:col-span-3 lg:col-span-2 max-lg:col-span-1 max-md:hidden"
              alt="Flytrax Logo"
            />
          </Link>
          <button
            data-test="menu-button"
            className="sm:hidden col-span-1 text-orange-600"
            onClick={toggleDrawer(anchor, true)}
          >
            {state.top ? (
              <CloseIcon sx={{ width: 50, height: 50 }} fontSize="large" />
            ) : (
              <MenuIcon sx={{ width: 50, height: 50 }} fontSize="large" />
            )}
          </button>
        </div>
        <div className="flex max-sm:hidden">
          <div className="flex items-center col-span-4 gap-6 uppercase m-3 max-md:text-sm">
            {linksLoggedIN.map((item, index) => (
              <CustomLink
                className="hover:text-orange-600 ease-in-out duration-150 uppercase"
                key={index}
                to={item.value}
              >
                {item.name}
              </CustomLink>
            ))}
          </div>
          <div
            data-test="join-web-button"
            className="flex border-l-2 col-span-1 border-l-gray-600 pl-6 items-center gap-6 uppercase m-3"
          >
            <CustomLink
              className="text-xl hover:text-orange-600 ease-in-out duration-150"
              to={"/profile"}
            >
              Perfil
            </CustomLink>
          </div>
        </div>
      </div>
      <div className="sm:hidden">
        <div>
          <React.Fragment key={anchor}>
            <SwipeableDrawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
              onOpen={toggleDrawer(anchor, true)}
            >
              {listLoggedIN(anchor)}
            </SwipeableDrawer>
          </React.Fragment>
        </div>
      </div>
    </nav>
  ) : admin ? (
    <nav className="max-lg:shadow-md h-24 w-full bg-slate-200 fixed top-0 left-0 shadow-md backdrop-blur-md navbar">
      <div className="flex justify-between mx-8 lg:mx-16 h-24">
        <div className="grid grid-cols-6 max-lg:w-full">
          <Link
            href="/"
            className="grid sm:grid-cols-4 lg:grid-cols-3 max-md:grid-cols-5 col-span-5 justify-items-center lg:gap-2"
          >
            <Image
              src={LogoMobile}
              className="max-sm:w-20 w-12 lg:w-16 self-center col-span-1"
              alt="Flytrax Logo"
            />
            <Image
              src={Logo}
              className="md:w-32 lg:w-40 self-center justify-self-start md:col-span-3 lg:col-span-2 max-lg:col-span-1 max-md:hidden"
              alt="Flytrax Logo"
            />
          </Link>
          <button
            data-test="menu-button"
            className="sm:hidden col-span-1 text-orange-600"
            onClick={toggleDrawer(anchor, true)}
          >
            {state.top ? (
              <CloseIcon sx={{ width: 50, height: 50 }} fontSize="large" />
            ) : (
              <MenuIcon sx={{ width: 50, height: 50 }} fontSize="large" />
            )}
          </button>
        </div>
        <div className="flex max-sm:hidden">
          <div className="flex items-center col-span-4 gap-6 uppercase m-3 max-md:text-sm">
            <CustomLink
              className="hover:text-orange-600 ease-in-out duration-150 uppercase"
              to={"/admin"}
            >
              Administración
            </CustomLink>
          </div>
          <div
            data-test="join-web-button"
            className="flex border-l-2 col-span-1 border-l-gray-600 pl-6 items-center gap-6 uppercase m-3"
          >
            <button
              onClick={handleLogoutAdmin}
              className="text-gray-700 font-bold uppercase text-xl hover:text-orange-600 ease-in-out duration-150"
            >
              Salir
            </button>
          </div>
        </div>
      </div>
      <div className="sm:hidden">
        <div>
          <React.Fragment key={anchor}>
            <SwipeableDrawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
              onOpen={toggleDrawer(anchor, true)}
            >
              {listAdmin(anchor)}
            </SwipeableDrawer>
          </React.Fragment>
        </div>
      </div>
    </nav>
  ) : (
    <nav className="max-lg:shadow-md h-24 w-full bg-slate-200 fixed top-0 left-0 shadow-md backdrop-blur-md navbar">
      <div className="flex justify-between mx-8 lg:mx-16 h-24">
        <div className="grid grid-cols-6 max-lg:w-full">
          <Link
            href="/"
            className="grid sm:grid-cols-4 lg:grid-cols-3 max-md:grid-cols-5 col-span-5 justify-items-center lg:gap-2"
          >
            <Image
              src={LogoMobile}
              className="max-sm:w-20 w-12 lg:w-16 self-center col-span-1"
              alt="Flytrax Logo"
            />
            <Image
              src={Logo}
              className="md:w-32 lg:w-40 self-center justify-self-start md:col-span-3 lg:col-span-2 max-lg:col-span-1 max-md:hidden"
              alt="Flytrax Logo"
            />
          </Link>
          <button
            data-test="menu-button"
            className="sm:hidden col-span-1 text-orange-600"
            onClick={toggleDrawer(anchor, true)}
          >
            {state.top ? (
              <CloseIcon sx={{ width: 50, height: 50 }} fontSize="large" />
            ) : (
              <MenuIcon sx={{ width: 50, height: 50 }} fontSize="large" />
            )}
          </button>
        </div>
        <div className="flex max-sm:hidden">
          <div className="flex items-center col-span-4 gap-6 uppercase m-3 max-md:text-sm">
            {linksLoggedOUT.map((item, index) => (
              <CustomLink
                className="hover:text-orange-600 ease-in-out duration-150 uppercase"
                key={index}
                to={item.value}
              >
                {item.name}
              </CustomLink>
            ))}
          </div>
          <div
            data-test="join-web-button"
            className="flex border-l-2 col-span-1 border-l-gray-600 pl-6 items-center gap-6 uppercase m-3"
          >
            <CustomLink
              className="font-bold text-xl hover:text-orange-600 ease-in-out duration-150"
              to={"/login"}
            >
              Entrar
            </CustomLink>
          </div>
        </div>
      </div>
      <div className="sm:hidden">
        <div>
          <React.Fragment key={anchor}>
            <SwipeableDrawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
              onOpen={toggleDrawer(anchor, true)}
            >
              {listLoggedOUT(anchor)}
            </SwipeableDrawer>
          </React.Fragment>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
