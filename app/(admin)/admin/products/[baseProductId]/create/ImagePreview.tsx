"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface IImagePreviewProps {
  url: string;
  position: number;
  width: number;
  height: number;
  swapImage: (currentPosition: number, positionToSwapWith: number) => void;
  removeImage: (currentPosition: number) => void;
  canSwapRight: boolean;
  canSwapLeft: boolean;
}

const ImagePreview: React.FC<IImagePreviewProps> = (props) => {
  return (
    <div className="relative flex min-w-fit">
      <Image
        className="flex rounded-md w-[250px] max-w-full h-full"
        alt="preview"
        src={props.url}
        width={props.width}
        height={props.height}
      />
      {props.canSwapLeft && (
        <IoIosArrowBack
          onClick={() => props.swapImage(props.position, props.position - 1)}
          className="absolute top-0 h-full text-2xl cursor-pointer hover:opacity-50 bg-accent-foreground/20 rounded-l-md"
        />
      )}
      {props.canSwapRight && (
        <IoIosArrowForward
          onClick={() => props.swapImage(props.position, props.position + 1)}
          className="absolute top-0 right-0 h-full text-2xl cursor-pointer hover:opacity-50 bg-accent-foreground/20 rounded-r-md"
        />
      )}
      <Button
        className={
          "absolute bottom-0 w-full bg-accent rounded-b-md text-accent-foreground rounded-t-none hover:bg-opacity-70"
        }
        onClick={() => props.removeImage(props.position)}
      >
        Remove
      </Button>
    </div>
  );
};

export default ImagePreview;
