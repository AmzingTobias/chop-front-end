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
    <div className="flex flex-col">
      <div className="w-2/3 flex flex-col gap-3">
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
          centerContent={<PaymentInfo />}
          onChangeClick={() => {}}
        />
        <hr className="border-[1px] border-accent" />
      </div>
    </div>
  );
};

export default Checkout;
