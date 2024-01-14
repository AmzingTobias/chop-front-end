"use client";

import { removeProductFromBasket } from "@/app/data/basket";
import { removeFromCart } from "@/app/redux/slices/basket.slice";
import { Button } from "@/components/ui/button";
import { IoCloseOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";

interface IRemoveFromBasketBtn {
  productId: number;
  disable: boolean;
  setDisable: React.Dispatch<React.SetStateAction<boolean>>;
  customerLoggedIn: boolean;
}

const RemoveFromBasketBtn: React.FC<IRemoveFromBasketBtn> = ({
  disable,
  setDisable,
  productId,
  customerLoggedIn,
}) => {
  const dispatch = useDispatch();

  return (
    <Button
      disabled={disable}
      variant={"secondary"}
      className="w-10 h-10 p-0.5"
      onClick={() => {
        setDisable(true);
        if (customerLoggedIn) {
          removeProductFromBasket(productId);
        } else {
          dispatch(removeFromCart({ productId: productId }));
        }
      }}
    >
      <IoCloseOutline className={"text-xl"} />
    </Button>
  );
};

export default RemoveFromBasketBtn;
