"use client";

import { deleteProductType } from "@/app/data/products";
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
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface IDeleteProductTypeBtnProps {
  productTypeId: number;
}

const DeleteProductTypeBtn: React.FC<IDeleteProductTypeBtnProps> = ({
  productTypeId,
}) => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const router = useRouter();
  return (
    <>
      <Button variant={"destructive"} onClick={() => setConfirmDelete(true)}>
        Delete type
      </Button>
      <AlertDialog open={confirmDelete} onOpenChange={setConfirmDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm deletion</AlertDialogTitle>
            <AlertDialogDescription className="text-accent-foreground/90">
              Are you sure you want to delete the product type
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-transparent border-secondary text-accent-foregound">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive"
              onClick={() => {
                deleteProductType(productTypeId)
                  .then(() => router.push("/admin/product-types/"))
                  .catch((err) => {
                    console.error(err);
                  });
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DeleteProductTypeBtn;
