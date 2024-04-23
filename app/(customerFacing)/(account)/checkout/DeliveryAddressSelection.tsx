"use client";

import {
  TCustomerAddress,
  TShippingCountries,
  getCountriesAvailableForShipping,
} from "@/app/data/address";
import { SetStateAction, useEffect, useState } from "react";
import AddressForm from "../settings/AddressForm";
import CustomerAddress from "@/app/components/CustomerAddress";
import { Button } from "@/components/ui/button";

interface IDeliveryAddressSelection {
  addresses: TCustomerAddress[];
  refreshCustomerAddresses: () => void;
  setSelectedAddress: React.Dispatch<
    SetStateAction<TCustomerAddress | undefined>
  >;
  customerHasDefaultAddress: boolean;
}

const DeliveryAddressSelection: React.FC<IDeliveryAddressSelection> = ({
  addresses,
  refreshCustomerAddresses,
  setSelectedAddress,
  customerHasDefaultAddress,
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
            <CustomerAddress address={address} />
            <div className="flex flex-col ml-auto justify-end">
              <Button
                variant={"secondary"}
                className="text-secondary-foreground font-semibold cursor-pointer text-lg p-2 max-h-[32px]"
                onClick={() => setSelectedAddress(address)}
              >
                Select
              </Button>
            </div>
          </div>
        </div>
      ))}
      <div className="bg-accent p-2 text-accent-foreground rounded-md">
        <AddressForm
          customerHasDefaultAddress={customerHasDefaultAddress}
          refreshAddressData={refreshCustomerAddresses}
          countriesAvailable={availableCountries}
        />
      </div>
    </div>
  );
};

export default DeliveryAddressSelection;
