"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import noProductImage from "@/public/no-product.png";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ImageToUploadList from "./ImageToUploadList";

interface IImageAdderProps {
  addImageToUpload: (imageToAdd: File) => void;
}

const ImageAdder: React.FC<IImageAdderProps> = ({ addImageToUpload }) => {
  const [previewImageFile, setPreviewImageFile] = useState<File>();
  const [previewImageUrl, setPreviewImageUrl] = useState<string>();
  const inputRef = useRef<HTMLInputElement>(null);
  const [imagesToUploadUrls, setImagesToUploadUrls] = useState<string[]>([]);
  useEffect(() => {
    if (previewImageFile !== undefined) {
      const read = new FileReader();
      read.onload = (e) => {
        if (typeof e.target?.result !== "string") {
          setPreviewImageUrl(undefined);
        } else {
          setPreviewImageUrl(e.target.result);
        }
      };

      read.readAsDataURL(previewImageFile);
    } else {
      setPreviewImageUrl(undefined);
    }
  }, [previewImageFile]);

  return (
    <div className="flex flex-row w-full h-full">
      <div className="flex flex-col w-[250px] gap-2 p-2">
        <div className="flex flex-col gap-1">
          {previewImageUrl === undefined ? (
            <Image alt="Nothing uploaded yet" src={noProductImage} />
          ) : (
            <>
              <Image
                width={250}
                height={300}
                alt="Preview"
                src={previewImageUrl}
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
              setPreviewImageFile(
                e.target.files !== null ? e.target.files[0] : undefined
              );
            }}
          />
        </div>
        <Button
          variant={"secondary"}
          disabled={previewImageUrl === undefined}
          onClick={() => {
            if (
              previewImageFile !== undefined &&
              previewImageUrl !== undefined
            ) {
              inputRef.current;
              setImagesToUploadUrls((prev) => [...prev, previewImageUrl]);
              addImageToUpload(previewImageFile);
              setPreviewImageFile(undefined);
              if (inputRef.current !== null) {
                inputRef.current.value = "";
              }
            }
          }}
        >
          Add image
        </Button>
      </div>
      <div className="flex w-full p-2 ">
        <ImageToUploadList
          imageUrls={imagesToUploadUrls}
          removeImage={(indexToRemove) => {
            setImagesToUploadUrls([
              ...imagesToUploadUrls.slice(0, indexToRemove),
              ...imagesToUploadUrls.slice(indexToRemove + 1),
            ]);
          }}
          swapImage={(indexOne, indexTwo) => {
            const newImagesToUploadUrls = [...imagesToUploadUrls]; // Create a shallow copy of the array
            [newImagesToUploadUrls[indexOne], newImagesToUploadUrls[indexTwo]] =
              [
                newImagesToUploadUrls[indexTwo],
                newImagesToUploadUrls[indexOne],
              ]; // Swap elements
            setImagesToUploadUrls(newImagesToUploadUrls); // Update the state with the new array
          }}
        />
      </div>
    </div>
  );
};

export default ImageAdder;
