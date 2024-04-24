"use client";

import {
  TCustomerAddress,
  TShippingCountries,
  createNewAddress,
  serverSetDefaultAddress,
  serverUpdateDefaultAddress,
} from "@/app/data/address";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z
  .object({
    firstAddressLine: z.string().min(1).trim(),
    secondAddressLine: z.string().trim(),
    areaCode: z.string().min(3).max(10).trim(),
    state: z.string().min(1).trim(),
    countryId: z.coerce
      .number({ invalid_type_error: "Please select a country" })
      .nonnegative(),
    default: z.boolean(),
  })
  .required()
  .partial({ secondAddressLine: true });

interface IAddressFormProps {
  countriesAvailable: TShippingCountries[];
  refreshAddressData: () => void;
  customerHasDefaultAddress: boolean;
}

const AddressForm: React.FC<IAddressFormProps> = ({
  countriesAvailable,
  refreshAddressData,
  customerHasDefaultAddress,
}) => {
  const [confirmBoxOpen, setConfirmBoxOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [addressAddedLoading, setAddressAddedLoading] = useState(false);
  const selectRef: React.Ref<HTMLSpanElement> = useRef(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstAddressLine: "",
      secondAddressLine: "",
      areaCode: "",
      state: "",
      default: !customerHasDefaultAddress,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const newAddress: TCustomerAddress = {
      // ID is not needed in the context of this request
      id: NaN,
      firstAddressLine: values.firstAddressLine,
      secondAddressLine:
        values.secondAddressLine === "" ? undefined : values.secondAddressLine,
      areaCode: values.areaCode,
      countryState: values.state,
      countryId: values.countryId,
    };
    setAddressAddedLoading(true);
    createNewAddress(newAddress)
      .then(async (addressId) => {
        if (addressId !== undefined) {
          if (values.default) {
            if (customerHasDefaultAddress) {
              await serverUpdateDefaultAddress(addressId);
            } else {
              await serverSetDefaultAddress(addressId);
            }
          }
          form.reset();
          form.setValue("countryId", values.countryId);
          refreshAddressData();
          setAddressAddedLoading(false);
          setConfirmBoxOpen(true);
        } else {
          console.error("Address could not be created");
          setAddressAddedLoading(false);
        }
      })
      .catch((_) => {
        setAddressAddedLoading(false);
      });
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="firstAddressLine"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">
                  First line of address *
                </FormLabel>
                <FormControl>
                  <Input
                    className="text-accent"
                    type="text"
                    placeholder="First line of address"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="secondAddressLine"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">
                  Second line of address
                </FormLabel>
                <FormControl>
                  <Input
                    className="text-accent"
                    type="text"
                    placeholder="Second line of address"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="areaCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Area code*</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Area code"
                    className="text-accent"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">State*</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="State"
                    className="text-accent"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="countryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Country</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={
                      typeof field.value === "undefined"
                        ? undefined
                        : field.value.toString()
                    }
                  >
                    <SelectTrigger>
                      <SelectValue
                        ref={selectRef}
                        placeholder="Select a country"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {countriesAvailable.map((country, index) => (
                        <SelectItem
                          className="cursor-pointer text-accent-foreground hover:text-secondary"
                          key={index}
                          value={country.id.toString()}
                        >
                          {country.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="default"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                <FormControl>
                  <Input
                    className="w-fit"
                    type="checkbox"
                    onChange={field.onChange}
                    checked={field.value}
                    disabled={field.disabled}
                    ref={field.ref}
                    onBlur={field.onBlur}
                  />
                </FormControl>
                <FormLabel className="text-base">
                  Set as default address
                </FormLabel>
              </FormItem>
            )}
          />
          <Button
            disabled={addressAddedLoading}
            type="submit"
            className="w-full text-base"
            variant={"secondary"}
          >
            {addressAddedLoading ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <></>
            )}
            Add address
          </Button>
        </form>
      </Form>{" "}
      {isMounted ? (
        <AlertDialog open={confirmBoxOpen} onOpenChange={setConfirmBoxOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Address created</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogAction className="bg-secondary">Ok</AlertDialogAction>
          </AlertDialogContent>
        </AlertDialog>
      ) : (
        <></>
      )}
    </>
  );
};

export default AddressForm;
