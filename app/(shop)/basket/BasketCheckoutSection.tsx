"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface IBasketCheckoutSectionProps {
  subTotal: number;
  numInBasket: number;
}

const BasketCheckoutSection: React.FC<IBasketCheckoutSectionProps> = ({
  subTotal,
  numInBasket,
}) => {
  const router = useRouter();

  return (
    <div className="bg-accent text-accent-foreground w-full h-fit p-4 rounded-md shadow-md flex flex-col space-y-1">
      <h3 className="font-bold text-2xl">
        {`Subtotal (${numInBasket} items) `}
        <span className="font-normal">{`£${subTotal.toFixed(2)}`}</span>
      </h3>
      <Button
        variant={"secondary"}
        className="w-full font-medium text-base"
        onClick={() => router.push("/checkout")}
      >
        Checkout
      </Button>
    </div>
  );
};

export default BasketCheckoutSection;
