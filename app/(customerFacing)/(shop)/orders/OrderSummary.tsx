import {
  IDetailedProductInOrder,
  TOrderEntry,
  getDiscountsUsedForOrder,
  getProductsDetailsInOrder,
} from "@/app/data/orders";
import Image from "next/image";
import { useEffect, useState } from "react";
import noProductImage from "@/public/no-product.png";
import Link from "next/link";

interface IOrderSummaryProps {
  order: TOrderEntry;
}

const OrderSummary: React.FC<IOrderSummaryProps> = ({ order }) => {
  const useDiscounts = () => {
    const [discountsUsed, setDiscountsUsed] = useState<{ code: string }[]>([]);
    useEffect(() => {
      getDiscountsUsedForOrder(order.id)
        .then((codes) => setDiscountsUsed(codes))
        .catch((err) => console.error(err));
    }, []);
    return discountsUsed;
  };

  const useOrderDetails = () => {
    const [orderDetails, setOrderDetails] =
      useState<IDetailedProductInOrder[]>();

    useEffect(() => {
      getProductsDetailsInOrder(order.id)
        .then((orderDetails) => setOrderDetails(orderDetails))
        .catch((err) => console.error(err));
    }, []);
    return orderDetails;
  };

  const orderDetails = useOrderDetails();
  const discountsUsed = useDiscounts();

  if (orderDetails === undefined) {
    // Temporary return, will show a loading page instead
    return null;
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2"></div>
      <div className="flex flex-col gap-4">
        {orderDetails.map((product) => (
          <div
            className="flex flex-row bg-accent w-full rounded-md h-fit"
            key={product.productId}
          >
            {product.imageDetails === undefined ? (
              <Image
                className="rounded-l-md w-fit"
                alt={"Preview"}
                src={noProductImage.src}
                width={100}
                height={100}
              />
            ) : (
              <Image
                className="rounded-l-md w-fit"
                alt={product.imageDetails.altText}
                src={product.imageDetails.primaryLink}
                width={100}
                height={100}
              />
            )}
            <div className="flex flex-col text-accent-foreground p-4 w-full flex-grow">
              <Link
                href={`/product/${product.productId}`}
                className="w-fit hover:opacity-80"
              >
                <h3 className="text-base md:text-lg font-semibold">
                  {product.productName}
                </h3>
              </Link>
              <div className="flex flex-col justify-end items-end flex-grow">
                <p className="text-base md:text-xl font-semibold">
                  <small className="font-medium">{product.quantity} x </small>£
                  {product.price.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col w-full">
        <div className="flex flex-col text-end items-end w-fulltext-lg font-semibold">
          <p>Items: £{order.total.toFixed(2)}</p>
          {discountsUsed.map((code, index) => (
            <p key={index} className="font-light text-sm italic">
              Code: {code.code}
            </p>
          ))}
          <p>Delivery: £0.00</p>
          <p>Total paid: £{order.pricePaid.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
