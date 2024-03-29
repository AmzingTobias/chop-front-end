"use client";

import { EAccountTypes } from "@/app/data/auth";
import { TBrandEntry } from "@/app/data/brands";
import SearchBar from "@/components/SearchBar";
import StaffTable, { TTableRow } from "@/components/StaffTable";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { useEffect, useState } from "react";

interface IBrandsTableProps {
  accountTypeLoggedIn: EAccountTypes.admin | EAccountTypes.sales;
  brandsFetched: TBrandEntry[];
}

const BrandsTable: React.FC<IBrandsTableProps> = ({
  brandsFetched,
  accountTypeLoggedIn,
}) => {
  const [filteredBrands, setFilteredBrands] = useState(brandsFetched);
  const [dataForTable, setDataForTable] = useState<TTableRow[]>([]);
  useEffect(() => {
    setFilteredBrands(brandsFetched);
  }, [brandsFetched]);
  useEffect(() => {
    setDataForTable(
      filteredBrands.map((brand) => ({
        id: brand.id,
        cells: [
          { display: brand.id, sortValue: brand.id },
          { display: brand.name, sortValue: brand.name },
          { display: brand.productCount, sortValue: brand.productCount },
          {
            className: "last:text-right",
            display: (
              <Link
                href={`/${
                  accountTypeLoggedIn === EAccountTypes.admin
                    ? "admin"
                    : "sales"
                }/brands/${brand.id}`}
                className="bg-secondary p-2 rounded-md items-center hover:bg-secondary/80"
              >
                View brand
              </Link>
            ),
            sortValue: undefined,
          },
        ],
      }))
    );
  }, [filteredBrands, accountTypeLoggedIn]);

  return (
    <div className="flex flex-col gap-2 p-2 max-h-full">
      <SearchBar
        variant="accent"
        onSearchChange={(query) => {
          if (query === "") {
            setFilteredBrands(brandsFetched);
          } else {
            setFilteredBrands(
              brandsFetched.filter((brand) =>
                brand.name.toLowerCase().includes(query.toLowerCase())
              )
            );
          }
        }}
      />
      <ScrollArea className="max-h-full overflow-y-scroll">
        <StaffTable
          headings={[
            { display: "ID", sortable: true },
            { display: "Brand", sortable: true },
            { display: "Product count", sortable: true },
            { display: "View", sortable: false, className: "justify-end" },
          ]}
          rows={dataForTable}
        />
      </ScrollArea>
    </div>
  );
};

export default BrandsTable;
