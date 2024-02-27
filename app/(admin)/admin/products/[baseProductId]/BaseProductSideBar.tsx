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
import UpdateBaseProductProductType from "./UpdateBaseProductProductType";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

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
    <div className="h-full flex flex-col gap-4 w-full">
      <div className="flex flex-col gap-2">
        <Link
          className="w-full bg-secondary hover:opacity-80 text-secondary-foreground rounded-md p-2"
          href={`/admin/products/${baseProductId}/create`}
        >
          Create new product
        </Link>
      </div>
      <hr className="border-[1px] border-accent bg-accent" />
      <ScrollArea className="pr-4">
        <div className="flex flex-col gap-4">
          <UpdateBaseProductDescription baseProduct={baseProduct} />
          <hr className="border-[1px] border-accent bg-accent" />
          <UpdateBaseProductBrand
            baseProductId={baseProduct.id}
            fetchedBrandName={baseProduct.brandName}
          />
          <hr className="border-[1px] border-accent bg-accent" />
          <UpdateBaseProductProductType baseProductId={baseProduct.id} />
        </div>
      </ScrollArea>
    </div>
  );
};

export default BaseProductSideBar;
