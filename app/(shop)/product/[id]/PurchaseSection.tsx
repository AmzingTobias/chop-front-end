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
  productAvailable: boolean;
  productStockCount: number;
}

const PurchaseSection: React.FC<IPurchaseSectionProps> = ({
  productId,
  productAvailable,
  productStockCount,
  price,
  similarStyleProducts,
}) => {
  const [quantityToAddToBasket, setQuantityToAddToBasket] = useState(1);

  return (
    <div className="w-full flex flex-col gap-1 p-2 bg-primary text-accent rounded-md h-fit">
      <SimilarStyleProductsList
        currentProductId={productId}
        products={similarStyleProducts}
      />
      <PriceLabel className="font-bold text-2xl" price={price} />
      {!productAvailable ? (
        <p className="font-bold italic">Product temporarily unavailable</p>
      ) : (
        productStockCount <= 0 && (
          <p className="font-bold italic">Product out of stock</p>
        )
      )}
      {productAvailable && productStockCount > 0 && (
        <>
          {productStockCount < 100 && (
            <p className="font-bold">Only {productStockCount} remaining!</p>
          )}
          <QuantityControlBtns
            disabled={!productAvailable || productStockCount <= 0}
            maxQuantityAllowed={productStockCount}
            quantityAmount={quantityToAddToBasket}
            increaseQuantity={() =>
              setQuantityToAddToBasket((prev) => prev + 1)
            }
            decreaseQuantity={() =>
              setQuantityToAddToBasket((prev) => (prev === 1 ? 1 : prev - 1))
            }
          />
          <AddToBasketBtn
            disabled={!productAvailable || productStockCount <= 0}
            productId={productId}
            quantityToAdd={quantityToAddToBasket}
          />
        </>
      )}
      {/* TODO - Make buy it now button */}
      {/* <AddToBasketBtn
        productId={productId}
        quantityToAdd={quantityToAddToBasket}
      /> */}
    </div>
  );
};

export default PurchaseSection;
