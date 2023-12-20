"use client";

import Searchbar from "@/app/components/searchbars/Searchbar";
import {
  IProductEntryWithImages,
  mapProductsToImages,
  searchForProducts,
} from "@/app/data/products";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProductResults from "../product-type/[id]/ProductResults";

const SearchPage = () => {
  const queryParams = useSearchParams();
  const searchQuery = queryParams.get("query");
  const [searchLoaded, setSearchLoaded] = useState(false);
  const [searchResults, setSearchResults] = useState<IProductEntryWithImages[]>(
    []
  );

  useEffect(() => {
    if (searchQuery !== null) {
      searchForProducts(searchQuery).then((products) => {
        mapProductsToImages(products, 188, 250).then((productsWithImages) => {
          setSearchResults(productsWithImages);
          setSearchLoaded(true);
          console.log(productsWithImages);
        });
      });
    }
  }, [searchQuery]);

  return (
    <main className="flex flex-col w-full overflow-x-clip p-1">
      <Searchbar
        variant="accent"
        showResultsOnInputChange={true}
        searchResultLimit={10}
        defaultValue={searchQuery === null ? "" : searchQuery}
      />
      <br className="my-2" />
      <div className="hidden md:flex w-full">
        <ProductResults
          products={searchResults}
          productImageHeight={250}
          productImageWidth={188}
        />
      </div>
      <div className="md:hidden w-full">
        <ProductResults
          products={searchResults}
          productImageHeight={120}
          productImageWidth={120}
        />
      </div>
    </main>
  );
};

export default SearchPage;
