"use client";

import {
  TCustomerAddress,
  getCustomerAddresses,
  getDefaultAddress,
} from "@/app/data/address";
import { useEffect, useState } from "react";
import DeliveryAddressSelection from "./DeliveryAddressSelection";
import ChangeSection from "./ChangeSection";
import PaymentInfo from "./PaymentInfo";
import Basket from "./Basket";
import { TBasketEntry, getBasketContents } from "@/app/data/basket";
import ReviewOrder from "./ReviewOrder";
import CustomerAddress from "@/app/components/CustomerAddress";

const Checkout = () => {
  const useDeliveryAddress = () => {
    const [dataReceived, setDataReceived] = useState(false);
    const [customerDefaultAddressId, setCustomerDefaultAddressId] = useState<
      number | null
    >(null);
    const [deliveryAddresses, setDeliveryAddresses] = useState<
      TCustomerAddress[]
    >([]);
    const [selectedAddress, setSelectedAddress] = useState<TCustomerAddress>();

    const refreshCustomerAddresses = () => {
      getCustomerAddresses()
        .then((addresses) => {
          setDeliveryAddresses(addresses);
          getDefaultAddress().then((defaultAddressId) => {
            setCustomerDefaultAddressId(defaultAddressId);
            if (
              defaultAddressId !== null &&
              defaultAddressId !== customerDefaultAddressId
            ) {
              const defaultAddress = addresses.find(
                (address) => address.id === defaultAddressId
              );
              if (defaultAddress !== undefined) {
                setSelectedAddress(defaultAddress);
              }
            }
          });
        })
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
                setCustomerDefaultAddressId(defaultAddress.id);
                setSelectedAddress(defaultAddress);
              } else if (addresses.length === 1) {
                setSelectedAddress(addresses[0]);
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
      customerDefaultAddressId,
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

  const {
    deliveryAddresses,
    refreshCustomerAddresses,
    selectedAddress,
    setSelectedAddress,
    deliveryAddressDataReceived,
    customerDefaultAddressId,
  } = useDeliveryAddress();

  useEffect(() => {
    if (deliveryAddresses.length === 1) {
      setSelectedAddress(deliveryAddresses[0]);
    }
  }, [deliveryAddresses, setSelectedAddress]);

  if (!deliveryAddressDataReceived) {
    return null;
  }

  return (
    <div className="flex flex-col md:flex-row w-full gap-8 p-2 md:p-0">
      <div className="w-full md:w-3/4 flex flex-col gap-3">
        {selectedAddress === undefined ? (
          <DeliveryAddressSelection
            addresses={deliveryAddresses}
            refreshCustomerAddresses={refreshCustomerAddresses}
            setSelectedAddress={setSelectedAddress}
            customerHasDefaultAddress={customerDefaultAddressId !== null}
          />
        ) : (
          <ChangeSection
            title="Delivery address"
            onChangeClick={() => setSelectedAddress(undefined)}
            centerContent={
              selectedAddress && <CustomerAddress address={selectedAddress} />
            }
          />
        )}
        <hr className="bg-accent border-[1px] border-accent" />
        <ChangeSection title="Payment method" centerContent={<PaymentInfo />} />
        <hr className="bg-accent border-[1px] border-accent" />
        <h3 className="font-bold">Review Items</h3>
        <Basket contents={basketContents} />
      </div>
      <div className="flex w-full md:w-1/4">
        <ReviewOrder
          totalPrice={basketContents.reduce(
            (prev, current) => prev + current.price * current.quantity,
            0
          )}
          shippingAddress={selectedAddress}
        />
      </div>
    </div>
  );
};

export default Checkout;
