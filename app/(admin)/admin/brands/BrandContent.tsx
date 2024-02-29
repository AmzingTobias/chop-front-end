"use client";

import { TBrandEntry, getAllBrands } from "@/app/data/brands";
import { useEffect, useState } from "react";
import BrandsTable from "./BrandsTable";
import Sidebar from "./Sidebar";
import { EAccountTypes } from "@/app/data/auth";

interface IBrandContentProps {
  accountTypeLoggedIn: EAccountTypes.admin | EAccountTypes.sales;
}

const BrandContent: React.FC<IBrandContentProps> = ({
  accountTypeLoggedIn,
}) => {
  const useBrands = () => {
    const [brands, setBrands] = useState<TBrandEntry[]>([]);
    const refreshBrands = () => {
      getAllBrands()
        .then((brandsFetched) => setBrands(brandsFetched))
        .catch((err) => {
          console.error(err);
          setBrands([]);
        });
    };
    useEffect(() => {
      refreshBrands();
    }, []);
    return { brands, refreshBrands };
  };

  const { brands: brandsFetched, refreshBrands } = useBrands();

  return (
    <div className="w-full flex flex-row">
      <div className="pr-6 w-full">
        <BrandsTable
          brandsFetched={brandsFetched}
          accountTypeLoggedIn={accountTypeLoggedIn}
        />
      </div>
      <div className="min-w-fit border-l-2 border-accent pl-6">
        <Sidebar refreshBrands={refreshBrands} />
      </div>
    </div>
  );
};

export default BrandContent;
