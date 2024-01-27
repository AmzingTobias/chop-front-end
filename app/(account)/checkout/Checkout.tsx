"use client";

import {
  TCustomerAddress,
  getCustomerAddresses,
  getDefaultAddress,
} from "@/app/data/address";
import { useEffect, useState } from "react";
import DeliveryAddressSelection from "./DeliveryAddressSelection";
import DeliveryAddress from "./DeliveryAddress";

const Checkout = () => {
  const useDeliveryAddress = () => {
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
    };
  };

  const {
    deliveryAddresses,
    refreshCustomerAddresses,
    selectedAddress,
    setSelectedAddress,
  } = useDeliveryAddress();

  return (
    <div className="flex flex-col">
      <div className="w-2/3">
        {selectedAddress === undefined ? (
          <DeliveryAddressSelection
            addresses={deliveryAddresses}
            refreshCustomerAddresses={refreshCustomerAddresses}
            setSelectedAddress={setSelectedAddress}
          />
        ) : (
          <div className="flex flex-row">
            <div className="text-bold justify-start font-bold">
              Delivery address
            </div>
            <div className="ml-auto mr-auto justify-center">
              {selectedAddress && <DeliveryAddress address={selectedAddress} />}
            </div>

            <div
              className="ml-auto justify-end font-semibold text-secondary"
              onClick={() => setSelectedAddress(undefined)}
            >
              <p className="cursor-pointer hover:underline">Change</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
