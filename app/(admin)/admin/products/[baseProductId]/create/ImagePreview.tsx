"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useEffect, useState } from "react";

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
  const [confirmDeletePopup, setConfirmDeletePopup] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
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
          onClick={() => setConfirmDeletePopup(true)}
        >
          Remove
        </Button>
      </div>
      {mounted && (
        <AlertDialog
          open={confirmDeletePopup}
          onOpenChange={setConfirmDeletePopup}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm deletion</AlertDialogTitle>
              <AlertDialogDescription className="text-accent-foreground/90">
                Are you sure you want to delete the image
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-transparent border-secondary text-accent-foregound">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="bg-destructive"
                onClick={() => props.removeImage(props.position)}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
};

export default ImagePreview;
