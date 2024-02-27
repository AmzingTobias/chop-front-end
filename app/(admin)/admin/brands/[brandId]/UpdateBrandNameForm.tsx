"use client";

import { TBrandEntry, getAllBrands, updateBrandName } from "@/app/data/brands";
import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { z } from "zod";
import BrandForm, { brandSchema } from "../BrandForm";

interface IUpdateBrandNameFormProps {
  refreshProducts: () => void;
  brandId: number;
}

const UpdateBrandNameForm: React.FC<IUpdateBrandNameFormProps> = ({
  brandId,
  refreshProducts,
}) => {
  const useBrandDetails = () => {
    const [brandDetails, setBrandDetails] = useState<TBrandEntry>();
    useEffect(() => {
      getAllBrands().then((allBrands) => {
        const brandFound = allBrands.find((brand) => brand.id == brandId);
        setBrandDetails(brandFound);
      });
    }, []);
    return brandDetails;
  };

  const brandDetails = useBrandDetails();

  const [brandUpdatedAlert, setBrandUpdatedAlert] = useState(false);
  const [brandUpdateFailed, setBrandUpdateFailed] = useState(false);

  const createBrandFormSubmit = (values: z.infer<typeof brandSchema>) => {
    updateBrandName(brandId, values.name)
      .then(() => {
        refreshProducts();
        setBrandUpdatedAlert(true);
      })
      .catch((err) => {
        console.error(err);
        setBrandUpdateFailed(true);
      });
  };

  if (brandDetails === undefined) {
    return null;
  }

  return (
    <>
      <BrandForm
        submitBtnText="Update brand"
        onFormSubmit={createBrandFormSubmit}
        defaultValues={{ name: brandDetails.name }}
      />
      <AlertDialog open={brandUpdatedAlert} onOpenChange={setBrandUpdatedAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Updated brand</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogAction className="bg-secondary">Ok</AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={brandUpdateFailed} onOpenChange={setBrandUpdateFailed}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Failed to update brand</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogAction className="bg-secondary">Ok</AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default UpdateBrandNameForm;
