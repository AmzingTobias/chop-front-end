"use client";

import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { z } from "zod";
import {
  TProductType,
  getProductTypes,
  updateProductTypeName,
} from "@/app/data/products";
import ProductTypeForm, { productTypeSchema } from "../ProductTypeForm";

interface IUpdateProductTypeFormProps {
  refreshProducts: () => void;
  productTypeId: number;
}

const UpdateProductTypeForm: React.FC<IUpdateProductTypeFormProps> = ({
  productTypeId,
  refreshProducts,
}) => {
  const useProductTypeDetails = () => {
    const [productType, setProductType] = useState<TProductType>();
    useEffect(() => {
      getProductTypes().then((allProductTypes) => {
        const productTypeFound = allProductTypes.find(
          (productType) => productType.id == productTypeId
        );
        setProductType(productTypeFound);
      });
    }, []);
    return productType;
  };

  const productType = useProductTypeDetails();

  const [productTypeUpdatedAlert, setProductTypeUpdatedAlert] = useState(false);
  const [productTypeUpdateFailed, setProductTypeUpdateFailed] = useState(false);

  const updateProductTypeFormSubmit = (
    values: z.infer<typeof productTypeSchema>
  ) => {
    updateProductTypeName(productTypeId, values.name)
      .then(() => {
        refreshProducts();
        setProductTypeUpdatedAlert(true);
      })
      .catch((err) => {
        console.error(err);
        setProductTypeUpdateFailed(true);
      });
  };

  if (productType === undefined) {
    return null;
  }

  return (
    <>
      <ProductTypeForm
        submitBtnText="Update product type"
        onFormSubmit={updateProductTypeFormSubmit}
        defaultValues={{ name: productType.type }}
      />
      <AlertDialog
        open={productTypeUpdatedAlert}
        onOpenChange={setProductTypeUpdatedAlert}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Updated product type</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogAction className="bg-secondary">Ok</AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={productTypeUpdateFailed}
        onOpenChange={setProductTypeUpdateFailed}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Failed to update product type</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogAction className="bg-secondary">Ok</AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default UpdateProductTypeForm;
