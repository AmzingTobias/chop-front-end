"use client";

import { FaSearch } from "react-icons/fa";
import noProductImage from "@/public/no-product.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  IProductEntry,
  IProductEntryWithImages,
  mapProductsToImages,
  searchForProducts,
} from "@/app/data/products";
import Image from "next/image";
import Link from "next/link";

interface ISearchbarProps {
  variant?: "secondary" | "accent";
  searchResultLimit?: number;
  showResultsOnInputChange?: boolean;
  defaultValue?: string;
}

export const Searchbar: React.FC<ISearchbarProps> = ({
  variant = "secondary",
  searchResultLimit = 5,
  showResultsOnInputChange = false,
  defaultValue = "",
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchResults, setSearchResults] = useState<IProductEntryWithImages[]>(
    []
  );
  const router = useRouter();
  const [searchInFocus, setSearchInFocus] = useState(false);

  const performSearch = (query: string) => {
    if (query.length >= 3) {
      searchForProducts(query).then((products) => {
        mapProductsToImages(products, 50, 66.4).then((productsWithImages) => {
          setSearchResults(productsWithImages);
        });
      });
    } else {
      setSearchResults([]);
    }
  };

  const redirectToSearchPage = () => {
    if (inputRef.current !== null && inputRef.current.value.length >= 3) {
      router.push(`/search?query=${inputRef.current.value}`);
    }
  };

  return (
    <div
      className="flex w-full flex-col"
      onBlur={(e) => {
        const currentTarget = e.currentTarget;

        // Give browser time to focus the next element
        requestAnimationFrame(() => {
          // Check if the new focused element is a child of the original container
          if (!currentTarget.contains(document.activeElement)) {
            setSearchInFocus(false);
          }
        });
      }}
      tabIndex={1}
    >
      <div className="w-full flex flex-row space-x-2 items-center">
        <div className="flex flex-col w-full">
          <Input
            defaultValue={defaultValue}
            onFocus={() => setSearchInFocus(true)}
            ref={inputRef}
            onChange={(event) => {
              if (showResultsOnInputChange) performSearch(event.target.value);
            }}
            type="text"
            className={`bg-transparent ${
              searchInFocus && searchResults.length > 0 ? "rounded-b-none" : ""
            } ${
              variant === "accent"
                ? "border-accent focus-visible:ring-accent"
                : ""
            }`}
            placeholder="Search"
          />
          <div className="w-full relative">
            {searchInFocus && searchResults.length > 0 && (
              <div
                className={`absolute top-0 rounded-b-md ring-2 w-full z-50
              ${
                variant === "accent"
                  ? "bg-accent-foreground ring-accent text-accent"
                  : "bg-accent ring-secondary text-accent-foreground"
              }
              `}
              >
                {searchResults
                  .slice(0, searchResultLimit)
                  .map((product, index) => (
                    <Link
                      href={product.productPageLink}
                      key={index}
                      className="flex flex-col hover:opacity-80"
                      onClick={() => setSearchInFocus(true)}
                    >
                      <div className="flex flex-row space-x-2 items-center p-2">
                        <Image
                          blurDataURL={noProductImage.src}
                          placeholder={`blur`}
                          src={product.image.primaryLink}
                          alt={product.image.altText}
                          width={product.image.width}
                          height={product.image.height}
                        />
                        <div className="flex flex-col w-full">
                          <p className="overflow-ellipsis overflow-clip whitespace-nowrap  text-lg font-semibold">
                            {product.productName}
                          </p>
                          <p className="text-base">
                            £{product.productPrice.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            )}
          </div>
        </div>
        <Button
          type="submit"
          className={`${variant === "accent" ? "bg-accent" : ""}`}
          variant={"secondary"}
          onClick={() => redirectToSearchPage()}
        >
          <FaSearch
            className={`text-lg ${
              variant === "accent" ? "text-accent-foreground" : "text-accent"
            }`}
          />
        </Button>
      </div>
    </div>
  );
};

export default Searchbar;
