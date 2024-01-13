"use client";

import {
  IProductEntryWithImages,
  getProductViewHistoryForCustomer,
} from "@/app/data/products";
import { useEffect, useState } from "react";
import ProductCarousel from "../product-cards/ProductCarousel";

interface IProductViewHistoryProps {
  imageWidth: number;
  imageHeight: number;
}

const ProductViewHistory: React.FC<IProductViewHistoryProps> = ({
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

  return (
    <div>
      {products.length > 0 ? (
        <ProductCarousel
          products={products}
          imageWidth={imageWidth}
          imageHeight={imageHeight}
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
