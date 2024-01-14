"use client";

import {
  IProductEntryWithImages,
  getFavouriteProducts,
  removeProductFromFavourite,
} from "@/app/data/products";
import { useEffect, useState } from "react";
import MiniProductCard from "@/app/components/product-cards/MiniProductCard";
import { BsX } from "react-icons/bs";

interface IFavouriteProductsProps {
  customerLoggedIn: boolean;
}

const FavouriteProducts: React.FC<IFavouriteProductsProps> = ({
  customerLoggedIn,
}) => {
  const [products, setProducts] = useState<IProductEntryWithImages[]>([]);

  useEffect(() => {
    getFavouriteProducts()
      .then((products) => {
        setProducts(products);
      })
      .catch((err) => {
        console.error(err);
        setProducts([]);
      });
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-28 gap-y-12 sm:gap-x-2 lg:grid-cols-3 lg:gap-x-2 xl:grid-cols-4 xl:gap-x-4 2xl:grid-cols-5 2xl:gap-x-4">
      {products.map((product) => {
        return (
          <div key={product.productId} className="w-full flex grow">
            <div className="min-w-[250px] relative flex grow">
              <MiniProductCard
                customerLoggedIn={customerLoggedIn}
                productId={product.productId}
                productPageLink={product.productPageLink}
                productName={product.productName}
                brandName={product.brandName}
                brandId={product.brandId}
                productAvailable={product.productAvailable}
                productStockCount={product.productStockCount}
                productDescription={
                  typeof product.productDescription === "string"
                    ? product.productDescription
                    : ""
                }
                productPrice={product.productPrice}
                image={product.image}
                imageWidth={600}
                imageHeight={600}
              />
              <div
                className="cursor-pointer absolute top-0 right-0 text-secondary text-2xl bg-accent rounded-full m-1 p-0.5 hover:opacity-80"
                onClick={() => {
                  removeProductFromFavourite(product.productId).then(
                    (removed) => {
                      if (removed) {
                        setProducts((prevProducts) =>
                          prevProducts.filter(
                            (value) => value.productId !== product.productId
                          )
                        );
                      }
                    }
                  );
                }}
              >
                <BsX />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FavouriteProducts;
