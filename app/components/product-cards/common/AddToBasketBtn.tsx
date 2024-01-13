"use client";

import { addToCart, hideLoading } from "@/app/redux/slices/basket.slice";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { IoCheckmark } from "react-icons/io5";

interface IAddToBasketBtnProps {
  productId: number;
  disabled: boolean;
  quantityToAdd?: number;
}

const AddToBasketBtn: React.FC<IAddToBasketBtnProps> = ({
  productId,
  disabled,
  quantityToAdd = 1,
}) => {
  const [addedToBasket, setAddedToBasket] = useState(false);

  const dispatch = useDispatch();

  const addProductToServer = () => {};

  const addProductToBasket = () => {
    dispatch(addToCart({ productId: productId, quantity: quantityToAdd }));
  };

  useEffect(() => {
    dispatch(hideLoading());
  }, [dispatch]);

  if (addedToBasket) {
    return (
      <Button variant={"secondary"} className="w-full cursor-none" disabled>
        <IoCheckmark className="text-xl mr-2" /> Added to basket
      </Button>
    );
  } else {
    return (
      <Button
        disabled={disabled}
        variant={"secondary"}
        className="w-full"
        onClick={(event) => {
          event.preventDefault();
          setAddedToBasket(true);
          addProductToBasket();
          setTimeout(() => {
            setAddedToBasket(false);
          }, 1000);
        }}
      >
        Add to basket
      </Button>
    );
  }
};

export default AddToBasketBtn;
