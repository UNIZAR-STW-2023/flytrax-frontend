/*
  File's name: /product/[slug].jsx
  Authors: Paul Huszak & Guillermo Cánovas 
  Date: 16/05/2023
*/

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { Carrito, Loader, Product } from "../../../components";
import { useRouter } from "next/router";
import { productsData } from "../../../assets/dummy/dummyDatos";
import NotFound from "../../404";
import { useStateContext } from "../../../context/StateContext";
import WavesIcon from "@mui/icons-material/Waves";
import DetailsIcon from "@mui/icons-material/Details";
import IronIcon from "@mui/icons-material/Iron";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import DryCleaningIcon from "@mui/icons-material/DryCleaning";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import classNames from "classnames";
import { ArrowBack } from "@mui/icons-material";
import { Box, SwipeableDrawer } from "@mui/material";

const ProductDetails = () => {
  const router = useRouter();
  const { slug } = router.query;

  const [actualProduct, setActualProduct] = useState({});
  const [loading, setIsLoading] = useState(true);

  const [isOpen, setIsOpen] = useState(false);

  const dropdownClasses = classNames(
    "pr-5 flex flex-col gap-3 transition ease-in-out duration-300 overflow-hidden",
    { "max-h-full": isOpen, "max-h-0": !isOpen }
  );

  // Posición del menú de navegación
  const anchor = "right";

  const [state, setState] = useState({
    right: false,
  });

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
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

  useEffect(() => {
    if (!router.isReady) return;
    productsData.map(function (item) {
      if (item._id === parseInt(slug)) {
        setActualProduct(item);
      }
    });
    setTimeout(() => setIsLoading(false), 1500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.slug, router.isReady]);

  const [index, setIndex] = useState(0);

  const { image, name, price, description, size } = actualProduct;

  const { restarCantidad, sumarCantidad, qty, onAdd, totalQuantities } =
    useStateContext();

  return !loading ? (
    actualProduct.name ? (
      <>
        <div className="max-w-[1400px] m-auto w-full my-24 pt-12">
          <div className="flex align-middle items-center justify-end">
            <button
              data-test="menu-button"
              className="relative mr-7 text-gray-800 font-regular hover:text-orange-600 transition ease-in duration-150"
              onClick={toggleDrawer(anchor, true)}
            >
              <ShoppingCartIcon fontSize="large" />{" "}
              <span className="absolute align-middle text-center -right-2 font-semibold text-white rounded-full bg-red-600 w-5 h-5 text-sm">
                {totalQuantities}
              </span>{" "}
            </button>
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
          <div className="relative border-b-2 border-dashed border-gray-700 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full gap-5 py-12">
            <div className="grid col-span-1">
              <div className="flex align-middle items-center justify-center max-lg:p-5 p-5 my-auto">
                <Image
                  alt="Product Image"
                  src={image && image[index]}
                  width={500}
                  height={500}
                  className="product-detail-image shadow-lg"
                />
              </div>

              {/* mapear todas las imagenes del producto */}
              <div className="flex gap-5 align-middle items-center justify-between mx-auto">
                {image?.map((item, i) => (
                  <div
                    className="flex flex-col align-middle my-3 items-center justify-center w-1/3"
                    key={i}
                  >
                    <Image
                      alt="Product Image"
                      key={item._id}
                      width={100}
                      height={100}
                      src={item}
                      className={
                        i === index
                          ? "small-image selected-image"
                          : "small-image"
                      }
                      onMouseEnter={() => setIndex(i)} //cambiamos la que esta mostrandose
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="grid col-span-1 xl:col-span-2 py-4 max-md:pt-4 max-lg:px-5 lg:w-5/6">
              <div className="flex flex-col gap-3 justify-between">
                <div>
                  <h1 className="text-3xl uppercase font-light h-fit">
                    {name}
                  </h1>
                  <p className="text-3xl font-bold h-fit">{price} EUR</p>
                  <h4 className="text-justify mt-10 text-lg w-full h-fit">
                    {description}
                  </h4>
                  <h4 className="italic text-justify mt-10 text-lg w-full h-fit">
                    {size}
                  </h4>
                </div>
                <div className="flex flex-row gap-4 max-sm:mt-10">
                  <div className="flex flex-row justify-between row-span-1 gap-3 w-full h-full">
                    <div className="w-1/2 h-full">
                      <h3 className="text-lg uppercase">Cantidad</h3>
                      <p className="flex-row flex items-center mt-1">
                        <button
                          className="mr-2 text-2xl cursor-pointer hover:text-orange-600 transition ease-in duration-200"
                          onClick={restarCantidad}
                        >
                          <AiOutlineMinus />
                        </button>
                        <span className="mx-2 text-2xl">{qty}</span>
                        <button
                          className="mx-2 text-2xl cursor-pointer hover:text-orange-600 transition ease-in duration-200"
                          onClick={sumarCantidad}
                        >
                          <AiOutlinePlus />
                        </button>
                      </p>
                    </div>
                    <div className="h-full w-1/2">
                      <button
                        className="w-full h-full p-2 max-xl:text-sm text-xl rounded-md hover:bg-orange-900 transition ease-in-out duration-300 text-slate-50 font-bold bg-orange-600 uppercase"
                        onClick={() => onAdd(actualProduct, qty)}
                      >
                        Añadir a la cesta
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:hidden absolute -bottom-3 left-32">
                <ContentCutIcon />
              </div>
            </div>

            <div className="lg:hidden grid col-span-1 md:col-span-2 lg:col-span-1 px-5 py-4 max-lg:pt-8 lg:border-l-2">
              <button
                className="mb-10 max-lg:flex hidden gap-1 text-black font-semibold uppercase"
                onClick={toggleDropdown}
              >
                Composición, cuidados & origen{" "}
                <KeyboardArrowDownIcon
                  sx={{
                    transform: isOpen ? "rotate(-180deg)" : "rotate(0deg)",
                    transition: "color 300ms, transform 300ms",
                  }}
                />
              </button>
              <div className={dropdownClasses}>
                <h1 className="text-3xl uppercase font-light h-fit">
                  Composición, cuidados & origen
                </h1>
                <br />
                <p className="text-3xl font-light h-fit uppercase">
                  Composición
                </p>
                <h4 className="text-justify text-lg w-full h-fit">
                  Trabajamos con programas de seguimiento para garantizar el
                  cumplimiento de nuestros estándares sociales, medioambientales
                  y de seguridad y salud de nuestras prendas.
                </h4>
                <h4 className="text-justify text-lg w-full h-fit">
                  Para evaluar su cumplimiento hemos desarrollado un programa de
                  auditorías y planes de mejora continua.
                </h4>
                <p className="h-fit uppercase">Exterior </p>
                <p className="h-fit">95% algodón</p>
                <p className="h-fit">5% elastano</p>
                <br />
                <p className="text-3xl font-light h-fit uppercase">Cuidados</p>
                <h4 className="text-justify text-lg w-full h-fit">
                  Cuidar de tus prendas es cuidar del medioambiente.
                </h4>
                <h4 className="text-justify text-lg w-full h-fit">
                  Para alargar la vida de tus prendas de denim lávalas siempre a
                  bajas temperaturas y del revés, de esta forma ayudamos a
                  preservar los colores, la estructura del tejido y reducimos el
                  consumo de energía.
                </h4>
                <div className="h-fit flex flex-row align-middle items-center justify-start gap-4">
                  <WavesIcon /> Lavar a máquina max. 30ºC. Centrifugado corto
                </div>
                <div className="h-fit flex flex-row align-middle items-center justify-start gap-4">
                  <DetailsIcon /> No usar lejía / blanqueador
                </div>
                <div className="h-fit flex flex-row align-middle items-center justify-start gap-4">
                  <IronIcon /> Planchar máximo 110ºC
                </div>
                <div className="h-fit flex flex-row align-middle items-center justify-start gap-4">
                  <NotInterestedIcon /> No limpieza en seco
                </div>
                <div className="h-fit flex flex-row align-middle items-center justify-start gap-4">
                  <DryCleaningIcon /> No usar secadora
                </div>
                <br />
                <p className="text-3xl font-light h-fit uppercase">Origen</p>
                <h4 className="text-justify text-lg w-full h-fit">
                  Trabajamos con nuestros proveedores, trabajadores, sindicatos
                  y organismos internacionales para desarrollar una cadena de
                  suministro en la que se respetan y promueven los derechos
                  humanos, contribuyendo a los Objetivos de Desarrollo
                  Sostenible de Naciones Unidas.
                </h4>
                <h4 className="text-justify text-lg w-full h-fit">
                  Gracias a la colaboración con nuestros proveedores, trabajamos
                  para conocer las instalaciones y procesos que se emplean para
                  fabricar nuestras prendas con el objetivo de conocer la
                  trazabilidad de nuestros productos.
                </h4>
                <h4 className="text-justify text-lg w-full h-fit">
                  Hecho en Portugal
                </h4>
              </div>
            </div>

            <div className="max-lg:hidden grid col-span-1 md:col-span-2 lg:col-span-1 px-5 py-4 max-lg:pt-8 max-lg:mt-20 max-lg:border-t-2 lg:border-l-2 border-slate-400">
              <div className="h-[72vh] overflow-scroll pr-5 flex flex-col gap-3">
                <h1 className="text-3xl uppercase font-light h-fit">
                  Composición, cuidados & origen
                </h1>
                <br />
                <p className="text-3xl font-light h-fit uppercase">
                  Composición
                </p>
                <h4 className="text-justify text-lg w-full h-fit">
                  Trabajamos con programas de seguimiento para garantizar el
                  cumplimiento de nuestros estándares sociales, medioambientales
                  y de seguridad y salud de nuestras prendas.
                </h4>
                <h4 className="text-justify text-lg w-full h-fit">
                  Para evaluar su cumplimiento hemos desarrollado un programa de
                  auditorías y planes de mejora continua.
                </h4>
                <p className="h-fit uppercase">Exterior </p>
                <p className="h-fit">95% algodón</p>
                <p className="h-fit">5% elastano</p>
                <br />
                <p className="text-3xl font-light h-fit uppercase">Cuidados</p>
                <h4 className="text-justify text-lg w-full h-fit">
                  Cuidar de tus prendas es cuidar del medioambiente.
                </h4>
                <h4 className="text-justify text-lg w-full h-fit">
                  Para alargar la vida de tus prendas de denim lávalas siempre a
                  bajas temperaturas y del revés, de esta forma ayudamos a
                  preservar los colores, la estructura del tejido y reducimos el
                  consumo de energía.
                </h4>
                <div className="h-fit flex flex-row align-middle items-center justify-start gap-4">
                  <WavesIcon /> Lavar a máquina max. 30ºC. Centrifugado corto
                </div>
                <div className="h-fit flex flex-row align-middle items-center justify-start gap-4">
                  <DetailsIcon /> No usar lejía / blanqueador
                </div>
                <div className="h-fit flex flex-row align-middle items-center justify-start gap-4">
                  <IronIcon /> Planchar máximo 110ºC
                </div>
                <div className="h-fit flex flex-row align-middle items-center justify-start gap-4">
                  <NotInterestedIcon /> No limpieza en seco
                </div>
                <div className="h-fit flex flex-row align-middle items-center justify-start gap-4">
                  <DryCleaningIcon /> No usar secadora
                </div>
                <br />
                <p className="text-3xl font-light h-fit uppercase">Origen</p>
                <h4 className="text-justify text-lg w-full h-fit">
                  Trabajamos con nuestros proveedores, trabajadores, sindicatos
                  y organismos internacionales para desarrollar una cadena de
                  suministro en la que se respetan y promueven los derechos
                  humanos, contribuyendo a los Objetivos de Desarrollo
                  Sostenible de Naciones Unidas.
                </h4>
                <h4 className="text-justify text-lg w-full h-fit">
                  Gracias a la colaboración con nuestros proveedores, trabajamos
                  para conocer las instalaciones y procesos que se emplean para
                  fabricar nuestras prendas con el objetivo de conocer la
                  trazabilidad de nuestros productos.
                </h4>
                <h4 className="text-justify text-lg w-full h-fit">
                  Hecho en Portugal
                </h4>
              </div>
            </div>
            <div className="max-md:hidden absolute -bottom-3 left-32">
              <ContentCutIcon />
            </div>
          </div>

          <div className="mt-24 lg:mt-20 uppercase">
            <h4 className="text-center my-10 text-2xl font-semibold">
              Más artículos que podrían gustarte
            </h4>
            <div className="marquee max-lg:h-72 lg:h-72 flex flex-row align-middle items-center">
              <div className="products-container track">
                {productsData.map((item) => (
                  <div className="mx-2" key={item._id}>
                    <Link href={`/store/product/${item._id}`}>
                      <div className="product-card">
                        <Image
                          src={item.image[0]}
                          alt=""
                          width={300}
                          height={300}
                          className="product-image shadow-sm"
                        />
                        <div className="flex flex-row justify-between">
                          <p className="font-light text-xs uppercase">
                            {item.name}
                          </p>
                          <p className="font-bold text-xs text-slate-700">
                            {item.price.toFixed(2)} EUR
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={() => router.back()}
          className="flex gap-2 hover:text-orange-600 transition ease-in-out duration-200 font-semibold uppercase text-2xl align-middle items-center w-40 m-5 mt-10"
        >
          <ArrowBack /> Volver
        </button>
      </>
    ) : (
      <NotFound />
    )
  ) : (
    <Loader value={"producto"} />
  );
};

export default ProductDetails;
