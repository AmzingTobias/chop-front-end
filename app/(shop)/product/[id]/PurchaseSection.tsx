"use client";

import AddToBasketBtn from "@/app/components/product-cards/common/AddToBasketBtn";
import PriceLabel from "@/app/components/product-cards/common/PriceLabel";
import { useState } from "react";
import QuantityControlBtns from "@/app/components/products/QuantityControlBtns";
import { IProductEntryWithImages } from "@/app/data/products";
import SimilarStyleProductsList from "./SimilarStyleProductsList";

interface IPurchaseSectionProps {
  productId: number;
  price: number;
  similarStyleProducts: IProductEntryWithImages[];
}

const PurchaseSection: React.FC<IPurchaseSectionProps> = ({
  productId,
  price,
  similarStyleProducts,
}) => {
  const [quantityToAddToBasket, setQuantityToAddToBasket] = useState(1);

  return (
    <div className="w-full flex flex-col space-y-2 p-2 bg-primary text-accent rounded-md h-fit">
      <SimilarStyleProductsList
        currentProductId={productId}
        products={similarStyleProducts}
      />
      <PriceLabel className="font-bold text-2xl" price={price} />
      <QuantityControlBtns
        quantityAmount={quantityToAddToBasket}
        increaseQuantity={() => setQuantityToAddToBasket((prev) => prev + 1)}
        decreaseQuantity={() =>
          setQuantityToAddToBasket((prev) => (prev === 1 ? 1 : prev - 1))
        }
      />
      <AddToBasketBtn
        productId={productId}
        quantityToAdd={quantityToAddToBasket}
      />
      {/* TODO - Make buy it now button */}
      <AddToBasketBtn
        productId={productId}
        quantityToAdd={quantityToAddToBasket}
      />
    </div>
  );
};

export default PurchaseSection;
