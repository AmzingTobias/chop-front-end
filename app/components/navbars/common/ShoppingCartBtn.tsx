"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BsCartFill, BsCart } from "react-icons/bs";
import { useSelector } from "react-redux";

const ShoppingCartBtn = () => {
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
  const [basketSize, setBasketSize] = useState(0);

  useEffect(() => {
    if (!loading) {
      setBasketSize(() =>
        basketItems.reduce(
          (prev: number, current: any) => prev + current.quantity,
          0
        )
      );
    }
  }, [basketItems, loading]);

  return (
    <Link
      href={"/basket"}
      className="hover:cursor-pointer flex justify-center hover:opacity-80"
    >
      {basketSize > 0 ? (
        <>
          <BsCartFill />
          <span className="text-sm ml-0.5 mt-1.5 font-bold absolute select-none text-accent">
            {basketSize > 9 ? "9+" : basketSize}
          </span>
        </>
      ) : (
        <BsCart />
      )}
    </Link>
  );
};

export default ShoppingCartBtn;
