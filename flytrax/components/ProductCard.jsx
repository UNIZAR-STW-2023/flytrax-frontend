import React from "react";
import Link from "next/link";
import Image from "next/image";
import { productsData } from "../assets/dummy/dummyDatos";

const ProductCard = () => {
  return (
    <div>
      <div className="flex flex-wrap justify-center mt-5 w-full gap-3">
        {productsData.map((product) => (
          <div key={product._id} className="mx-2 my-2">
            <div>
              <div className="product-image shadow-sm">
                <Link href={`/store/product/${product._id}`}>
                  <Image
                    src={product.image[0]}
                    alt="Image"
                    width={350}
                    height={350}
                  />
                </Link>
              </div>
              <div className="flex flex-row justify-between">
                <p className="font-light text-sm uppercase">{product.name}</p>
                <p className="font-bold text-sm text-right text-slate-700">
                  {product.price.toFixed(2)} EUR
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCard;
