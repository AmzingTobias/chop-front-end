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

interface IEditPercentOffProps {
  fetchedPercentOff: number;
  codeId: number;
}

const EditPercentOff: React.FC<IEditPercentOffProps> = ({
  codeId,
  fetchedPercentOff,
}) => {
  const [editingValue, setEditingValue] = useState(false);
  const [percentOff, setPercentOff] = useState(fetchedPercentOff);
  const inputRef = useRef<HTMLInputElement>(null);

  const submitPercentUpdate = () => {
    if (inputRef.current !== null && inputRef.current.value.length > 0) {
      const asNumber = Number(inputRef.current.value);
      if (!Number.isNaN(asNumber)) {
        updateDiscountCode(codeId, { percentOff: asNumber })
          .then(() => setPercentOff(asNumber))
          .catch((err) => console.error(err));
      }
    }
  };

  return (
    <>
      <div className="flex flex-row items-center gap-2">
        <p>{percentOff}%</p>
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
            <AlertDialogTitle>Edit percent off value</AlertDialogTitle>
          </AlertDialogHeader>
          <Input
            ref={inputRef}
            className="text-accent"
            defaultValue={percentOff}
            type="number"
            min={0}
            max={100}
          />
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-transparent border-secondary text-accent-foregound">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-secondary"
              onClick={() => submitPercentUpdate()}
            >
              Submit
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default EditPercentOff;
