"use client";

import { deleteProductType } from "@/app/data/products";
import { TSupportAccount, unassignStaffFromTicket } from "@/app/data/support";
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
import { Loader2 } from "lucide-react";
import router from "next/router";
import { useState } from "react";

interface IAssignedSupportStaffProps {
  assignedSupportStaff: TSupportAccount;
  ticketId: number;
  refreshAssignedSupportStaff: () => void;
  btnText: "Unassign support staff" | "Unassign self";
}

const AssignedSupportStaff: React.FC<IAssignedSupportStaffProps> = ({
  assignedSupportStaff,
  ticketId,
  refreshAssignedSupportStaff,
  btnText,
}) => {
  const [confirmUnassign, setConfirmUnassign] = useState(false);
  const [disableUnassignBtn, setDisableUnassignBtn] = useState(false);

  return (
    <div className="flex flex-row gap-2 items-center">
      <h3>
        <span className="font-semibold">ID:</span>{" "}
        {assignedSupportStaff.supportId} |{" "}
        <span className="font-semibold">Email:</span>{" "}
        {assignedSupportStaff.email}
      </h3>
      <Button
        variant={"destructive"}
        disabled={disableUnassignBtn}
        onClick={() => {
          setDisableUnassignBtn(true);
          setConfirmUnassign(true);
        }}
      >
        {disableUnassignBtn && (
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        )}
        {btnText}
      </Button>
      <AlertDialog open={confirmUnassign} onOpenChange={setConfirmUnassign}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm unassign</AlertDialogTitle>
            <AlertDialogDescription className="text-accent-foreground/90">
              Are you sure you want to unassign{" "}
              {btnText === "Unassign self"
                ? "yourself"
                : assignedSupportStaff.email}{" "}
              from the ticket
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              className="bg-transparent border-secondary text-accent-foregound"
              onClick={() => setDisableUnassignBtn(false)}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive"
              onClick={() => {
                unassignStaffFromTicket(ticketId)
                  .then(() => refreshAssignedSupportStaff())
                  .catch((err) => {
                    console.error(err);
                    refreshAssignedSupportStaff();
                  });
              }}
            >
              Unassign
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AssignedSupportStaff;
