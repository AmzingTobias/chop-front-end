"use client";

import { TDiscountCodeEntry } from "@/app/data/discounts";
import SearchBar from "@/components/SearchBar";
import StaffTable, { TTableRow } from "@/components/StaffTable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import ToggleDiscountCode from "./ToggleDiscountCode";
import ToggleDiscountCodeStackable from "./ToggleStackable";
import EditPercentOff from "./EditPercentOff";
import EditRemainingUses from "./EditRemainingUses";

interface IDiscountTableProps {
  discountCodesFetched: TDiscountCodeEntry[];
}

const DiscountsTable: React.FC<IDiscountTableProps> = ({
  discountCodesFetched,
}) => {
  const [filteredDiscountCodes, setFilteredDiscountCodes] =
    useState(discountCodesFetched);
  const [dataForTable, setDataForTable] = useState<TTableRow[]>([]);
  useEffect(() => {
    setFilteredDiscountCodes(discountCodesFetched);
  }, [discountCodesFetched]);
  useEffect(() => {
    setDataForTable(
      filteredDiscountCodes.map((discountCode) => ({
        id: discountCode.id,
        cells: [
          { display: discountCode.id, sortValue: discountCode.id },
          { display: discountCode.code, sortValue: discountCode.code },
          {
            display: new Date(discountCode.createdOn).toLocaleDateString(),
            sortValue: new Date(discountCode.createdOn),
          },
          {
            display: (
              <EditPercentOff
                codeId={discountCode.id}
                fetchedPercentOff={discountCode.percent}
              />
            ),
            sortValue: discountCode.percent,
          },
          {
            display: (
              <ToggleDiscountCodeStackable
                stackable={discountCode.stackable}
                codeId={discountCode.id}
              />
            ),
            sortValue: discountCode.stackable ? 1 : 0,
          },
          {
            display: (
              <ToggleDiscountCode
                active={discountCode.active}
                codeId={discountCode.id}
              />
            ),
            sortValue: discountCode.active ? 1 : 0,
          },
          {
            display: (
              <EditRemainingUses
                codeId={discountCode.id}
                fetchedRemainingUses={discountCode.remainingUses}
              />
            ),
            sortValue: discountCode.remainingUses,
            className: "justify-end",
          },
        ],
      }))
    );
  }, [filteredDiscountCodes]);

  return (
    <div className="flex flex-col gap-2 p-2 max-h-full">
      <SearchBar
        variant="accent"
        onSearchChange={(query) => {
          if (query === "") {
            setFilteredDiscountCodes(discountCodesFetched);
          } else {
            setFilteredDiscountCodes(
              discountCodesFetched.filter((discountCode) =>
                discountCode.code.toLowerCase().includes(query.toLowerCase())
              )
            );
          }
        }}
      />
      <ScrollArea className="max-h-full overflow-y-scroll">
        <StaffTable
          headings={[
            { display: "ID", sortable: true },
            { display: "Discount code", sortable: true },
            { display: "Created on", sortable: true },
            { display: "Percent off", sortable: true },
            { display: "Stackable", sortable: true },
            { display: "Active", sortable: true },
            { display: "Remaining uses", sortable: true },
          ]}
          rows={dataForTable}
        />
      </ScrollArea>
    </div>
  );
};

export default DiscountsTable;
