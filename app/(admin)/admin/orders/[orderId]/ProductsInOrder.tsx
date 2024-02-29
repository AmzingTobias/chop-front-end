"use client";

import {
  IDetailedProductInOrder,
  getProductsDetailsInOrder,
} from "@/app/data/orders";
import { useEffect, useState } from "react";
import Image from "next/image";
import noProductImage from "@/public/no-product.png";
import { Raleway } from "next/font/google";
import { ScrollArea } from "@/components/ui/scroll-area";

interface IProductsInOrderProps {
  orderId: number;
}

const ProductsInOrder: React.FC<IProductsInOrderProps> = ({ orderId }) => {
  const useProductsInOrder = () => {
    const [productsInOrder, setProductsInOrder] = useState<
      IDetailedProductInOrder[]
    >([]);
    useEffect(() => {
      getProductsDetailsInOrder(orderId)
        .then((productInfo) => {
          setProductsInOrder(productInfo);
        })
        .catch((err) => {
          console.error(err);
          setProductsInOrder([]);
        });
    }, []);
    return productsInOrder;
  };
  const productsInOrder = useProductsInOrder();

  return (
    <ScrollArea className="max-h-full">
      <div className="flex flex-col gap-4 w-full">
        {productsInOrder.map((product) => (
          <div
            className="flex flex-row bg-accent w-full rounded-md h-fit"
            key={product.productId}
          >
            {product.imageDetails === undefined ? (
              <Image
                className="rounded-l-md w-fit"
                alt={"Preview"}
                src={noProductImage.src}
                width={100}
                height={100}
              />
            ) : (
              <Image
                className="rounded-l-md w-fit"
                alt={product.imageDetails.altText}
                src={product.imageDetails.primaryLink}
                width={100}
                height={100}
              />
            )}
            <div className="flex flex-col text-accent-foreground p-4 w-full flex-grow">
              <h3 className="text-base md:text-lg font-semibold">
                {product.productName}
              </h3>
              <div className="flex flex-col justify-end items-end flex-grow">
                <p className="text-base md:text-xl font-semibold">
                  <small className="font-medium">{product.quantity} x </small>£
                  {product.price.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default ProductsInOrder;
