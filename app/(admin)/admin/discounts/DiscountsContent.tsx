"use client";

import { TDiscountCodeEntry, getAllDiscountCodes } from "@/app/data/discounts";
import { useEffect, useState } from "react";
import DiscountsTable from "./DiscountsTable";
import Sidebar from "./Sidebar";

const DiscountsContent = () => {
  const useDiscounts = () => {
    const [discounts, setDiscounts] = useState<TDiscountCodeEntry[]>([]);
    const refreshCodes = () => {
      getAllDiscountCodes()
        .then((codes) => setDiscounts(codes))
        .catch((err) => {
          console.error(err);
          setDiscounts([]);
        });
    };

    useEffect(() => {
      refreshCodes();
    }, []);
    return { discounts, refreshCodes };
  };

  const { discounts: discountCodes, refreshCodes } = useDiscounts();

  return (
    <div className="w-full flex flex-row">
      <div className="pr-6 w-full">
        <DiscountsTable discountCodesFetched={discountCodes} />
      </div>
      <div className="min-w-fit border-l-2 border-accent pl-6">
        <Sidebar discountCodes={discountCodes} refreshCodes={refreshCodes} />
      </div>
    </div>
  );
};

export default DiscountsContent;
