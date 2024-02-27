"use client";

import { TBaseProduct } from "@/app/data/products";
import SearchBar from "@/components/SearchBar";
import StaffTable, { TTableRow } from "@/components/StaffTable";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { useEffect, useState } from "react";

interface IBaseProductTableProps {
  fetchedBaseProducts: TBaseProduct[];
}

const BaseProductsTable: React.FC<IBaseProductTableProps> = ({
  fetchedBaseProducts,
}) => {
  const [filteredBaseProducts, setFilteredBaseProducts] =
    useState(fetchedBaseProducts);

  const [dataForTable, setDataForTable] = useState<TTableRow[]>([]);

  useEffect(() => {
    setFilteredBaseProducts(fetchedBaseProducts);
  }, [fetchedBaseProducts]);

  useEffect(() => {
    setDataForTable(
      filteredBaseProducts.map((product) => ({
        id: product.id,
        cells: [
          { display: product.id, sortValue: product.id },
          { display: product.description, sortValue: product.description },
          { display: product.brandName, sortValue: product.brandName },
          { display: product.productCount, sortValue: product.productCount },
          {
            className: "last:text-right",
            display: (
              <Link
                href={`/admin/products/${product.id}`}
                className="bg-secondary p-2 rounded-md items-center hover:bg-secondary/80"
              >
                View products
              </Link>
            ),
            sortValue: undefined,
          },
        ],
      }))
    );
  }, [filteredBaseProducts]);

  if (fetchedBaseProducts.length === 0) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <h2 className="text-4xl italic">No products</h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 p-2 overflow-y-scroll w-full max-h-full">
      <SearchBar
        variant="accent"
        onSearchChange={(query) => {
          if (query === "") {
            setFilteredBaseProducts(fetchedBaseProducts);
          } else {
            setFilteredBaseProducts(
              fetchedBaseProducts.filter((baseProduct) =>
                baseProduct.description
                  .toLowerCase()
                  .includes(query.toLowerCase())
              )
            );
          }
        }}
      />
      <ScrollArea className="overflow-y-scroll">
        <StaffTable
          headings={[
            { display: "ID", sortable: true },
            { display: "Description", sortable: true },
            { display: "Brand", sortable: true },
            { display: "Number of products", sortable: true },
            { display: "View", className: " justify-end", sortable: false },
          ]}
          rows={dataForTable}
        />
      </ScrollArea>
    </div>
  );
};

export default BaseProductsTable;
