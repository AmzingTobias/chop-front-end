"use client";

import { TOrderStatus, updateOrderStatus } from "@/app/data/orders";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Form, useForm } from "react-hook-form";
import { z } from "zod";

interface IOrderStatusProps {
  orderId: number;
  possibleOrderStatuses: TOrderStatus[];
  orderStatus: string;
}

const OrderAddress: React.FC<IOrderStatusProps> = ({
  orderId,
  possibleOrderStatuses,
  orderStatus,
}) => {
  const [updatedOrderStatus, setUpdatedOrderStatus] = useState(orderStatus);
  const [orderStatusUpdated, setOrderStatusUpdated] = useState(false);
  const [orderStatusFailedToUpdate, setOrderStatusFailedToUpdate] =
    useState(false);

  const submitUpdateOrderStatus = () => {
    const statusToUpdateWith = possibleOrderStatuses.find(
      (status) => status.status === updatedOrderStatus
    );
    if (statusToUpdateWith !== undefined) {
      updateOrderStatus(orderId, statusToUpdateWith.id)
        .then((_) => {
          // Show status updated
          setOrderStatusUpdated(true);
        })
        .catch((err) => {
          console.error(err);
          // Show status failed to update
          setOrderStatusFailedToUpdate(true);
          setUpdatedOrderStatus(orderStatus);
        });
    }
  };

  return (
    <>
      <div className="bg-primary p-2 rounded-md shadow-md flex flex-col gap-2">
        <Select
          value={updatedOrderStatus}
          defaultValue={orderStatus}
          onValueChange={setUpdatedOrderStatus}
        >
          <SelectTrigger className="outline-secondary border-secondary">
            <SelectValue placeholder="No type selected" />
          </SelectTrigger>
          <SelectContent>
            {possibleOrderStatuses.map((type) => (
              <SelectItem
                className="cursor-pointer text-accent-foreground hover:text-secondary"
                key={type.id}
                value={type.status}
              >
                {type.status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          className="items-center w-full"
          variant={"secondary"}
          onClick={() => submitUpdateOrderStatus()}
        >
          Update order status
        </Button>
      </div>
      <AlertDialog
        open={orderStatusUpdated}
        onOpenChange={setOrderStatusUpdated}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Order status updated</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogAction className="bg-secondary">Ok</AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog
        open={orderStatusFailedToUpdate}
        onOpenChange={setOrderStatusFailedToUpdate}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Could not update order status</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogAction className="bg-secondary">Ok</AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default OrderAddress;
