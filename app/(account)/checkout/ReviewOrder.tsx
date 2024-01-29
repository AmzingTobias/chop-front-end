import { TDiscountCodeValidation } from "@/app/data/discounts";
import { Button } from "@/components/ui/button";

interface IReviewOrderProps {
  totalPrice: number;
  discountCodesBeingUsed: TDiscountCodeValidation[];
}

const ReviewOrder: React.FC<IReviewOrderProps> = ({
  totalPrice,
  discountCodesBeingUsed,
}) => {
  const discountedTotal = discountCodesBeingUsed.reduce(
    (prev, current) => prev - (current.percent / 100) * totalPrice,
    totalPrice
  );

  return (
    <div className="bg-accent text-accent-foreground w-full p-2 rounded-md shadow-md h-fit flex flex-col gap-2">
      <Button variant={"secondary"}>Buy now</Button>
      <hr className="border-accent-foreground border-[1px]" />
      <div>
        <h4 className="text-2xl font-bold">Order summary</h4>
        <p>Items: £{totalPrice.toFixed(2)}</p>
        <p>Delivery: £0.00</p>
      </div>
      {discountCodesBeingUsed.length > 0 && (
        <>
          <hr className="border-accent-foreground border-[1px]" />
          <div>
            <h4 className="text-2xl font-bold">Promotions</h4>
            {discountCodesBeingUsed.map((code, index) => (
              <p key={index}>
                Offer{" "}
                <span className="font-semibold">
                  ({code.code}): -£
                  {((code.percent / 100) * totalPrice).toFixed(2)}
                </span>
              </p>
            ))}
          </div>
        </>
      )}
      <hr className="border-accent-foreground border-[1px]" />
      <div>
        <h4 className="text-2xl font-bold text-primary">
          Order Total:{" "}
          <span className="font-medium">£{discountedTotal.toFixed(2)}</span>
        </h4>
        <small className="text-primary">Order total includes VAT</small>
      </div>
    </div>
  );
};

export default ReviewOrder;
