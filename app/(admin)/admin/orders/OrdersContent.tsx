"use client";

import { TOrderEntry, TOrderStatus, getAllOrders } from "@/app/data/orders";
import { useEffect, useState } from "react";
import OrdersTable from "./OrdersTable";
import { EAccountTypes } from "@/app/data/auth";

interface IOrdersContentProps {
  allOrderStatusTypes: TOrderStatus[];
  accountTypeLoggedIn: EAccountTypes.admin | EAccountTypes.warehouse;
}

const OrdersContent: React.FC<IOrdersContentProps> = ({
  allOrderStatusTypes,
  accountTypeLoggedIn,
}) => {
  const useOrders = () => {
    const [fetchedOrders, setFetchedOrders] = useState<TOrderEntry[]>([]);
    useEffect(() => {
      getAllOrders()
        .then((orders) => {
          setFetchedOrders(orders);
        })
        .catch((err) => {
          console.error(err);
          setFetchedOrders([]);
        });
    }, []);
    return fetchedOrders;
  };

  const fetchedOrders = useOrders();

  return (
    <div className="w-full">
      <OrdersTable
        accountTypeLoggedIn={accountTypeLoggedIn}
        orders={fetchedOrders}
        allOrderStatusTypes={allOrderStatusTypes}
      />
    </div>
  );
};

export default OrdersContent;
