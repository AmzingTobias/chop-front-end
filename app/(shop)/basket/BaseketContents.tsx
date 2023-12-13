"use client";

import noProductImage from "@/public/no-product.png";
import { getProductImages } from "@/app/data/images";
import { getProductWithId } from "@/app/data/products";
import { useEffect, useState } from "react";
import BasketEntry from "./BasketEntry";
import { TImageDetails } from "@/app/components/product-cards/common/ProductImageWithHover";
import { useSelector } from "react-redux";
import BasketCheckoutSection from "./BasketCheckoutSection";

const BasketContents = () => {
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

  const [basket, setBasket] = useState<
    Array<{
      productId: number;
      productName: string;
      productImage: TImageDetails;
      productPrice: number;
      quantity: number;
    } | null>
  >([]);

  useEffect(() => {
    async function fetchData() {
      const updatedBasket = await Promise.all(
        basketItems.map(async (item) => {
          const product = await getProductWithId(item.productId);

          if (!product) {
            // Handle the case where getProductWithId returns undefined
            console.error(`Product with id ${item.productId} not found.`);
            return null;
          }
          const productImages = await getProductImages(product.id);
          return {
            productId: product.id,
            productName: product.name,
            productImage: {
              primaryLink:
                productImages.length > 0
                  ? `${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/images/products/${product.id}/${productImages[0].fileName}`
                  : noProductImage.src,
              hoverLink: undefined,
              width: 150,
              height: 255,
              altText: "PRODUCT",
            },
            productPrice: product.price,
            quantity: item.quantity,
          };
        })
      );

      // Filter out null values before updating the state
      setBasket(updatedBasket.filter((product) => product !== null));
    }
    if (!loading) {
      fetchData();
    }
  }, [loading, basketItems]);

  return (
    <div className="flex flex-col-reverse md:flex-row w-full space-y-4 space-y-reverse md:space-y-0 md:space-x-4 xl:space-x-12">
      <div className="flex flex-col space-y-4 md:space-y-8 w-full md:w-3/4">
        {basket.map(
          (product, index) =>
            product && (
              <BasketEntry
                key={index}
                productId={product.productId}
                productName={product.productName}
                productPrice={product.productPrice}
                quantity={product.quantity}
                productImage={product.productImage}
              />
            )
        )}
      </div>
      <div className="flex w-full md:w-1/4">
        <BasketCheckoutSection
          numInBasket={basket.reduce(
            (prev: number, current: any) => prev + current.quantity,
            0
          )}
          subTotal={basket.reduce((prev, current) => {
            if (current) {
              return prev + current.productPrice * current.quantity;
            } else {
              return prev;
            }
          }, 0)}
        />
      </div>
    </div>
  );
};

export default BasketContents;
