"use client";

import {
  TCustomerAddress,
  TShippingCountries,
  getCountriesAvailableForShipping,
  getCustomerAddresses,
  getDefaultAddress,
  serverDeleteAddress,
  serverSetDefaultAddress,
  serverUpdateDefaultAddress,
} from "@/app/data/address";
import { useEffect, useState } from "react";
import AddressBox from "./AddressBox";
import AddressForm from "./AddressForm";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const AddressBook = () => {
  const [addresses, setAddresses] = useState<TCustomerAddress[]>([]);
  const [defaultAddressId, setDefaultAddressId] = useState<number | null>(null);
  const [availableCountries, setAvailableCountries] = useState<
    TShippingCountries[]
  >([]);
  const [isMounted, setIsMounted] = useState(false);
  const [deleteAddressAlertOpen, setDeleteAddressAlertOpen] = useState(false);
  const [newDefaultAddressAlertOpen, setNewDefaultAddressAlertOpen] =
    useState(false);

  const fetchData = () => {
    getCustomerAddresses().then((addresses) => {
      setAddresses(addresses);
    });
    getDefaultAddress().then((defaultAddressId) => {
      setDefaultAddressId(defaultAddressId);
    });
  };

  useEffect(() => {
    setIsMounted(true);
    fetchData();
    getCountriesAvailableForShipping().then((countries) => {
      setAvailableCountries(countries);
    });
  }, []);

  const setNewDefaultAddress = (addressId: number) => {
    if (defaultAddressId === null) {
      serverSetDefaultAddress(addressId).then((updated) => {
        setNewDefaultAddressAlertOpen(true);
        fetchData();
      });
    } else {
      serverUpdateDefaultAddress(addressId).then((updated) => {
        setNewDefaultAddressAlertOpen(true);
        fetchData();
      });
    }
  };

  const deleteAddressBtnAction = (addressIdToDelete: number) => {
    setAddresses((addresses) =>
      addresses.filter((address) => address.id !== addressIdToDelete)
    );
    serverDeleteAddress(addressIdToDelete).then((_) => {
      fetchData();
      setDeleteAddressAlertOpen(true);
    });
  };

  return (
    <div className="flex flex-col space-y-4">
      {addresses.map((address, index) => {
        return (
          <div key={index}>
            <AddressBox
              isDefault={address.id === defaultAddressId}
              key={index}
              address={address}
              setDefaultAddress={setNewDefaultAddress}
              deleteAddressAction={deleteAddressBtnAction}
            />
          </div>
        );
      })}
      <h2 className="text-3xl font-semibold underline">New address</h2>
      <AddressForm
        customerHasDefaultAddress={defaultAddressId !== null}
        countriesAvailable={availableCountries}
        refreshAddressData={fetchData}
      />
      {isMounted ? (
        <AlertDialog
          open={deleteAddressAlertOpen}
          onOpenChange={setDeleteAddressAlertOpen}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Address deleted</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogAction className="bg-secondary">Ok</AlertDialogAction>
          </AlertDialogContent>
        </AlertDialog>
      ) : (
        <></>
      )}
      {isMounted ? (
        <AlertDialog
          open={newDefaultAddressAlertOpen}
          onOpenChange={setNewDefaultAddressAlertOpen}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>New default address set</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogAction className="bg-secondary">Ok</AlertDialogAction>
          </AlertDialogContent>
        </AlertDialog>
      ) : (
        <></>
      )}
    </div>
  );
};

export default AddressBook;
