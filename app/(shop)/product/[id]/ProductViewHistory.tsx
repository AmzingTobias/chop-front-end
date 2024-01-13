"use client";

import { useEffect } from "react";

interface IProductViewHistoryProps {
  productId: number;
}

const ProductViewHistory: React.FC<IProductViewHistoryProps> = ({
  productId,
}) => {
  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/v1/products/history/${productId}`,
      {
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
        method: "POST",
      }
    )
      .then((response) => {
        if (!response.ok) {
          console.error(`Internal error: ${response.status}`);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [productId]);
  return <></>;
};

export default ProductViewHistory;
