"use client";

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
    <div className="hover:cursor-pointer flex justify-center hover:text-gray-400">
      {numInCart > 0 ? (
        <>
          <BsCartFill />
          <span className="text-sm ml-0.5 mt-1.5 font-bold absolute select-none text-indigo-900">
            {numInCart > 9 ? "9+" : numInCart}
          </span>
        </>
      ) : (
        <BsCart />
      )}
    </div>
  );
};

export default ShoppingCartBtn;
