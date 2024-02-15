"use client";

import { TDiscountCodeEntry, getAllDiscountCodes } from "@/app/data/discounts";
import { useEffect, useState } from "react";
import DiscountsTable from "./DiscountsTable";

const DiscountsContent = () => {
  const useDiscounts = () => {
    const [discounts, setDiscounts] = useState<TDiscountCodeEntry[]>([]);
    useEffect(() => {
      getAllDiscountCodes()
        .then((codes) => setDiscounts(codes))
        .catch((err) => {
          console.error(err);
          setDiscounts([]);
        });
    }, []);
    return discounts;
  };

  const discountCodes = useDiscounts();

  return (
    <div>
      <DiscountsTable discountCodesFetched={discountCodes} />
    </div>
  );
};

export default DiscountsContent;
