"use client";

import { useEffect, useRef, useState } from "react";
import ImageToUploadList from "../create/ImageToUploadList";
import {
  IImageEntry,
  getProductImages,
  removeImageFromProduct,
  setImageSortOrderForProduct,
} from "@/app/data/images";
import { Button } from "@/components/ui/button";
import noProductImage from "@/public/no-product.png";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { addImageToProduct } from "@/app/data/products";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface IUpdateImagesProps {
  productId: number;
}

const UpdateImages: React.FC<IUpdateImagesProps> = ({ productId }) => {
  const useProductImages = () => {
    const [productImages, setProductImages] = useState<IImageEntry[]>([]);
    const refreshImages = () => {
      getProductImages(productId)
        .then((images) => setProductImages(images))
        .catch((err) => {
          console.error(err);
          setProductImages([]);
        });
    };
    useEffect(() => {
      refreshImages();
    }, []);
    return { productImages, setProductImages, refreshImages };
  };
  const [failedToUploadImage, setFailedToUploadImage] = useState(false);
  const [failedToDeleteImage, setFailedToDeleteImage] = useState(false);
  const [failedToSortImages, setFailedToSortImages] = useState(false);
  const { productImages, setProductImages, refreshImages } = useProductImages();
  const [imageToUpload, setImageToUpload] = useState<File>();
  const [imagePreview, setImagePreview] = useState<string>();
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (imageToUpload !== undefined) {
      const read = new FileReader();
      read.onload = (e) => {
        if (typeof e.target?.result !== "string") {
          setImagePreview(undefined);
        } else {
          setImagePreview(e.target.result);
        }
      };

      read.readAsDataURL(imageToUpload);
    } else {
      setImagePreview(undefined);
    }
  }, [imageToUpload]);

  const uploadImage = () => {
    if (imageToUpload !== undefined) {
      addImageToProduct(productId, imageToUpload)
        .then((uploaded) => {
          if (uploaded) {
            setImagePreview(undefined);
            setImageToUpload(undefined);
            if (inputRef.current !== null) {
              inputRef.current.value = "";
            }
            refreshImages();
          } else {
            // Set image failed to upload
            setFailedToUploadImage(true);
          }
        })
        .catch((err) => {
          console.error(err);
          // Set image failed to upload
          setFailedToUploadImage(true);
        });
    }
  };

  const swapImageOrder = (indexOne: number, indexTwo: number) => {
    const newProductImages = [...productImages];
    [newProductImages[indexOne], newProductImages[indexTwo]] = [
      newProductImages[indexTwo],
      newProductImages[indexOne],
    ];
    setProductImages(newProductImages);
    const imageIdOrder = newProductImages.map((imageEntry) => imageEntry.id);
    setImageSortOrderForProduct(productId, imageIdOrder)
      .then(() => {})
      .catch((err) => {
        console.error(err);
        // Failed to update sort order
        setFailedToSortImages(true);
        refreshImages();
      });
  };

  const deleteImage = (indexToDelete: number) => {
    // Find the image to get the id
    const imageToDelete = productImages.at(indexToDelete);
    if (imageToDelete !== undefined) {
      removeImageFromProduct(imageToDelete.id)
        .then((imageDeleted) => {
          if (imageDeleted) {
            setProductImages([
              ...productImages.slice(0, indexToDelete),
              ...productImages.slice(indexToDelete + 1),
            ]);
          } else {
            // Image failed to be deleted
            setFailedToDeleteImage(true);
          }
        })
        .catch((err) => {
          console.error(err);
          // Image failed to be deleted
          setFailedToDeleteImage(true);
        });
    }
  };

  return (
    <div className="flex flex-row w-full h-full">
      <div className="flex flex-col w-[250px] gap-2 p-2">
        <div className="flex flex-col gap-1">
          {imagePreview === undefined ? (
            <Image alt="Nothing uploaded yet" src={noProductImage} />
          ) : (
            <>
              <Image
                width={250}
                height={300}
                alt="Preview"
                src={imagePreview}
              />
            </>
          )}
          <Input
            className="border-none bg-accent text-accent-foreground file:text-accent-foreground hover:opacity-70 cursor-pointer"
            id="image"
            accept="image/*"
            type="file"
            ref={inputRef}
            onChange={(e) => {
              setImageToUpload(
                e.target.files !== null ? e.target.files[0] : undefined
              );
            }}
          />
        </div>
        <Button
          variant={"secondary"}
          disabled={imagePreview === undefined}
          onClick={() => {
            uploadImage();
          }}
        >
          Upload
        </Button>
      </div>
      <div className="flex w-full p-2 ">
        <ImageToUploadList
          imageUrls={productImages.map(
            (images) =>
              `${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/images/products/${productId}/${images.fileName}`
          )}
          removeImage={(indexToRemove) => deleteImage(indexToRemove)}
          swapImage={(indexOne, indexTwo) => {
            swapImageOrder(indexOne, indexTwo);
          }}
        />
      </div>
      <AlertDialog
        open={failedToUploadImage}
        onOpenChange={setFailedToUploadImage}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Image upload failed</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction className="bg-secondary">Ok</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog
        open={failedToDeleteImage}
        onOpenChange={setFailedToDeleteImage}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Image failed to be deleted</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction className="bg-secondary">Ok</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog
        open={failedToSortImages}
        onOpenChange={setFailedToSortImages}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Failed to update image order</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction className="bg-secondary">Ok</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default UpdateImages;
