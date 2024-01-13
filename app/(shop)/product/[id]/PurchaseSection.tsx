"use client";

import AddToBasketBtn from "@/app/components/product-cards/common/AddToBasketBtn";
import PriceLabel from "@/app/components/product-cards/common/PriceLabel";
import { useEffect, useState } from "react";
import QuantityControlBtns from "@/app/components/products/QuantityControlBtns";
import { IProductEntryWithImages } from "@/app/data/products";
import SimilarStyleProductsList from "./SimilarStyleProductsList";
import { useSelector } from "react-redux";

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

  const { loading, basketItems } = useSelector(
    (state: {
      basket: {
        loading: boolean;
        basketItems: {
          productId: number;
          quantity: number;
        }[];
      };
    }) => state.basket
  );

  const [customerCanBuyProduct, setCustomerCanBuyProduct] = useState(false);
  const [quantityInBasketAlready, setQuantityInBasketAlready] = useState(0);
  useEffect(() => {
    if (!loading) {
      const productInBasketAlready = basketItems.find(
        (item) => item.productId === productId
      );
      setQuantityInBasketAlready(
        productInBasketAlready === undefined
          ? 0
          : productInBasketAlready.quantity
      );
    }
  }, [loading, basketItems, productId]);

  useEffect(() => {
    if (!loading) {
      setCustomerCanBuyProduct(
        productStockCount > quantityInBasketAlready &&
          productStockCount > 0 &&
          productAvailable
      );
    }
  }, [productStockCount, quantityInBasketAlready, productAvailable, loading]);

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
            disabled={!customerCanBuyProduct}
            maxQuantityAllowed={productStockCount - quantityInBasketAlready}
            quantityAmount={quantityToAddToBasket}
            increaseQuantity={() =>
              setQuantityToAddToBasket((prev) => prev + 1)
            }
            decreaseQuantity={() =>
              setQuantityToAddToBasket((prev) => (prev === 1 ? 1 : prev - 1))
            }
          />
          <AddToBasketBtn
            productAvailable={productAvailable}
            productStockCount={productStockCount}
            disabled={!customerCanBuyProduct}
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
