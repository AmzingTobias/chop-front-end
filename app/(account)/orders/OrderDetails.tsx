import {
  IDetailedProductInOrder,
  TOrderEntry,
  getProductsDetailsInOrder,
} from "@/app/data/orders";
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";

interface IOrderDetailsProps {
  order: TOrderEntry;
}

const OrderDetails: React.FC<IOrderDetailsProps> = ({ order }) => {
  const useOrderDetails = () => {
    const [orderDetails, setOrderDetails] =
      useState<IDetailedProductInOrder[]>();
    useEffect(() => {
      getProductsDetailsInOrder(order.id)
        .then((orderDetails) => setOrderDetails(orderDetails))
        .catch((err) => console.error(err));
    }, []);
    return orderDetails;
  };

  const orderDetails = useOrderDetails();

  if (orderDetails === undefined) {
    // Temporary return, will show a loading page instead
    return null;
  }

  return (
    <div className="flex flex-col">
      {orderDetails.map((product) => (
        <div key={product.productId}>{product.productName}</div>
      ))}
    </div>
  );
};

export default OrderDetails;
