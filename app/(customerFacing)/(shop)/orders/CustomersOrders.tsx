"use client";

import { TOrderEntry, getCustomersOrders } from "@/app/data/orders";
import { useEffect, useState } from "react";
import OrderSummary from "./OrderSummary";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const CustomersOrders = () => {
  const useOrders = () => {
    const [orders, setOrders] = useState<TOrderEntry[]>([]);

    useEffect(() => {
      getCustomersOrders()
        .then((orders) => setOrders(orders))
        .catch((err) => console.error(err));
    }, []);

    return orders;
  };

  const orders = useOrders();

  if (orders.length === 0) {
    // Temporary return for when a customer has no orders
    return null;
  }

  return (
    <div className="w-full">
      <div className="flex flex-col w-full gap-12">
        {orders.map((order) => (
          <div
            key={order.id}
            className="w-full flex-col space-y-4 mt-0 p-6 bg-primary flex shadow-md rounded-sm"
          >
            <div className="flex flex-row  gap-4 w-full">
              <div className="flex flex-col text-xl min-w-fit">
                <h2>Order #{order.id}</h2>
                <h3 className={`font-bold`}>{order.status}</h3>
              </div>
              <div className="flex flex-col text-xl items-end w-full text-end gap-2">
                <h2 className="min-w-fit font-light">
                  Placed on: {new Date(order.placed_on).toLocaleString()}
                </h2>
                <Link href={`/orders/${order.id}`}>
                  <Button variant={"secondary"}>More details</Button>
                </Link>
              </div>
            </div>
            <hr className="border-accent bg-accent border-[1px]" />
            <div className="flex-col space-y-1">
              <OrderSummary order={order} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomersOrders;
