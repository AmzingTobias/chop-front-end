"use client";

import {
  IProductEntryWithImages,
  mapProductsToImages,
  searchForProducts,
} from "@/app/data/products";
import SearchBar from "@/components/SearchBar";
import { useState } from "react";
import ProductCard from "../[baseProductId]/ProductCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { EAccountTypes } from "@/app/data/auth";

interface ISearchGridProps {
  accountTypeLoggedIn: EAccountTypes.admin | EAccountTypes.sales;
}

const SearchGrid: React.FC<ISearchGridProps> = ({ accountTypeLoggedIn }) => {
  const [searchResults, setSearchResults] = useState<IProductEntryWithImages[]>(
    []
  );

  const makeSearch = (query: string) => {
    searchForProducts(query)
      .then((result) => {
        mapProductsToImages(result, 200, 200)
          .then((productWithImages) => setSearchResults(productWithImages))
          .catch((err) => {
            console.error(err);
            setSearchResults([]);
          });
      })
      .catch((err) => {
        console.error(err);
        setSearchResults([]);
      });
  };

  return (
    <div className="h-full w-full flex flex-col gap-4">
      <SearchBar
        variant="accent"
        onSearchChange={(query) => {
          const searchQuery = query.trim();
          if (searchQuery.length === 0) {
            setSearchResults([]);
          } else {
            makeSearch(searchQuery);
          }
        }}
      />
      {searchResults.length === 0 ? (
        <div className="w-full h-screen flex items-center justify-center">
          <h2 className="text-4xl italic">No products</h2>
        </div>
      ) : (
        <ScrollArea>
          <div className="max-h-full flex flex-row flex-wrap items-start gap-6 w-full ">
            {searchResults.map((product) =>
              product.baseProductId ? (
                <ProductCard
                  key={product.productId}
                  baseProductId={product.baseProductId}
                  accountTypeLoggedIn={accountTypeLoggedIn}
                  {...product}
                />
              ) : (
                <></>
              )
            )}
          </div>
        </ScrollArea>
      )}
    </div>
  );
};

export default SearchGrid;
