"use client";

import {
  TCustomerAddress,
  TShippingCountries,
  getCountriesAvailableForShipping,
  getCustomerAddresses,
} from "@/app/data/address";
import { SetStateAction, useEffect, useState } from "react";
import AddressForm from "../settings/AddressForm";
import DeliveryAddress from "./DeliveryAddress";

interface IDeliveryAddressSelection {
  addresses: TCustomerAddress[];
  refreshCustomerAddresses: () => void;
  setSelectedAddress: React.Dispatch<
    SetStateAction<TCustomerAddress | undefined>
  >;
}

const DeliveryAddressSelection: React.FC<IDeliveryAddressSelection> = ({
  addresses,
  refreshCustomerAddresses,
  setSelectedAddress,
}) => {
  const [availableCountries, setAvailableCountries] = useState<
    TShippingCountries[]
  >([]);

  useEffect(() => {
    getCountriesAvailableForShipping()
      .then((countries) => setAvailableCountries(countries))
      .catch((_) => setAvailableCountries([]));
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {addresses.map((address) => (
        <div
          key={address.id}
          className="bg-accent text-accent-foreground rounded-md p-2"
        >
          <div className="flex flex-row">
            <DeliveryAddress address={address} />
            <div className="flex flex-col ml-auto justify-end">
              <h3
                className="text-secondary font-semibold underline cursor-pointer select-none"
                onClick={() => setSelectedAddress(address)}
              >
                Select
              </h3>
            </div>
          </div>
        </div>
      ))}
      <div className="bg-accent p-2 text-accent-foreground rounded-md">
        <AddressForm
          refreshAddressData={refreshCustomerAddresses}
          countriesAvailable={availableCountries}
        />
      </div>
    </div>
  );
};

export default DeliveryAddressSelection;
