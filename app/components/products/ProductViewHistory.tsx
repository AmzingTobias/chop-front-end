"use client";

import {
  IProductEntryWithImages,
  getProductViewHistoryForCustomer,
  removeProductFromViewHistory,
} from "@/app/data/products";
import { useEffect, useState } from "react";
import ProductCarousel from "../product-cards/ProductCarousel";

interface IProductViewHistoryProps {
  customerLoggedIn: boolean;
  imageWidth: number;
  imageHeight: number;
}

const ProductViewHistory: React.FC<IProductViewHistoryProps> = ({
  customerLoggedIn,
  imageWidth,
  imageHeight,
}) => {
  const [products, setProducts] = useState<IProductEntryWithImages[]>([]);

  useEffect(() => {
    getProductViewHistoryForCustomer()
      .then((productHistory) => {
        setProducts(productHistory);
      })
      .catch((err) => {
        console.error(err);
        setProducts([]);
      });
  }, []);

  const removeFromViewHistory = (productId: number) => {
    removeProductFromViewHistory(productId)
      .then((removed) => {
        if (removed) {
          setProducts((prevProducts) =>
            prevProducts.filter((product) => product.productId !== productId)
          );
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      {products.length > 0 ? (
        <ProductCarousel
          customerLoggedIn={customerLoggedIn}
          products={products}
          imageWidth={imageWidth}
          imageHeight={imageHeight}
          removeFromViewHistory={removeFromViewHistory}
        />
      ) : (
        <div className="w-full text-center text-2xl font-semibold bg-primary p-4 rounded-md shadow-md">
          Nothing here yet
        </div>
      )}
    </div>
  );
};

export default ProductViewHistory;
