"use client";

import {
  TBaseProduct,
  getBaseProductsWithProductType,
} from "@/app/data/products";
import { useCallback, useEffect, useState } from "react";
import BaseProductsTable from "../../brands/[brandId]/BaseProductsTable";
import Sidebar from "./Sidebar";
import { EAccountTypes } from "@/app/data/auth";

interface IProductTypeProductContentProps {
  productTypeId: number;
  accountTypeLoggedIn: EAccountTypes.admin | EAccountTypes.sales;
}

const ProductTypeProductContent: React.FC<IProductTypeProductContentProps> = ({
  productTypeId,
  accountTypeLoggedIn,
}) => {
  const useBaseProducts = () => {
    const [baseProducts, setBaseProducts] = useState<TBaseProduct[]>([]);

    const refreshProducts = useCallback(() => {
      getBaseProductsWithProductType(productTypeId)
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
        <Sidebar
          productTypeId={productTypeId}
          refreshProducts={refreshProducts}
        />
      </div>
    </div>
  );
};

export default ProductTypeProductContent;
