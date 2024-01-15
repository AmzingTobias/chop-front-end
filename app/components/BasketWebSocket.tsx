"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  applyBasketToCart,
  initialServerSideFetch,
} from "@/app/redux/slices/basket.slice";
import { getBasketContents } from "../data/basket";
import BasketContents from "../(shop)/basket/BaseketContents";

interface IBasketWebSocketProps {
  customerLoggedIn: boolean;
}

const BasketWebSocket: React.FC<IBasketWebSocketProps> = ({
  customerLoggedIn,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      customerLoggedIn &&
      process.env.NEXT_PUBLIC_WEBSOCKET_SERVER_API_HOST_ADDRESS
    ) {
      const ws = new WebSocket(
        `${process.env.NEXT_PUBLIC_WEBSOCKET_SERVER_API_HOST_ADDRESS}/v1/basket/updates`
      );
      ws.onopen = (_) => {
        getBasketContents().then((basketContents) => {
          dispatch(initialServerSideFetch({ basket: basketContents }));
        });
      };
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === "basketUpdate") {
          const basketToApply: {
            productId: number;
            quantity: number;
          }[] = data.basket;
          dispatch(applyBasketToCart({ basket: basketToApply }));
        }
      };

      return () => {
        // Close the WebSocket connection when the component unmounts
        ws.close();
      };
    }
  }, [customerLoggedIn, dispatch]);

  return null; // This component doesn't render anything
};

export default BasketWebSocket;
