"use client";

import { useEffect, useState } from "react";
import ImageAdder from "./ImageAdder";
import FormDetails, { createProductSchema } from "./FormDetails";
import { z } from "zod";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Loader2 } from "lucide-react";
import { addImageToProduct, createProductRequest } from "@/app/data/products";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { EAccountTypes } from "@/app/data/auth";

enum ECreateProductStatus {
  IDLE,
  CREATING,
  ADDING_IMAGES,
  FINISHED,
  FAILED,
}

interface ICreateProductFormProps {
  baseProductId: number;
  accountTypeLoggedIn: EAccountTypes.admin | EAccountTypes.sales;
}

const CreateProductForm: React.FC<ICreateProductFormProps> = ({
  baseProductId,
  accountTypeLoggedIn,
}) => {
  const [imagesToUpload, setImagesToUpload] = useState<File[]>([]);
  const [createStatus, setCreateStatus] = useState<ECreateProductStatus>(
    ECreateProductStatus.IDLE
  );

  const removeImageFile = (indexPositionToRemove: number) => {
    setImagesToUpload([
      ...imagesToUpload.slice(0, indexPositionToRemove),
      ...imagesToUpload.slice(indexPositionToRemove + 1),
    ]);
  };

  const swapImageFiles = (indexOne: number, indexTwo: number) => {
    const newImagesToUpload = [...imagesToUpload];
    [newImagesToUpload[indexOne], newImagesToUpload[indexTwo]] = [
      newImagesToUpload[indexTwo],
      newImagesToUpload[indexOne],
    ];
    setImagesToUpload(newImagesToUpload);
  };

  const addImageToUploads = (imageToAdd: File) => {
    setImagesToUpload((prev) => [...prev, imageToAdd]);
  };

  const onCreateProductFormSubmit = (
    values: z.infer<typeof createProductSchema>
  ) => {
    setProductCreatedBoxOpen(true);
    createProductRequest(
      Number(baseProductId),
      values.name,
      values.description,
      values.price,
      values.stockCount,
      values.available
    )
      .then(async (created) => {
        if (created.created && typeof created.productId === "number") {
          const productId = created.productId;
          setCreateStatus(ECreateProductStatus.ADDING_IMAGES);
          await Promise.all(
            imagesToUpload.map((image) => {
              addImageToProduct(productId, image);
            })
          );
          setIdOfProductCreated(productId);
          setCreateStatus(ECreateProductStatus.FINISHED);
        }
      })
      .catch((err) => {
        console.error(err);
        setCreateStatus(ECreateProductStatus.FAILED);
      });
  };

  const [productCreatedBoxOpen, setProductCreatedBoxOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [idOfProductCreated, setIdOfProductCreated] = useState<number>();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex flex-col w-full gap-2">
      <Button
        className="bg-accent hover:bg-opacity-80 mx-2"
        onClick={() =>
          router.push(
            `/${
              accountTypeLoggedIn === EAccountTypes.admin ? "admin" : "sales"
            }/products/${baseProductId}`
          )
        }
      >
        Return
      </Button>
      <div className="w-full">
        <ImageAdder
          addImageToUpload={addImageToUploads}
          removeImage={removeImageFile}
          swapImage={swapImageFiles}
        />
      </div>
      <hr className="border-accent border-[1px] bg-accent" />
      <div className="w-full h-screen">
        <FormDetails
          handleOnSubmit={onCreateProductFormSubmit}
          submitFormText="Create product"
        />
      </div>
      {mounted && (
        <AlertDialog
          open={productCreatedBoxOpen}
          onOpenChange={setProductCreatedBoxOpen}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Creating product</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogDescription className="flex flex-row items-center">
              {createStatus === ECreateProductStatus.CREATING && (
                <>
                  <Loader2 className="mr-2 animate-spin" />
                  Creating product
                </>
              )}
              {createStatus === ECreateProductStatus.ADDING_IMAGES && (
                <>
                  <Loader2 className="mr-2 animate-spin" />
                  Adding images
                </>
              )}
              {createStatus === ECreateProductStatus.FAILED &&
                "Failed to create product"}
              {createStatus === ECreateProductStatus.FINISHED &&
                "Product created"}
            </AlertDialogDescription>
            <AlertDialogAction
              disabled={
                createStatus !== ECreateProductStatus.FINISHED &&
                createStatus !== ECreateProductStatus.FAILED
              }
              className="bg-secondary"
              onClick={() => {
                if (
                  createStatus === ECreateProductStatus.FINISHED &&
                  idOfProductCreated !== undefined
                ) {
                  router.push(
                    `/${
                      accountTypeLoggedIn === EAccountTypes.admin
                        ? "admin"
                        : "sales"
                    }/products/${baseProductId}/${idOfProductCreated}`
                  );
                }
              }}
            >
              Ok
            </AlertDialogAction>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
};

export default CreateProductForm;
