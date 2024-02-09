"use client";

import {
  IProductEntry,
  IProductEntryWithImages,
  getProductIdsWithBaseId,
  getProductWithId,
  mapProductsToImages,
} from "@/app/data/products";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { ScrollArea } from "@/components/ui/scroll-area";

interface IProductGridProps {
  baseProductId: number;
}

const ProductGrid: React.FC<IProductGridProps> = ({ baseProductId }) => {
  const useProducts = () => {
    const [productIds, setProductIds] = useState<{ id: number }[]>([]);
    const [productsWithImages, setProductsWithImages] = useState<
      IProductEntryWithImages[]
    >([]);
    useEffect(() => {
      getProductIdsWithBaseId(baseProductId)
        .then((response) => setProductIds(response))
        .catch((err) => {
          console.error(err);
          setProductIds([]);
        });
    }, []);

    useEffect(() => {
      const fetch_all_products = async () => {
        const products_found_with_null = await Promise.all(
          productIds.map(async (baseId) => {
            const product_found = await getProductWithId(baseId.id);
            return product_found;
          })
        );
        const products_found = products_found_with_null.filter(
          (entry) => entry !== null
        ) as IProductEntry[];
        mapProductsToImages(products_found, 200, 200)
          .then((products_with_images) =>
            setProductsWithImages(products_with_images)
          )
          .catch((err) => {
            console.error(err);
            setProductsWithImages([]);
          });
      };
      fetch_all_products();
    }, [productIds]);

    return productsWithImages;
  };

  const products = useProducts();

  return (
    <ScrollArea className="h-screen w-full">
      <div className="flex flex-row flex-wrap items-start gap-6 w-full ">
        {products.map((product) => (
          <ProductCard key={product.productId} {...product} />
        ))}
      </div>
    </ScrollArea>
  );
};

export default ProductGrid;
