"use client";

import { useCallback, useEffect, useState } from "react";
import BaseProductsTable from "./BaseProductsTable";
import Sidebar from "./Sidebar";
import { TBaseProduct } from "@/app/data/products";
import { getBaseProductsWithBrand } from "@/app/data/brands";
import { EAccountTypes } from "@/app/data/auth";

interface IBrandProductContentProps {
  brandId: number;
  accountTypeLoggedIn: EAccountTypes.admin | EAccountTypes.sales;
}

const BrandProductContent: React.FC<IBrandProductContentProps> = ({
  brandId,
  accountTypeLoggedIn,
}) => {
  const useBaseProducts = () => {
    const [baseProducts, setBaseProducts] = useState<TBaseProduct[]>([]);

    const refreshProducts = useCallback(() => {
      getBaseProductsWithBrand(brandId)
        .then((baseProductsFetched) => setBaseProducts(baseProductsFetched))
        .catch((err) => {
          console.error(err);
          setBaseProducts([]);
        });
    }, []);

    useEffect(() => {
      refreshProducts();
    }, [refreshProducts]);
    return { baseProducts, refreshProducts };
  };

  const { baseProducts, refreshProducts } = useBaseProducts();

  return (
    <div className="w-full flex flex-row">
      <div className="pr-6 w-full">
        <BaseProductsTable
          fetchedBaseProducts={baseProducts}
          accountTypeLoggedIn={accountTypeLoggedIn}
        />
      </div>
      <div className="min-w-fit border-l-2 border-accent pl-6">
        <Sidebar brandId={brandId} refreshProducts={refreshProducts} />
      </div>
    </div>
  );
};

export default BrandProductContent;
