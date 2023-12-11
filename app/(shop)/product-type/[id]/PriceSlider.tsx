"use client";

import { Slider } from "@/components/ui/slider";
import { Dispatch, SetStateAction, useState } from "react";

interface IPriceSliderProps {
  minProductPrice: number;
  maxProductPrice: number;
  currentPriceFilter: number;
  setProductPriceFilter: Dispatch<SetStateAction<number>>;
}

const PriceSlider: React.FC<IPriceSliderProps> = ({
  minProductPrice,
  maxProductPrice,
  currentPriceFilter,
  setProductPriceFilter,
}) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Filter by price</h3>
      <Slider
        onValueChange={(value) => setProductPriceFilter(value[0])}
        value={[currentPriceFilter]}
        defaultValue={[maxProductPrice]}
        min={minProductPrice}
        max={maxProductPrice}
        step={1}
      />
      <div className="flex flex-row mt-2 font-light text-sm">
        <p className="justify-start w-full">£{minProductPrice.toFixed(2)}</p>
        <p className="justify-end">£{currentPriceFilter.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default PriceSlider;
