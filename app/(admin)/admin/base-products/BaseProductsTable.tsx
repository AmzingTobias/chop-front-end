"use client";

import { TBaseProduct, getAllBaseProducts } from "@/app/data/products";
import StaffTable, { TTableRow } from "@/components/StaffTable";
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

  const dataForTable: TTableRow[] = baseProducts.map((product) => ({
    id: product.id,
    cells: [
      { display: product.id },
      { display: product.description },
      { display: product.brandName },
      { display: product.productCount },
      {
        className: "last:text-right",
        display: (
          <Link
            href={`/admin/base-products/${product.id}`}
            className="bg-secondary p-2 rounded-md items-center hover:bg-secondary/80"
          >
            View products
          </Link>
        ),
      },
    ],
  }));

  return (
    <StaffTable
      headings={[
        { display: "ID", className: "w-min-content" },
        { display: "Description" },
        { display: "Brand" },
        { display: "Number of products", className: "w-2/12" },
        { display: "View", className: "w-2/12 text-right" },
      ]}
      rows={dataForTable}
    />
  );
};

export default BaseProductsTable;
