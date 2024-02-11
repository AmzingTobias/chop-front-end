"use client";

import { useState } from "react";
import ImageAdder from "./ImageAdder";
import Image from "next/image";

const CreateProductForm = () => {
  const [imagesToUpload, setImagesToUpload] = useState<File[]>([]);
  const addImageToUploads = (imageToAdd: File) => {
    setImagesToUpload((prev) => [...prev, imageToAdd]);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="w-full">
        <ImageAdder addImageToUpload={addImageToUploads} />
      </div>
      <div className="w-full h-screen bg-accent"></div>
    </div>
  );
};

export default CreateProductForm;
