"use client";

import {
  TBaseProduct,
  TProductType,
  getAllBaseProducts,
} from "@/app/data/products";
import { useEffect, useState } from "react";
import UpdateBaseProductDescription from "./UpdateBaseProductDescription";

interface IBaseProductBar {
  baseProductId: number;
  productTypes: TProductType[];
}

const BaseProductSideBar: React.FC<IBaseProductBar> = ({
  baseProductId,
  productTypes,
}) => {
  const useBaseProduct = () => {
    const [baseProduct, setBaseProduct] = useState<TBaseProduct>();
    useEffect(() => {
      getAllBaseProducts()
        .then((baseProducts) => {
          const currentBaseProduct = baseProducts.find(
            (baseProduct) => baseProduct.id == baseProductId
          );
          setBaseProduct(currentBaseProduct);
        })
        .catch((err) => {
          console.error(err);
          setBaseProduct(undefined);
        });
    }, []);
    return baseProduct;
  };

  const baseProduct = useBaseProduct();
  if (baseProduct === undefined) {
    return null;
  }

  return (
    <div className="w-full">
      <UpdateBaseProductDescription baseProduct={baseProduct} />
    </div>
  );
};

export default BaseProductSideBar;
