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
import SearchBar from "@/components/SearchBar";

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

  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  return (
    <div className="h-full w-full flex flex-col gap-4">
      <SearchBar
        variant="accent"
        onSearchChange={(query) => {
          if (query === "") {
            setFilteredProducts(products);
          } else {
            setFilteredProducts(
              products.filter((product) =>
                product.productName.toLowerCase().includes(query.toLowerCase())
              )
            );
          }
        }}
      />
      {filteredProducts.length === 0 ? (
        <div className="w-full h-screen flex items-center justify-center">
          <h2 className="text-4xl italic">No products</h2>
        </div>
      ) : (
        <ScrollArea>
          <div className="max-h-full flex flex-row flex-wrap items-start gap-6 w-full ">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.productId}
                {...product}
                baseProductId={baseProductId}
              />
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
};

export default ProductGrid;
