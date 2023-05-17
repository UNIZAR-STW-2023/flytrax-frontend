/*
  File's name: /store/index.jsx
  Authors: Paul Huszak & Guillermo Cánovas 
  Date: 16/05/2023
*/

import React, { useState } from "react";
import { ProductCard, Banner, Carrito } from "../../components";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useStateContext } from "../../context/StateContext";
import { Box, SwipeableDrawer } from "@mui/material";

const Store = () => {
  const { totalQuantities } = useStateContext();

  // Posición del menú de navegación
  const anchor = "right";

  const [state, setState] = useState({
    right: false,
  });

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

  // Carro de la compra
  const shoppingCart = (anchor) => (
    <Box
      sx={{
        height: "100%",
        width: anchor === "right" ? 500 : "auto",
        "@media (max-width: 640px)": {
          width: anchor === "right" ? "100vw" : "auto",
        },
      }}
      role="presentation"
    >
      <Carrito />
    </Box>
  );

  return (
    <div className="flex flex-col justify-center items-center align-middle m-auto w-11/12 max-sm:w-10/12 my-24 select-none">
      <div className="w-full flex flex-row">
        <div className="w-full pl-12 flex items-center align-center gap-2 my-10 text-black text-center justify-center font-bold max-sm:text-3xl sm:text-4xl">
          Tienda
        </div>
        <div className="max-sm:mr-3 flex align-middle items-center justify-end">
          <button
            data-test="shoppingcart-button"
            className="relative text-gray-800 font-regular hover:text-orange-600 transition ease-in duration-150"
            onClick={toggleDrawer(anchor, true)}
          >
            <ShoppingCartIcon fontSize="large" />{" "}
            <span className="absolute align-middle text-center -right-2 font-semibold text-white rounded-full bg-red-600 w-5 h-5 text-sm">
              {totalQuantities}
            </span>{" "}
          </button>
        </div>
      </div>
      <div>
        <React.Fragment key={anchor}>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {shoppingCart(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      </div>
      <ProductCard />
    </div>
  );
};

export default Store;
