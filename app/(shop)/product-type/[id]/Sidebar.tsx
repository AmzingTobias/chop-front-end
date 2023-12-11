"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import PriceSlider from "./PriceSlider";
import { IProductEntryWithImages } from "@/app/data/products";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const sortByItems: { value: string; display: string }[] = [
  { value: "priceDsc", display: "Price (High-Low)" },
  { value: "priceAsc", display: "Price (Low-High)" },
  { value: "nameAsc", display: "Name (A-Z)" },
  { value: "nameDsc", display: "Name (Z-A)" },
];

interface ISidebarProps {
  minProductPrice: number;
  maxProductPrice: number;
  originalProductList: IProductEntryWithImages[];
  setFilteredProductList: Dispatch<SetStateAction<IProductEntryWithImages[]>>;
}

const Sidebar: React.FC<ISidebarProps> = ({
  minProductPrice,
  maxProductPrice,
  originalProductList,
  setFilteredProductList,
}) => {
  const [priceFilterValue, setPriceFilterValue] = useState(maxProductPrice);
  const [sortItem, setSortItem] = useState("");
  useEffect(() => {
    setFilteredProductList(
      originalProductList.filter(
        (product) => product.productPrice <= priceFilterValue
      )
    );
  }, [priceFilterValue, originalProductList, setFilteredProductList]);

  useEffect(() => {
    console.log(`Sorting by ${sortItem}`);
    setFilteredProductList((filteredList) => {
      const sortedList = [...filteredList]; // Create a copy of the array before sorting

      if (sortItem === "priceAsc") {
        return sortedList.sort((a, b) => a.productPrice - b.productPrice);
      } else if (sortItem === "priceDsc") {
        return sortedList.sort((a, b) => b.productPrice - a.productPrice);
      } else if (sortItem === "nameAsc") {
        return sortedList.sort((a, b) =>
          a.productName.localeCompare(b.productName)
        );
      } else if (sortItem === "nameDsc") {
        return sortedList.sort((a, b) =>
          b.productName.localeCompare(a.productName)
        );
      } else {
        return filteredList;
      }
    });
  }, [sortItem, setFilteredProductList]);

  return (
    <div>
      <p>{sortItem}</p>
      <Select value={sortItem} onValueChange={setSortItem}>
        <SelectTrigger>
          <SelectValue placeholder="Sort by..." />
        </SelectTrigger>
        <SelectContent>
          {sortByItems.map((item, index) => (
            <SelectItem
              key={index}
              value={item.value}
              className="cursor-pointer"
            >
              {item.display}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="mt-4">
        <PriceSlider
          minProductPrice={minProductPrice}
          maxProductPrice={maxProductPrice}
          currentPriceFilter={priceFilterValue}
          setProductPriceFilter={setPriceFilterValue}
        />
      </div>
    </div>
  );
};

export default Sidebar;
