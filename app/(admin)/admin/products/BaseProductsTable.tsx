"use client";

import { TBaseProduct, getAllBaseProducts } from "@/app/data/products";
import SearchBar from "@/components/SearchBar";
import StaffTable, { TTableRow } from "@/components/StaffTable";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { useEffect, useState } from "react";

const BaseProductsTable = () => {
  const useBaseProducts = () => {
    const [baseProducts, setBaseProducts] = useState<TBaseProduct[]>([]);
    useEffect(() => {
      getAllBaseProducts()
        .then((products) => setBaseProducts(products))
        .catch((err) => {
          console.error(err);
          setBaseProducts([]);
        });
    }, []);
    return baseProducts;
  };

  const baseProducts = useBaseProducts();

  const [filteredBaseProducts, setFilteredBaseProducts] =
    useState(baseProducts);

  const [dataForTable, setDataForTable] = useState<TTableRow[]>([]);

  useEffect(() => {
    setFilteredBaseProducts(baseProducts);
  }, [baseProducts]);

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

  return (
    <div className="flex flex-col gap-2 p-2 overflow-y-scroll">
      <SearchBar
        variant="accent"
        onSearchChange={(query) => {
          if (query === "") {
            setFilteredBaseProducts(baseProducts);
          } else {
            setFilteredBaseProducts(
              baseProducts.filter((baseProduct) =>
                baseProduct.description
                  .toLowerCase()
                  .includes(query.toLowerCase())
              )
            );
          }
        }}
      />
      <ScrollArea>
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
