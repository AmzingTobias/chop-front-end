"use client";

import { removeFromCart } from "@/app/redux/slices/basket.slice";
import { Button } from "@/components/ui/button";
import { IoCloseOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";

interface IRemoveFromBasketBtn {
  productId: number;
}

const RemoveFromBasketBtn: React.FC<IRemoveFromBasketBtn> = ({ productId }) => {
  const dispatch = useDispatch();

  return (
    <Button
      variant={"secondary"}
      className="w-10 h-10 p-0.5"
      onClick={() => {
        dispatch(removeFromCart({ productId: productId }));
      }}
    >
      <IoCloseOutline className={"text-xl"} />
    </Button>
  );
};

export default RemoveFromBasketBtn;
