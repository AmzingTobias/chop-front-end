"use client";

import { addToCart, hideLoading } from "@/app/redux/slices/basket.slice";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";

interface IAddToBasketBtnProps {
  productId: number;
}

const AddToBasketBtn: React.FC<IAddToBasketBtnProps> = ({ productId }) => {
  const dispatch = useDispatch();

  const addProductToServer = () => {};

  const [cookies] = useCookies(["auth"]);

  const addProductToBasket = () => {
    const accountLoggedIn = cookies.auth !== undefined;
    dispatch(addToCart({ productId: productId }));
  };

  useEffect(() => {
    dispatch(hideLoading());
  }, [dispatch]);

  return (
    <Button
      variant={"secondary"}
      className="w-full"
      onClick={(event) => {
        event.preventDefault();
        addProductToBasket();
      }}
    >
      Add to basket
    </Button>
  );
};

export default AddToBasketBtn;
