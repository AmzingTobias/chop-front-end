"use client";

import { TProductType } from "@/app/data/products";
import SearchBar from "@/components/SearchBar";
import StaffTable, { TTableRow } from "@/components/StaffTable";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { useEffect, useState } from "react";

interface IProductTypesTableProps {
  productTypesFetched: TProductType[];
}

const ProductTypesTable: React.FC<IProductTypesTableProps> = ({
  productTypesFetched,
}) => {
  const [filteredProductTypes, setFilteredProductTypes] =
    useState(productTypesFetched);
  const [dataForTable, setDataForTable] = useState<TTableRow[]>([]);
  useEffect(() => {
    setFilteredProductTypes(productTypesFetched);
  }, [productTypesFetched]);
  useEffect(() => {
    setDataForTable(
      filteredProductTypes.map((productType) => ({
        id: productType.id,
        cells: [
          { display: productType.id, sortValue: productType.id },
          { display: productType.type, sortValue: productType.type },
          {
            display: productType.productCount,
            sortValue: productType.productCount,
          },
          {
            className: "last:text-right",
            display: (
              <Link
                href={`/admin/product-types/${productType.id}`}
                className="bg-secondary p-2 rounded-md items-center hover:bg-secondary/80"
              >
                View type
              </Link>
            ),
            sortValue: undefined,
          },
        ],
      }))
    );
  }, [filteredProductTypes]);

  return (
    <div className="flex flex-col gap-2 p-2 max-h-full">
      <SearchBar
        variant="accent"
        onSearchChange={(query) => {
          if (query === "") {
            setFilteredProductTypes(productTypesFetched);
          } else {
            setFilteredProductTypes(
              productTypesFetched.filter((productType) =>
                productType.type.toLowerCase().includes(query.toLowerCase())
              )
            );
          }
        }}
      />
      <ScrollArea className="max-h-full overflow-y-scroll">
        <StaffTable
          headings={[
            { display: "ID", sortable: true },
            { display: "Type", sortable: true },
            { display: "Product count", sortable: true },
            { display: "View", sortable: false, className: "justify-end" },
          ]}
          rows={dataForTable}
        />
      </ScrollArea>
    </div>
  );
};

export default ProductTypesTable;
