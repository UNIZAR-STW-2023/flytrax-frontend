/*
  File's name: /product/[slug].jsx
  Authors: Paul Huszak & Guillermo Cánovas 
  Date: 16/05/2023
*/

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { Product } from "../../../components";
import { useRouter } from "next/router";
import { productsData } from "../../../assets/dummy/dummyDatos";
import { Banner } from "../../../components";
import { useStateContext } from "../../../context/StateContext";
import ClipLoader from "react-spinners/ClipLoader";

const ProductDetails = () => {
  const router = useRouter();
  const { slug } = router.query;

  const [actualProduct, setActualProduct] = useState({});
  const [loading, setIsLoading] = useState(true);

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
    <div className="max-w-[1400px] m-auto w-full my-24 py-20">
      <div className="product-detail-container">
        <div>
          <div>
            <Image
              alt="Product Image"
              src={image && image[index]}
              width={500}
              height={500}
              className="product-detail-image w-96 h-96"
            />
          </div>

          {/* mapear todas las imagenes del producto */}
          <div className="small-images-container">
            {image?.map((item, i) => (
              <div key={i}>
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

        <div>
          <h1 className="text-2xl font-bold mb-3">{name}</h1>
          <h4 className="text-lg w-96 mb-3">{description}</h4>
          <p className="text-3xl font-extrabold mb-7">{price}€</p>
          <div>
            <h3 className="text-lg">Cantidad:</h3>
            <p className="flex-row flex items-center mt-1">
              <span className="mr-2 text-2xl" onClick={restarCantidad}>
                <AiOutlineMinus />
              </span>
              <span className="mx-2 text-2xl">{qty}</span>
              <span className="mx-2 text-2xl" onClick={sumarCantidad}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>

          <div className="flex gap-5 mt-5">
            <button
              className="text-blue-700 border-2 border-blue-700 ease-in-out duration-200 hover:scale-125 transition w-full lg:max-w-[150px] h-16  rounded-lg flex justify-center items-center text-lg"
              onClick={() => onAdd(actualProduct, qty)}
            >
              Añadir
            </button>

            <button
              className="bg-blue-700 ease-in-out duration-200 hover:scale-125 transition w-full lg:max-w-[150px] h-16 rounded-lg flex justify-center items-center text-white text-lg"
              onClick={handleBuyNow}
            >
              Comprar ya
            </button>
          </div>
        </div>
      </div>

      <div className="products-wrapper">
        <h2>Más artículos que podrían gustarte</h2>
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
                      className="product-image"
                    />
                    <p className="font-medium mt-2">{item.name}</p>
                    <p className="font-bold text-black">{item.price}€</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="max-w-[1400px] m-auto w-full my-24 py-20">
      <div className="flex items-center justify-center">
        {!loading ? (
          <div>Este producto no existe</div>
        ) : (
          <ClipLoader
            loading={loading}
            size={100}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
