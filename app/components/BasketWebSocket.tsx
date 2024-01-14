"use client";

import { useEffect } from "react";

interface IBasketWebSocketProps {
  customerLoggedIn: boolean;
}

const BasketWebSocket: React.FC<IBasketWebSocketProps> = ({
  customerLoggedIn,
}) => {
  useEffect(() => {
    if (customerLoggedIn) {
      const ws = new WebSocket(`ws://localhost:5001/v1/basket/updates`);

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log(data);
      };

      return () => {
        // Close the WebSocket connection when the component unmounts
        ws.close();
      };
    }
  }, [customerLoggedIn]);

  return null; // This component doesn't render anything
};

export default BasketWebSocket;
