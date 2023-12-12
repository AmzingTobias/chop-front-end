"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { BsCartFill, BsCart } from "react-icons/bs";

const ShoppingCartBtn = () => {
  const [numInCart, setNumInCart] = useState(0);
  const [cookies] = useCookies(["auth"]);
  useEffect(() => {
    if (cookies["auth"] !== undefined) {
      // Make request for number in cart
      setNumInCart(1);
    } else {
      setNumInCart(0);
    }
  }, [cookies]);

  return (
    <Link
      href={"/basket"}
      className="hover:cursor-pointer flex justify-center hover:opacity-80"
    >
      {numInCart > 0 ? (
        <>
          <BsCartFill />
          <span className="text-sm ml-0.5 mt-1.5 font-bold absolute select-none text-accent">
            {numInCart > 9 ? "9+" : numInCart}
          </span>
        </>
      ) : (
        <BsCart />
      )}
    </Link>
  );
};

export default ShoppingCartBtn;
