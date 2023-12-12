"use client";

import { addProductToLocalBasket } from "@/app/data/basket";
import { Button } from "@/components/ui/button";
import { useCookies } from "react-cookie";

interface IAddToBasketBtnProps {
  productId: number;
}

const AddToBasketBtn: React.FC<IAddToBasketBtnProps> = ({ productId }) => {
  const addProductToLocalStorage = () => {
    addProductToLocalBasket(productId);
  };
  const addProductToServer = () => {};

  const [cookies] = useCookies(["auth"]);

  const addProductToBasket = () => {
    const accountLoggedIn = cookies.auth !== undefined;
    addProductToLocalStorage();
    if (accountLoggedIn) {
      addProductToServer();
    }
    alert(accountLoggedIn);
  };

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
