"use client";

import { createNewBrand } from "@/app/data/brands";
import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { z } from "zod";
import BrandForm, { brandSchema } from "./BrandForm";

interface INewBrandProps {
  refreshBrands: () => void;
}

const NewBrand: React.FC<INewBrandProps> = ({ refreshBrands }) => {
  const [brandCreatedAlert, setBrandCreatedAlert] = useState(false);
  const [brandCreateFailed, setBrandCreateFailed] = useState(false);

  const createBrandFormSubmit = (values: z.infer<typeof brandSchema>) => {
    createNewBrand(values.name)
      .then(() => {
        refreshBrands();
        setBrandCreatedAlert(true);
      })
      .catch((err) => {
        console.error(err);
        setBrandCreateFailed(true);
      });
  };

  return (
    <>
      <BrandForm
        submitBtnText="Create brand"
        onFormSubmit={createBrandFormSubmit}
      />
      <AlertDialog open={brandCreatedAlert} onOpenChange={setBrandCreatedAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Created new brand</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogAction className="bg-secondary">Ok</AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={brandCreateFailed} onOpenChange={setBrandCreateFailed}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Failed to create brand</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogAction className="bg-secondary">Ok</AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default NewBrand;
