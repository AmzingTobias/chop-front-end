"use client";

import { TProductType, getProductTypes } from "@/app/data/products";
import { useEffect, useState } from "react";
import ProductTypesTable from "./ProductTypesTable";
import Sidebar from "./Sidebar";
import { EAccountTypes } from "@/app/data/auth";

interface IProductTypesContentProps {
  accountTypeLoggedIn: EAccountTypes.admin | EAccountTypes.sales;
}

const ProductTypesContent: React.FC<IProductTypesContentProps> = ({
  accountTypeLoggedIn,
}) => {
  const useProductTypes = () => {
    const [productTypes, setProductTypes] = useState<TProductType[]>([]);
    const refreshProductTypes = () => {
      getProductTypes()
        .then((productTypes) => setProductTypes(productTypes))
        .catch((err) => {
          console.error(err);
          setProductTypes([]);
        });
    };
    useEffect(() => {
      refreshProductTypes();
    }, []);
    return { productTypes, refreshProductTypes };
  };

  const { productTypes: productTypesFetched, refreshProductTypes } =
    useProductTypes();

  return (
    <div className="w-full flex flex-row">
      <div className="pr-6 w-full">
        <ProductTypesTable
          productTypesFetched={productTypesFetched}
          accountTypeLoggedIn={accountTypeLoggedIn}
        />
      </div>
      <div className="min-w-fit border-l-2 border-accent pl-6">
        <Sidebar refreshProductTypes={refreshProductTypes} />
      </div>
    </div>
  );
};

export default ProductTypesContent;
