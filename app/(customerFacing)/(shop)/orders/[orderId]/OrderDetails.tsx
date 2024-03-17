"use client";

import CustomerAddress from "@/app/components/CustomerAddress";
import { TCustomerAddress, getCustomerAddresses } from "@/app/data/address";
import {
  IDetailedProductInOrder,
  TOrderEntry,
  getDiscountsUsedForOrder,
  getOrderWithId,
  getProductsDetailsInOrder,
} from "@/app/data/orders";
import { useEffect, useState } from "react";
import Image from "next/image";
import noProductImage from "@/public/no-product.png";
import { Raleway } from "next/font/google";
import SectionHeading from "@/app/components/SectionHeading";
import { Progress } from "@/components/ui/progress";
const raleway = Raleway({ subsets: ["latin"] });

interface IOrderDetailsProps {
  orderId: number;
}

const OrderDetails: React.FC<IOrderDetailsProps> = ({ orderId }) => {
  const useOrder = () => {
    const [orderInfo, setOrderInfo] = useState<TOrderEntry | null>(null);
    useEffect(() => {
      getOrderWithId(orderId)
        .then((order) => setOrderInfo(order))
        .catch((err) => {
          console.error(err);
          setOrderInfo(null);
        });
    }, []);
    return orderInfo;
  };
  const useAddresses = () => {
    const [addresses, setAddresses] = useState<TCustomerAddress[]>([]);

    useEffect(() => {
      getCustomerAddresses()
        .then((addresses) => setAddresses(addresses))
        .catch((err) => console.error(err));
    }, []);
    return addresses;
  };

  const useDiscounts = () => {
    const [discountsUsed, setDiscountsUsed] = useState<{ code: string }[]>([]);
    useEffect(() => {
      getDiscountsUsedForOrder(orderId)
        .then((codes) => setDiscountsUsed(codes))
        .catch((err) => console.error(err));
    }, []);
    return discountsUsed;
  };

  const useProductsInOrder = () => {
    const [productsInOrder, setProductsInOrder] =
      useState<IDetailedProductInOrder[]>();

    useEffect(() => {
      getProductsDetailsInOrder(orderId)
        .then((productsInOrder) => setProductsInOrder(productsInOrder))
        .catch((err) => console.error(err));
    }, []);
    return productsInOrder;
  };

  const orderInfo = useOrder();
  const discountsUsed = useDiscounts();
  const productsInOrder = useProductsInOrder();
  const customerAddresses = useAddresses();
  if (productsInOrder === undefined || orderInfo === null) {
    return (
      <div className="flex min-h-[600px] w-full items-center">
        <h2 className="w-full text-center text-2xl font-semibold">
          Order does not exist
        </h2>
      </div>
    );
  }
  const addressUsedForOrder = customerAddresses.find(
    (addr) => addr.id === orderInfo.shippingAddressId
  );

  const convertStatusToValue = (status: string) => {
    switch (status) {
      case "Ordered":
        return 25;
      case "Dispatched":
        return 50;
      case "Shipped":
        return 75;
      case "Delivered":
        return 100;
      default:
        return 0;
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        <SectionHeading text={`Order summary: #${orderId}`} />
        <div className="flex flex-col gap-2">
          <h3 className={`w-full text-center text-xl ${raleway.className}`}>
            Order placed: {new Date(orderInfo.placed_on).toLocaleString()}
          </h3>
          <h3
            className={`w-full text-center text-2xl ${raleway.className}  uppercase  font-semibold`}
          >
            Status: {orderInfo.status}
          </h3>
          <Progress value={convertStatusToValue(orderInfo.status)} />
        </div>
        <div className="flex flex-col items-end sm:items-baseline sm:flex-row w-full">
          {addressUsedForOrder !== undefined && (
            <CustomerAddress address={addressUsedForOrder} className="w-full" />
          )}
          <div className="flex flex-col text-end sm:text-start items-end w-full sm:w-1/2 text-lg font-semibold">
            <p>Items: £{orderInfo.total.toFixed(2)}</p>
            {discountsUsed.map((code, index) => (
              <p key={index} className="font-light text-sm italic">
                Code: {code.code}
              </p>
            ))}
            <p>Delivery: £0.00</p>
            <p>Total paid: £{orderInfo.pricePaid.toFixed(2)}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className={`text-2xl w-full text-center ${raleway.className}`}>
          Items in order
        </h2>
        <div className="flex flex-col gap-4">
          {productsInOrder.map((product) => (
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
                <h3 className="text-base md:text-lg font-semibold">
                  {product.productName}
                </h3>
                <div className="flex flex-col justify-end items-end flex-grow">
                  <p className="text-base md:text-xl font-semibold">
                    <small className="font-medium">{product.quantity} x </small>
                    £{product.price.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
