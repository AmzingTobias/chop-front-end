"use client";

import {
  TCustomerAddress,
  getCustomerAddresses,
  getDefaultAddress,
} from "@/app/data/address";
import { useEffect, useState } from "react";
import DeliveryAddressSelection from "./DeliveryAddressSelection";
import DeliveryAddress from "./DeliveryAddress";
import ChangeSection from "./ChangeSection";
import PaymentInfo from "./PaymentInfo";
import Basket from "./Basket";
import { TBasketEntry, getBasketContents } from "@/app/data/basket";
import ReviewOrder from "./ReviewOrder";
import { TDiscountCodeValidation } from "@/app/data/discounts";

const Checkout = () => {
  const useDeliveryAddress = () => {
    const [dataReceived, setDataReceived] = useState(false);
    const [deliveryAddresses, setDeliveryAddresses] = useState<
      TCustomerAddress[]
    >([]);
    const [selectedAddress, setSelectedAddress] = useState<TCustomerAddress>();

    const refreshCustomerAddresses = () => {
      getCustomerAddresses()
        .then((addresses) => setDeliveryAddresses(addresses))
        .catch((_) => setDeliveryAddresses([]));
    };

    useEffect(() => {
      getCustomerAddresses()
        .then((addresses) => {
          setDeliveryAddresses(addresses);
          getDefaultAddress()
            .then((defaultAddressId) => {
              const defaultAddress = addresses.find(
                (address) => address.id === defaultAddressId
              );
              if (defaultAddress !== undefined) {
                setSelectedAddress(defaultAddress);
              }
              setDataReceived(true);
            })
            .catch((_) => setSelectedAddress(undefined));
        })
        .catch((_) => setDeliveryAddresses([]));
    }, []);
    return {
      deliveryAddresses,
      refreshCustomerAddresses,
      selectedAddress,
      setSelectedAddress,
      deliveryAddressDataReceived: dataReceived,
    };
  };

  const useBasket = () => {
    const [basketContents, setBasketContents] = useState<TBasketEntry[]>([]);
    useEffect(() => {
      getBasketContents()
        .then((contents) => {
          setBasketContents(contents);
        })
        .catch((err) => {
          console.error(err);
          setBasketContents([]);
        });
    }, []);
    return basketContents;
  };

  const basketContents = useBasket();

  const [discountCodesBeingUsed, setDiscountCodesBeingUsed] = useState<
    TDiscountCodeValidation[]
  >([]);

  const {
    deliveryAddresses,
    refreshCustomerAddresses,
    selectedAddress,
    setSelectedAddress,
    deliveryAddressDataReceived,
  } = useDeliveryAddress();

  if (!deliveryAddressDataReceived) {
    return null;
  }

  return (
    <div className="flex flex-row w-full gap-8">
      <div className="w-3/4 flex flex-col gap-3">
        {selectedAddress === undefined ? (
          <DeliveryAddressSelection
            addresses={deliveryAddresses}
            refreshCustomerAddresses={refreshCustomerAddresses}
            setSelectedAddress={setSelectedAddress}
          />
        ) : (
          <ChangeSection
            title="Delivery address"
            onChangeClick={() => setSelectedAddress(undefined)}
            centerContent={
              selectedAddress && <DeliveryAddress address={selectedAddress} />
            }
          />
        )}
        <hr className="border-[1px] border-accent" />
        <ChangeSection
          title="Payment method"
          centerContent={
            <PaymentInfo
              codesInUse={discountCodesBeingUsed}
              setCodesInUse={setDiscountCodesBeingUsed}
            />
          }
        />
        <hr className="border-[1px] border-accent" />
        <h3 className="font-bold">Review Items</h3>
        <Basket contents={basketContents} />
      </div>
      <div className="flex w-1/4">
        <ReviewOrder
          totalPrice={basketContents.reduce(
            (prev, current) => prev + current.price * current.quantity,
            0
          )}
          discountCodesBeingUsed={discountCodesBeingUsed}
        />
      </div>
    </div>
  );
};

export default Checkout;
