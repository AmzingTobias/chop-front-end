import {
  IDetailedProductInOrder,
  TOrderEntry,
  getProductsDetailsInOrder,
} from "@/app/data/orders";
import Image from "next/image";
import { useEffect, useState } from "react";
import noProductImage from "@/public/no-product.png";
import { Raleway } from "next/font/google";
const raleway = Raleway({ subsets: ["latin"] });

interface IOrderDetailsProps {
  order: TOrderEntry;
}

const OrderDetails: React.FC<IOrderDetailsProps> = ({ order }) => {
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

  if (orderDetails === undefined) {
    // Temporary return, will show a loading page instead
    return null;
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        <h2 className={`text-2xl w-full text-center ${raleway.className}`}>
          Order summary
        </h2>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className={`text-2xl w-full text-center ${raleway.className}`}>
          Items in order
        </h2>
        {orderDetails.map((product) => (
          <div
            className="flex flex-row bg-accent w-full rounded-md h-fit"
            key={product.productId}
          >
            {product.imageDetails === undefined ? (
              <Image
                className="rounded-l-md"
                alt={"Preview"}
                src={noProductImage.src}
                width={100}
                height={100}
              />
            ) : (
              <Image
                className="rounded-l-md"
                alt={product.imageDetails.altText}
                src={product.imageDetails.primaryLink}
                width={100}
                height={100}
              />
            )}
            <div className="flex flex-col text-accent-foreground p-4 w-full flex-grow">
              <h3 className="text-lg font-semibold">{product.productName}</h3>
              <div className="flex flex-col justify-end items-end flex-grow">
                <p className="text-xl font-semibold">
                  <small className="font-medium">{product.quantity} x </small>£
                  {product.price.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderDetails;
