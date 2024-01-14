"use client";

import { addToCart, hideLoading } from "@/app/redux/slices/basket.slice";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoCheckmark } from "react-icons/io5";
import {
  addNewProductToBasket,
  updateProductInBasket,
} from "@/app/data/basket";

interface IAddToBasketBtnProps {
  productId: number;
  customerLoggedIn: boolean;
  disabled?: boolean;
  productStockCount: number;
  productAvailable: boolean;
  quantityToAdd?: number;
}

const AddToBasketBtn: React.FC<IAddToBasketBtnProps> = ({
  productId,
  customerLoggedIn,
  disabled = false,
  productStockCount,
  productAvailable,
  quantityToAdd = 1,
}) => {
  const [addedToBasket, setAddedToBasket] = useState(false);

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

  const [customerCanBuyProduct, setCustomerCanBuyProduct] = useState(false);
  const [quantityInBasketAlready, setQuantityInBasketAlready] = useState(0);
  useEffect(() => {
    if (!loading) {
      if (basketItems !== undefined) {
        const productInBasketAlready = basketItems.find(
          (item) => item.productId === productId
        );
        setQuantityInBasketAlready(
          productInBasketAlready === undefined
            ? 0
            : productInBasketAlready.quantity
        );
      }
    }
  }, [loading, basketItems, productId]);

  useEffect(() => {
    if (!loading) {
      setCustomerCanBuyProduct(
        productStockCount > quantityInBasketAlready &&
          productStockCount > 0 &&
          productAvailable
      );
    }
  }, [productStockCount, quantityInBasketAlready, productAvailable, loading]);

  const dispatch = useDispatch();

  const addProductToBasket = () => {
    if (!customerLoggedIn) {
      dispatch(addToCart({ productId: productId, quantity: quantityToAdd }));
    } else {
      if (quantityInBasketAlready > 0) {
        // Update server side basket
        updateProductInBasket(
          productId,
          quantityToAdd + quantityInBasketAlready
        );
      } else {
        // Add product to server side basket
        addNewProductToBasket(productId, quantityToAdd);
      }
    }
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
        disabled={disabled || !customerCanBuyProduct}
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
        {!productAvailable
          ? "Product unavailable"
          : productStockCount <= 0
          ? "Out of stock"
          : "Add to basket"}
      </Button>
    );
  }
};

export default AddToBasketBtn;
