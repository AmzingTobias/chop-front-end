"use client";

import { EAccountTypes } from "@/app/data/auth";
import { setTicketAsClosed } from "@/app/data/support";
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
import { cn } from "@/lib/utils";
import { useState } from "react";

interface ICloseTicketProps {
  setTicketClosed: () => void;
  className?: string;
  loggedInAccountType: EAccountTypes.admin | EAccountTypes.customer;
}

const CloseTicket: React.FC<ICloseTicketProps> = ({
  className,
  setTicketClosed,
  loggedInAccountType,
}) => {
  const [confirmTicketClose, setConfirmTicketClose] = useState(false);
  return (
    <>
      <Button
        variant={"secondary"}
        className={cn("", className)}
        onClick={() => {
          setConfirmTicketClose(true);
        }}
      >
        {loggedInAccountType === EAccountTypes.customer
          ? "Close ticket"
          : "Force close ticket"}
      </Button>
      <AlertDialog
        open={confirmTicketClose}
        onOpenChange={setConfirmTicketClose}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm ticket close</AlertDialogTitle>
            <AlertDialogDescription className="text-accent-foreground/90">
              Are you sure you want to close the ticket
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-transparent border-secondary text-accent-foregound">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-secondary"
              onClick={() => {
                setTicketClosed();
              }}
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default CloseTicket;
