"use client";

import SectionHeading from "@/app/components/SectionHeading";
import { EAccountTypes } from "@/app/data/auth";
import { TOrderEntry, getCustomersOrders } from "@/app/data/orders";
import { getCustomerIdForTicket, getTicketWithId } from "@/app/data/support";
import StaffTable, { TTableRow } from "@/components/StaffTable";
import Link from "next/link";
import { useEffect, useState } from "react";

interface IOrdersProps {
  ticketId: number;
  accountTypeLoggedIn: EAccountTypes.admin | EAccountTypes.support;
}

const Orders: React.FC<IOrdersProps> = ({ ticketId, accountTypeLoggedIn }) => {
  const useOrdersForCustomer = () => {
    const [orders, setOrders] = useState<TOrderEntry[]>([]);
    useEffect(() => {
      getCustomerIdForTicket(ticketId)
        .then((customerId) => {
          if (customerId !== null) {
            getCustomersOrders(customerId)
              .then((orders) => setOrders(orders))
              .catch((err) => {
                console.error(err);
                setOrders([]);
              });
          } else {
            setOrders([]);
          }
        })
        .catch((err) => {
          console.error(err);
          setOrders([]);
        });
    }, []);
    return orders;
  };
  const orders = useOrdersForCustomer();

  const dataForTable: TTableRow[] = orders.map((order) => ({
    id: order.id,
    cells: [
      { display: order.id, sortValue: order.id },
      {
        display: new Date(order.placed_on).toLocaleDateString(),
        sortValue: order.placed_on,
      },
      {
        display: order.status,
        sortValue: order.total,
      },
      {
        display: `£${order.pricePaid.toFixed(2)}`,
        sortValue: order.pricePaid,
      },
      {
        className: "last:text-right",
        display: (
          <Link
            href={`/${
              accountTypeLoggedIn === EAccountTypes.admin ? "admin" : "sales"
            }/orders/${order.id}`}
            className="bg-secondary p-2 rounded-md items-center hover:bg-secondary/80"
          >
            View
          </Link>
        ),
        sortValue: undefined,
      },
    ],
  }));

  return (
    <div className="min-h-full flex min-w-fit flex-col w-full">
      <SectionHeading text="customer's orders" />
      <StaffTable
        headings={[
          { display: "ID", sortable: true },
          { display: "Placed on", sortable: true },
          { display: "Status", sortable: true },
          { display: "Price", sortable: true },
          { display: "View", sortable: false },
        ]}
        rows={dataForTable}
        defaultSortedBy={{ headingIndex: 1, desc: false }}
      />
    </div>
  );
};

export default Orders;
