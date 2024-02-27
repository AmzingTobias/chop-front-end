import { TOrderEntry, getDiscountsUsedForOrder } from "@/app/data/orders";
import { useEffect, useState } from "react";

interface IOrderPriceProps {
  order: TOrderEntry;
}

const OrderPrice: React.FC<IOrderPriceProps> = ({ order }) => {
  const useDiscounts = () => {
    const [discountsUsed, setDiscountsUsed] = useState<{ code: string }[]>([]);
    useEffect(() => {
      getDiscountsUsedForOrder(order.id)
        .then((codes) => setDiscountsUsed(codes))
        .catch((err) => console.error(err));
    }, []);
    return discountsUsed;
  };

  const discountsUsed = useDiscounts();

  return (
    <div className="flex flex-col text-end items-end w-full text-lg font-semibold">
      <p>Items: £{order.total.toFixed(2)}</p>
      {discountsUsed.map((code, index) => (
        <p key={index} className="font-light text-sm italic">
          Code: {code.code}
        </p>
      ))}
      <p>Delivery: £0.00</p>
      <p>Total paid: £{order.pricePaid.toFixed(2)}</p>
    </div>
  );
};

export default OrderPrice;
