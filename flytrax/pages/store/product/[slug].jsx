import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { Product } from "../../../components";
import { useRouter } from "next/router";
import { productsData } from "../../../assets/dummy/dummyDatos";
import { Banner } from "../../../components";
import NotFound from "../../404";
import { useStateContext } from "../../../context/StateContext";
import ClipLoader from "react-spinners/ClipLoader";
import WavesIcon from "@mui/icons-material/Waves";
import DetailsIcon from "@mui/icons-material/Details";
import IronIcon from "@mui/icons-material/Iron";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import DryCleaningIcon from "@mui/icons-material/DryCleaning";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import classNames from "classnames";
import { ArrowBack } from "@mui/icons-material";

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

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (!router.isReady) return;
    productsData.map(function (item) {
      if (item._id === parseInt(slug)) {
        setActualProduct(item);
        setIsLoading(false);
      }
    });
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.slug, router.isReady]);

  const [index, setIndex] = useState(0);

  const { image, name, price, description } = actualProduct;

  const { restarCantidad, sumarCantidad, qty, onAdd, setShowCart } =
    useStateContext();

  const handleBuyNow = () => {
    onAdd(actualProduct, qty);
    setShowCart(true); //para que nos lleve a mostrar el carrito directamente
  };

  return actualProduct.name ? (
    <div className="max-w-[1400px] m-auto w-full mt-24 py-20">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full gap-5">
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
                    i === index ? "small-image selected-image" : "small-image"
                  }
                  onMouseEnter={() => setIndex(i)} //cambiamos la que esta mostrandose
                />
              </div>
            ))}
          </div>
        </div>

        <div className="grid col-span-1 xl:col-span-2 py-4 max-lg:px-5 lg:w-5/6">
          <div className="flex flex-col gap-3 justify-between">
            <div>
              <h1 className="text-3xl uppercase font-light h-fit">{name}</h1>
              <p className="text-3xl font-bold h-fit">{price} EUR</p>
              <h4 className="text-justify mt-10 text-lg w-full h-fit">
                {description}
              </h4>
            </div>
            <div className="flex flex-row justify-between max-sm:mt-10">
              <div className="w-32">
                <h3 className="text-lg uppercase">Cantidad</h3>
                <p className="flex-row flex items-center mt-1">
                  <span
                    className="mr-2 text-2xl cursor-pointer hover:text-orange-600 transition ease-in duration-200"
                    onClick={restarCantidad}
                  >
                    <AiOutlineMinus />
                  </span>
                  <span className="mx-2 text-2xl">{qty}</span>
                  <span
                    className="mx-2 text-2xl cursor-pointer hover:text-orange-600 transition ease-in duration-200"
                    onClick={sumarCantidad}
                  >
                    <AiOutlinePlus />
                  </span>
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  className="p-2 rounded-md text-white bg-black hover:bg-gray-700  transition ease-in-out duration-300 uppercase"
                  onClick={() => onAdd(actualProduct, qty)}
                >
                  Añadir a la cesta
                </button>

                <button
                  className="p-2 rounded-md hover:bg-orange-900 transition ease-in-out duration-300 text-slate-50 font-bold bg-orange-600 uppercase"
                  onClick={handleBuyNow}
                >
                  Comprar ya
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:hidden grid col-span-1 md:col-span-2 lg:col-span-1 px-5 py-4 max-lg:pt-8 max-lg:mt-20 lg:border-l-2">
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
            <p className="text-3xl font-light h-fit uppercase">Composición</p>
            <h4 className="text-justify text-lg w-full h-fit">
              Trabajamos con programas de seguimiento para garantizar el
              cumplimiento de nuestros estándares sociales, medioambientales y
              de seguridad y salud de nuestras prendas.
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
              bajas temperaturas y del revés, de esta forma ayudamos a preservar
              los colores, la estructura del tejido y reducimos el consumo de
              energía.
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
              Trabajamos con nuestros proveedores, trabajadores, sindicatos y
              organismos internacionales para desarrollar una cadena de
              suministro en la que se respetan y promueven los derechos humanos,
              contribuyendo a los Objetivos de Desarrollo Sostenible de Naciones
              Unidas.
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
            <p className="text-3xl font-light h-fit uppercase">Composición</p>
            <h4 className="text-justify text-lg w-full h-fit">
              Trabajamos con programas de seguimiento para garantizar el
              cumplimiento de nuestros estándares sociales, medioambientales y
              de seguridad y salud de nuestras prendas.
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
              bajas temperaturas y del revés, de esta forma ayudamos a preservar
              los colores, la estructura del tejido y reducimos el consumo de
              energía.
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
              Trabajamos con nuestros proveedores, trabajadores, sindicatos y
              organismos internacionales para desarrollar una cadena de
              suministro en la que se respetan y promueven los derechos humanos,
              contribuyendo a los Objetivos de Desarrollo Sostenible de Naciones
              Unidas.
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
      </div>

      <div className="products-wrapper uppercase">
        <h4 className="text-center my-10 text-2xl font-semibold">
          Más artículos que podrían gustarte
        </h4>
        <div className="marquee">
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

      <button
        onClick={() => router.back()}
        className="flex gap-2 hover:text-orange-600 transition ease-in-out duration-200 font-semibold uppercase text-2xl align-middle items-center w-40 m-5"
      >
        <ArrowBack /> Volver
      </button>
    </div>
  ) : (
    <>
      {!loading ? (
        <div className="flex items-center justify-center">
          <NotFound />
        </div>
      ) : (
        <div className="max-w-[1400px] m-auto w-full my-24 py-20">
          <div className="flex items-center justify-center">
            <ClipLoader
              loading={loading}
              size={100}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
