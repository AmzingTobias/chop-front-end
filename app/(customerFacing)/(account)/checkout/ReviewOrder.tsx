import { TCustomerAddress } from "@/app/data/address";
import { TDiscountCodeValidation } from "@/app/data/discounts";
import { clearBasket } from "@/app/redux/slices/basket.slice";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

interface IReviewOrderProps {
  totalPrice: number;
  discountCodesBeingUsed: TDiscountCodeValidation[];
  shippingAddress: TCustomerAddress | undefined;
}

const ReviewOrder: React.FC<IReviewOrderProps> = ({
  totalPrice,
  discountCodesBeingUsed,
  shippingAddress,
}) => {
  const [buyBtnDisabled, setBuyBtnDisabled] = useState(
    shippingAddress === undefined
  );

  const [orderFailed, setOrderFailed] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setBuyBtnDisabled(shippingAddress === undefined);
  }, [shippingAddress]);

  const discountedTotal = discountCodesBeingUsed.reduce(
    (prev, current) => prev - (current.percent / 100) * totalPrice,
    totalPrice
  );

  const router = useRouter();

  const submitOrder = () => {
    if (shippingAddress !== undefined) {
      setBuyBtnDisabled(true);
      const discountCodes = discountCodesBeingUsed.map((code) => code.code);
      fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/v1/orders/checkout`,
        {
          headers: {
            "Content-type": "application/json",
          },
          method: "POST",
          mode: "cors",
          credentials: "include",
          body: JSON.stringify({
            shippingId: shippingAddress.id,
            discountCodes: discountCodes,
          }),
        }
      )
        .then((response) => {
          dispatch(clearBasket());
          if (response.ok) {
            router.push("/order-confirmed");
          } else {
            response.text().then((error) => console.error(error));
            setOrderFailed(true);
          }
        })
        .catch((err) => {
          dispatch(clearBasket());
          setOrderFailed(true);
          console.error(err);
        });
    }
  };

  return (
    <div className="bg-accent text-accent-foreground w-full p-2 rounded-md shadow-md h-fit flex flex-col gap-2">
      <Button
        variant={"secondary"}
        onClick={() => submitOrder()}
        disabled={buyBtnDisabled}
      >
        Buy now
      </Button>
      <hr className="border-accent-foreground border-[1px] bg-accent-foreground" />
      <div>
        <h4 className="text-2xl font-bold">Order summary</h4>
        <p>Items: £{totalPrice.toFixed(2)}</p>
        <p>Delivery: £0.00</p>
      </div>
      {discountCodesBeingUsed.length > 0 && (
        <>
          <hr className="border-accent-foreground border-[1px] bg-accent-foreground" />
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
      <hr className="border-accent-foreground border-[1px] bg-accent-foreground" />
      <div>
        <h4 className="text-2xl font-bold text-primary">
          Order Total:{" "}
          <span className="font-medium">£{discountedTotal.toFixed(2)}</span>
        </h4>
        <small className="text-primary">Order total includes VAT</small>
      </div>
      <AlertDialog open={orderFailed} onOpenChange={setOrderFailed}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Order failed</AlertDialogTitle>
            <AlertDialogDescription>
              Your order has failed, you have not been charged.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              className="bg-secondary"
              onClick={() => router.push("/basket")}
            >
              Ok
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ReviewOrder;
