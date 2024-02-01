"use client";

import { TOrderEntry, getCustomersOrders } from "@/app/data/orders";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import OrderDetails from "./OrderDetails";
import { Progress } from "@/components/ui/progress";
import { Raleway } from "next/font/google";
const raleway = Raleway({ subsets: ["latin"] });

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

  const convertStatusToValue = (status: string) => {
    switch (status) {
      case "Ordered":
        return 25;
      case "Dispatched":
        return 50;
      case "Shipped":
        return 75;
      case "Delivered":
        return 100;
      default:
        return 0;
    }
  };

  const orders = useOrders();

  if (orders.length === 0) {
    // Temporary return for when a customer has no orders
    return null;
  }

  return (
    <Tabs
      defaultValue={orders.length > 0 ? orders[0].id.toString() : "0"}
      className="flex flex-col sm:flex-row"
      orientation="vertical"
    >
      <TabsList className="sm:basis-1/4 p-0 w-[200px] bg-transparent justify-normal">
        <div className="flex flex-col w-full gap-2 p-2 rounded-sm shadow-md bg-accent">
          {orders.map((order) => (
            <TabsTrigger
              className="text-lg flex flex-col whitespace-normal"
              value={`${order.id}`}
              key={order.id}
            >
              <p>
                {new Date(order.placed_on).toLocaleDateString()} -{" "}
                {order.status}
              </p>
              <p>
                {order.product_count} product
                {order.product_count > 1 ? "s" : ""}
              </p>
            </TabsTrigger>
          ))}
        </div>
      </TabsList>
      <div className="mt-4 sm:mt-0 sm:ml-2 md:ml-6 lg:ml-10 sm:basis-3/4 sm:w-full ">
        {orders.map((order) => (
          <TabsContent value={`${order.id}`} key={order.id} className="mt-0">
            <div className="w-full flex-col space-y-4 mt-0 p-6 bg-primary flex shadow-md rounded-sm">
              <div className="flex flex-col gap-2">
                <Progress value={convertStatusToValue(order.status)} />
                <h3
                  className={`w-full text-center text-3xl ${raleway.className} uppercase underline font-semibold`}
                >
                  {order.status}
                </h3>
              </div>
              <hr className="border-accent border-[1px]" />
              <div className="flex-col space-y-1">
                <OrderDetails order={order} />
              </div>
            </div>
          </TabsContent>
        ))}
      </div>
    </Tabs>
  );
};

export default CustomersOrders;
