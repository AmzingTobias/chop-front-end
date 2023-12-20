"use client";

import AddToBasketBtn from "@/app/components/product-cards/common/AddToBasketBtn";
import PriceLabel from "@/app/components/product-cards/common/PriceLabel";
import { useState } from "react";
import QuantityControlBtns from "@/app/components/products/QuantityControlBtns";

interface IPurchaseSectionProps {
  productId: number;
  price: number;
}

const PurchaseSection: React.FC<IPurchaseSectionProps> = ({
  productId,
  price,
}) => {
  const [quantityToAddToBasket, setQuantityToAddToBasket] = useState(1);

  return (
    <div className="w-full flex flex-col space-y-2 p-2 bg-primary text-accent rounded-md h-fit">
      <PriceLabel className="font-bold text-2xl" price={price} />
      <QuantityControlBtns
        quantityAmount={quantityToAddToBasket}
        increaseQuantity={() => setQuantityToAddToBasket((prev) => prev + 1)}
        decreaseQuantity={() =>
          setQuantityToAddToBasket((prev) => (prev === 1 ? 1 : prev - 1))
        }
      />
      <AddToBasketBtn productId={productId} />
      <AddToBasketBtn productId={productId} />
    </div>
  );
};

export default PurchaseSection;
