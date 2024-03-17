"use client";

import { useEffect, useState } from "react";
import OrderPrice from "./OrderPrice";
import ProductsInOrder from "./ProductsInOrder";
import { TOrderEntry, TOrderStatus, getOrderWithId } from "@/app/data/orders";
import { Raleway } from "next/font/google";
import { TCustomerAddress, getAddressWithId } from "@/app/data/address";
import CustomerAddress from "@/app/components/CustomerAddress";
import OrderStatus from "./OrderStatus";
const raleway = Raleway({ subsets: ["latin"] });

interface IOrderDetailsProps {
  orderId: number;
  possibleOrderStatuses: TOrderStatus[];
}

const OrderDetails: React.FC<IOrderDetailsProps> = ({
  orderId,
  possibleOrderStatuses,
}) => {
  const useOrderInfo = () => {
    const [orderInfo, setOrderInfo] = useState<TOrderEntry | null>(null);
    const [addressUsedForOrder, setAddressUsedForOrder] =
      useState<TCustomerAddress | null>(null);
    useEffect(() => {
      getOrderWithId(orderId)
        .then((info) => setOrderInfo(info))
        .catch((err) => {
          console.error(err);
          setOrderInfo(null);
        });
    }, []);
    useEffect(() => {
      if (orderInfo !== null) {
        getAddressWithId(orderInfo.shippingAddressId)
          .then((address) => setAddressUsedForOrder(address))
          .catch((err) => {
            console.error(err);
            setAddressUsedForOrder(null);
          });
      }
    }, [orderInfo]);
    return { orderInfo, addressUsedForOrder };
  };

  const { orderInfo, addressUsedForOrder } = useOrderInfo();

  if (orderInfo === null) {
    return null;
  }

  return (
    <div className="flex flex-row gap-2 p-2 max-h-full h-full">
      <div className="flex flex-col gap-2 w-1/3">
        <OrderStatus
          orderId={orderId}
          orderStatus={orderInfo.status}
          possibleOrderStatuses={possibleOrderStatuses}
        />
        <hr className="bg-accent border-[1px] border-accent" />
        <h2 className={`text-2xl w-full text-center ${raleway.className}`}>
          Customer address
        </h2>
        <div className="flex flex-row min-w-fit items-baseline w-full whitespace-nowrap">
          {addressUsedForOrder !== null && (
            <CustomerAddress address={addressUsedForOrder} className="w-full" />
          )}
        </div>
        <OrderPrice order={orderInfo} />
      </div>
      <div className="bg-accent h-full w-[2px]"></div>
      <div className="flex flex-col gap-2 w-full min-h-fit overflow-clip">
        <h2 className={`text-2xl w-full text-center ${raleway.className}`}>
          Items in order
        </h2>
        <ProductsInOrder orderId={orderId} />
      </div>
    </div>
  );
};

export default OrderDetails;
