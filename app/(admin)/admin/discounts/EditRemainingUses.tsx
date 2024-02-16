"use client";

import { updateDiscountCode } from "@/app/data/discounts";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRef, useState } from "react";

interface IEditRemainingUsesProps {
  fetchedRemainingUses: number;
  codeId: number;
}

const EditRemainingUses: React.FC<IEditRemainingUsesProps> = ({
  codeId,
  fetchedRemainingUses,
}) => {
  const [editingValue, setEditingValue] = useState(false);
  const [remainingUses, setRemainingUses] = useState(fetchedRemainingUses);
  const inputRef = useRef<HTMLInputElement>(null);

  const submitRemainingUses = () => {
    if (inputRef.current !== null && inputRef.current.value.length > 0) {
      const asNumber = Number(inputRef.current.value);
      if (!Number.isNaN(asNumber)) {
        updateDiscountCode(codeId, { remainingUses: asNumber })
          .then(() => setRemainingUses(asNumber))
          .catch((err) => console.error(err));
      }
    }
  };

  return (
    <>
      <div className="flex flex-row items-center gap-2 justify-end">
        <p>{remainingUses}</p>
        <Button
          variant={"secondary"}
          className="h-fit"
          onClick={() => setEditingValue(true)}
        >
          Edit
        </Button>
      </div>
      <AlertDialog open={editingValue} onOpenChange={setEditingValue}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Edit remaining uses</AlertDialogTitle>
          </AlertDialogHeader>
          <Input
            ref={inputRef}
            className="text-accent"
            defaultValue={remainingUses}
            type="number"
            min={-1}
          />
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-transparent border-secondary text-accent-foregound">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-secondary"
              onClick={() => submitRemainingUses()}
            >
              Submit
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default EditRemainingUses;
