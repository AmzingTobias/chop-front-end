"use client";

import {
  TBaseProduct,
  TProductType,
  getAllBaseProducts,
} from "@/app/data/products";
import { useEffect, useState } from "react";
import UpdateBaseProductDescription from "./UpdateBaseProductDescription";
import Link from "next/link";
import UpdateBaseProductBrand from "./UpdateBaseProductBrand";

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
    <div className="flex flex-col gap-4 w-full">
      <Link
        className="w-full bg-accent hover:opacity-80 text-accent-foreground rounded-md p-2"
        href={"/admin/base-products"}
      >
        Back
      </Link>
      <hr className="border-[1px] border-accent bg-accent" />
      <UpdateBaseProductDescription baseProduct={baseProduct} />
      <hr className="border-[1px] border-accent bg-accent" />
      <UpdateBaseProductBrand
        baseProductId={baseProduct.id}
        fetchedBrandName={baseProduct.brandName}
      />
    </div>
  );
};

export default BaseProductSideBar;
