import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { productsData } from "../assets/dummy/dummyDatos";

const ProductCard = () => {
  return (
    <div className="mt-32">
        <div className='flex flex-wrap justify-center mt-5 w-full gap-4'>
        {productsData.map((product) => (
            <div key={product._id} className='mx-2'>
                <Link href={`/store/product/${product._id}`}>
                    <div className="product-card">
                        <Image 
                            src={product.image[0]}
                            alt=""
                            width={350}
                            height={350}
                            className="product-image"
                        />
                        <p className="font-medium">{product.name}</p>
                        <p className="font-extrabold mt-1 text-black">${product.price.toFixed(2)}</p>
                    </div>
                </Link>
            </div>
        ))}
        </div>
    </div>
  );
};

export default ProductCard;