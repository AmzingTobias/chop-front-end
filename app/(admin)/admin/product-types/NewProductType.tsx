"use client";

import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { z } from "zod";
import ProductTypeForm, { productTypeSchema } from "./ProductTypeForm";
import { createNewProductType } from "@/app/data/products";

interface INewProductTypeProps {
  refreshProductTypes: () => void;
}

const NewProductType: React.FC<INewProductTypeProps> = ({
  refreshProductTypes,
}) => {
  const [productTypeCreatedAlert, setProductTypeCreatedAlert] = useState(false);
  const [productTypeCreateFailed, setProductTypeCreateFailed] = useState(false);

  const createBrandFormSubmit = (values: z.infer<typeof productTypeSchema>) => {
    createNewProductType(values.name)
      .then(() => {
        refreshProductTypes();
        setProductTypeCreatedAlert(true);
      })
      .catch((err) => {
        console.error(err);
        setProductTypeCreateFailed(true);
      });
  };

  return (
    <>
      <ProductTypeForm
        submitBtnText="Create product type"
        onFormSubmit={createBrandFormSubmit}
      />
      <AlertDialog
        open={productTypeCreatedAlert}
        onOpenChange={setProductTypeCreatedAlert}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Created new product type</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogAction className="bg-secondary">Ok</AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={productTypeCreateFailed}
        onOpenChange={setProductTypeCreateFailed}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Failed to create product type</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogAction className="bg-secondary">Ok</AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default NewProductType;
