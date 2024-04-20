"use client";

import { useEffect, useState } from "react";
import FormDetails, { createProductSchema } from "../create/FormDetails";
import {
  IProductEntry,
  getProductWithId,
  updateProductAvailability,
  updateProductDescription,
  updateProductName,
  updateProductPrice,
  updateProductStock,
} from "@/app/data/products";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { z } from "zod";

interface IUpdateProductFormProps {
  productId: number;
}

const UpdateProductForm: React.FC<IUpdateProductFormProps> = ({
  productId,
}) => {
  const useProduct = () => {
    const [productDetails, setProductDetails] = useState<IProductEntry>();
    useEffect(() => {
      getProductWithId(productId)
        .then((product) => {
          if (product !== null) {
            setProductDetails(product);
          } else {
            setProductDetails(undefined);
          }
        })
        .catch((err) => {
          console.error(err);
          setProductDetails(undefined);
        });
    }, []);
    return productDetails;
  };

  const productDetails = useProduct();
  const [productUpdatedConfirmed, setProductUpdatedConfirmed] = useState(false);
  const [productUpdatedFailed, setProductUpdatedFailed] = useState(false);

  if (productDetails === undefined) {
    // TODO replace with loading
    return null;
  }

  const handleUpdateBtnClick = async (
    values: z.infer<typeof createProductSchema>
  ) => {
    let issueUpdatingProduct = true;
    // Check for difference in product name
    if (productDetails.name !== values.name) {
      try {
        await updateProductName(productId, values.name);
      } catch (err) {
        console.error(err);
        issueUpdatingProduct = false;
      }
    }
    // Check for difference in product description
    if (productDetails.description !== values.description) {
      try {
        await updateProductDescription(productId, values.description);
      } catch (err) {
        console.error(err);
        issueUpdatingProduct = false;
      }
    }
    // Check for difference in product price
    if (productDetails.price !== values.price) {
      try {
        await updateProductPrice(productId, values.price);
      } catch (err) {
        console.error(err);
        issueUpdatingProduct = false;
      }
    }
    // Check for difference in product stock count
    if (productDetails.stock_count !== values.stockCount) {
      try {
        await updateProductStock(productId, values.stockCount);
      } catch (err) {
        console.error(err);
        issueUpdatingProduct = false;
      }
    }
    // Check for difference in product availability
    if (productDetails.available !== values.available) {
      try {
        await updateProductAvailability(productId, values.available);
      } catch (err) {
        console.error(err);
        issueUpdatingProduct = false;
      }
    }
    if (issueUpdatingProduct) {
      setProductUpdatedConfirmed(true);
    } else {
      setProductUpdatedFailed(true);
    }
  };

  return (
    <div className="w-full">
      <FormDetails
        submitFormText="Update product"
        handleOnSubmit={handleUpdateBtnClick}
        defaultValues={{
          name: productDetails.name,
          description:
            productDetails.description === undefined
              ? ""
              : productDetails.description,
          price: productDetails.price,
          stockCount: productDetails.stock_count,
          available: productDetails.available,
        }}
      />
      <AlertDialog
        open={productUpdatedConfirmed}
        onOpenChange={setProductUpdatedConfirmed}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Product updated</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogAction className="bg-secondary" onClick={() => {}}>
            Ok
          </AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog
        open={productUpdatedFailed}
        onOpenChange={setProductUpdatedFailed}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Product could not be updated</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogAction className="bg-secondary" onClick={() => {}}>
            Ok
          </AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default UpdateProductForm;
