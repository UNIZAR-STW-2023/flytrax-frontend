import React, { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "../assets/images/logo_desktop_gray.png";
import LogoMobile from "../assets/images/logo_mobile.png";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";
import { getCookie, deleteCookie } from "cookies-next";
import { useRouter } from "next/router";
import CustomLink from "./CustomLink";
import { useSession } from "next-auth/react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Carrito from "./Carrito";
import { useStateContext } from "../context/StateContext";
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

  // Links para el menú de navegación (logged in)
  const linksLoggedIN = [
    {
      name: "Mapa",
      value: "/map",
    },
    { name: "Aeropuertos", value: "" },
    { name: "Favoritos", value: "" },
    { name: "Tienda", value: "/store" },
  ];

  // Links para el menú de navegación (logged out)
  const linksLoggedOUT = [
    {
      name: "Quiénes somos",
      value: "",
    },
    { name: "Contacto", value: "" },
    { name: "FAQ", value: "/faq" },
    { name: "Tienda", value: "/store" },
  ];

  // Posición del menú de navegación
  const anchor = "top";

  const [user, setUser] = useState(false);
  const [state, setState] = useState({
    top: false,
  });

  // Variables para el carrito
  const { showCart, setShowCart, totalQuantities } = useStateContext();

  useEffect(() => {
    // Fetch user cookie value
    const sessionCookie = getCookie("sessionToken");
    // Update state with user cookie value
    setUser(sessionCookie);
  }, []);

  const handleLogout = () => {
    // Eliminar cookie de sesión
    deleteCookie("sessionToken");
    // Actualizar estado de usuario
    setUser(false);
    // Redireccionar a la página principal
    setTimeout(() => {
      router.push("/");
    }, 500);
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
    <Box sx={{ width: anchor === "top" ? "auto" : 250 }} role="presentation">
      <AppBar
        sx={{
          background: "linear-gradient(220.55deg, #5D85A6 0%, #0E2C5E 100%)",
        }}
        position="sticky"
      ></AppBar>
      <List
        onClick={toggleDrawer(anchor, false)}
        sx={{
          height: 380,
          paddingTop: 13,
          fontSize: 20,
        }}
      >
        {linksLoggedIN.map((item, index) => (
          <ListItem
            id="list-top"
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
          id="list-bottom"
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
              to={"/login"}
            >
              Perfil
            </CustomLink>
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
            id="list-top"
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
          id="list-bottom"
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

  return SESSION_COOKIE || session ? (
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
            <FontAwesomeIcon
              icon={state.top ? faClose : faBars}
              size="3x"
              className="scale-75 md:scale-50"
            />
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
              to={"/login"}
            >
              Perfil
            </CustomLink>
          </div>
        </div>
      </div>
      <div className="md:hidden">
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
            <FontAwesomeIcon
              icon={state.top ? faClose : faBars}
              size="3x"
              className="scale-75 md:scale-50"
            />
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

            {/* Carrito */}
            <button
              type="button"
              className="cart-icon mr-5"
              onClick={() => setShowCart(!showCart)}
            >
              <AiOutlineShoppingCart />
              <span className="cart-item-qty">{totalQuantities}</span>{" "}
              {/* LOGO DEL CARROITO */}
            </button>

            {/* si la variable showCart es true entonces renderizamos el carrito */}
            {showCart && <Carrito />}
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
      <div className="md:hidden">
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
