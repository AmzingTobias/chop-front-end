import { TOrderEntry, TOrderStatus } from "@/app/data/orders";
import StaffTable, { TTableRow } from "@/components/StaffTable";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { useEffect, useState } from "react";
import FilterByOrderStatus from "./FilterByOrderStatus";
import SearchBar from "@/components/SearchBar";
import SectionHeading from "@/app/components/SectionHeading";

interface IOrdersTableProps {
  orders: TOrderEntry[];
  allOrderStatusTypes: TOrderStatus[];
}

const OrdersTable: React.FC<IOrdersTableProps> = ({
  orders,
  allOrderStatusTypes,
}) => {
  const [filterByStatus, setFilterByStatus] = useState<string>();
  const [filteredOrders, setFilteredOrders] = useState(orders);
  const [dataForTable, setDataForTable] = useState<TTableRow[]>([]);
  const [filterById, setFilterById] = useState("");
  useEffect(() => {
    setDataForTable(
      filteredOrders.map((order) => {
        return {
          id: order.id,
          cells: [
            { display: order.id, sortValue: order.id },
            { display: order.status, sortValue: order.status },
            { display: order.product_count, sortValue: order.product_count },
            {
              display: `£${order.pricePaid.toFixed(2)}`,
              sortValue: order.pricePaid,
            },
            {
              display: new Date(order.placed_on).toLocaleDateString(),
              sortValue: order.placed_on,
            },
            {
              className: "last:text-right",
              display: (
                <Link
                  href={`/admin/orders/${order.id}`}
                  className="bg-secondary p-2 rounded-md items-center hover:bg-secondary/80"
                >
                  View order
                </Link>
              ),
              sortValue: undefined,
            },
          ],
        };
      })
    );
  }, [filteredOrders]);

  const updateStatusFilter = (value: string) => {
    if (value === "All") {
      setFilterByStatus(undefined);
    } else {
      setFilterByStatus(value);
    }
  };

  useEffect(() => {
    setFilteredOrders(
      orders.filter((order) => {
        if (filterByStatus === undefined && filterById === "") {
          return true;
        } else if (filterByStatus !== undefined && filterById !== "") {
          return (
            order.status === filterByStatus &&
            order.id.toString().includes(filterById)
          );
        } else if (filterByStatus !== undefined) {
          return order.status === filterByStatus;
        } else {
          return order.id.toString().includes(filterById);
        }
      })
    );
  }, [filterByStatus, filterById, setFilteredOrders, orders]);

  return (
    <div className="flex flex-col gap-2 p-2 max-h-full">
      <SectionHeading text="All orders" />

      <SearchBar
        variant="accent"
        onSearchChange={(query) => {
          setFilterById(query);
        }}
      />
      <FilterByOrderStatus
        allOrderStatusTypes={allOrderStatusTypes}
        onFilterChange={updateStatusFilter}
      />
      <ScrollArea className="max-h-full overflow-y-scroll">
        <StaffTable
          headings={[
            { display: "ID", sortable: true },
            { display: "Status", sortable: true },
            { display: "Product count", sortable: true },
            { display: "Price paid", sortable: true },
            { display: "Placed on", sortable: true },
            {
              display: "View",
              sortable: false,
              className: " justify-end",
            },
          ]}
          rows={dataForTable}
          defaultSortedBy={{ headingIndex: 4, desc: false }}
        />
      </ScrollArea>
    </div>
  );
};

export default OrdersTable;
