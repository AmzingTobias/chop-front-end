"use client";

import { TBrandEntry } from "@/app/data/brands";
import SearchBar from "@/components/SearchBar";
import StaffTable, { TTableRow } from "@/components/StaffTable";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { useEffect, useState } from "react";

interface IBrandsTableProps {
  brandsFetched: TBrandEntry[];
}

const BrandsTable: React.FC<IBrandsTableProps> = ({ brandsFetched }) => {
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
          { display: brand.id },
          { display: brand.name },
          { display: brand.productCount },
          {
            className: "last:text-right",
            display: (
              <Link
                href={`/admin/brands/${brand.id}`}
                className="bg-secondary p-2 rounded-md items-center hover:bg-secondary/80"
              >
                View brand
              </Link>
            ),
          },
        ],
      }))
    );
  }, [filteredBrands]);

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
