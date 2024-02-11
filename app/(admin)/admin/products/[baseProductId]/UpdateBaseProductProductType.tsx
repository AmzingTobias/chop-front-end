"use client";

import {
  TProductType,
  addProductTypeToBaseProduct,
  getAssignedProductTypes,
  getProductTypes,
  removeProductTypeFromBaseProduct,
} from "@/app/data/products";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

interface IUpdateBaseProductProductTypeProps {
  baseProductId: number;
}

const UpdateBaseProductProductType: React.FC<
  IUpdateBaseProductProductTypeProps
> = ({ baseProductId }) => {
  const useProductTypes = () => {
    const [productTypes, setProductTypes] = useState<TProductType[]>([]);
    useEffect(() => {
      getProductTypes()
        .then((productTypes) => setProductTypes(productTypes))
        .catch((err) => {
          console.error(err);
          setProductTypes([]);
        });
    }, []);
    return productTypes;
  };
  const useAssignedProductTypes = () => {
    const [assignedProductTypes, setAssignedProductTypes] = useState<
      TProductType[]
    >([]);
    useEffect(() => {
      getAssignedProductTypes(baseProductId)
        .then((types) => setAssignedProductTypes(types))
        .catch((err) => {
          console.error(err);
          setAssignedProductTypes([]);
        });
    }, []);
    return { assignedProductTypes, setAssignedProductTypes };
  };

  const allProductTypes = useProductTypes();
  const { assignedProductTypes, setAssignedProductTypes } =
    useAssignedProductTypes();
  const [productTypeToAdd, setProductTypeToAdd] = useState("");

  const [showFailedToDelete, setShowFailedToDelete] = useState(false);
  const [showFailedToAdd, setShowFailedToAdd] = useState(false);

  const unassignProductType = (productTypeId: number) => {
    removeProductTypeFromBaseProduct(baseProductId, productTypeId)
      .then((removed) => {
        if (removed) {
          setAssignedProductTypes((prevAssigned) =>
            prevAssigned.filter(
              (productType) => productType.id !== productTypeId
            )
          );
        } else {
          // Could not remove product type
          setShowFailedToDelete(true);
        }
      })
      .catch((err) => {
        console.error(err);
        // Could not remove product type
        setShowFailedToDelete(true);
      });
  };

  const assignProductType = () => {
    const productTypeToAssign = allProductTypes.find(
      (productTypes) => productTypes.type === productTypeToAdd
    );
    if (productTypeToAssign !== undefined) {
      addProductTypeToBaseProduct(baseProductId, productTypeToAssign.id)
        .then((added) => {
          if (added) {
            setAssignedProductTypes((prevAssigned) => [
              ...prevAssigned,
              productTypeToAssign,
            ]);
          } else {
            // Could not add product type
            setShowFailedToAdd(true);
          }
        })
        .catch((err) => {
          console.error(err);
          // Could not add product type
          setShowFailedToAdd(true);
        });
    }
    setProductTypeToAdd("");
  };

  return (
    <div className="flex flex-col gap-2">
      <h2 className="underline font-semibold text-lg">
        Assigned product types
      </h2>
      <div className="flex flex-col gap-1">
        {assignedProductTypes.map((fetchedType) => (
          <div
            key={fetchedType.id}
            className="text-accent-foreground bg-accent p-2 rounded-md flex flex-row items-center"
          >
            <h3 className="w-full select-none">{fetchedType.type}</h3>
            <AiOutlineClose
              onClick={() => {
                unassignProductType(fetchedType.id);
              }}
              className="text-xl justify-end hover:text-accent-foreground/80 cursor-pointer"
            />
          </div>
        ))}
      </div>
      <Select
        value={productTypeToAdd}
        defaultValue={productTypeToAdd}
        onValueChange={setProductTypeToAdd}
      >
        <SelectTrigger>
          <SelectValue placeholder="No type selected" />
        </SelectTrigger>
        <SelectContent>
          {allProductTypes
            .filter(
              (allType) =>
                assignedProductTypes.findIndex(
                  (assignedType) => assignedType.id === allType.id
                ) === -1
            )
            .map((type) => (
              <SelectItem
                className="cursor-pointer text-accent-foreground hover:text-secondary"
                key={type.id}
                value={type.type}
              >
                {type.type}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
      <Button
        disabled={productTypeToAdd === ""}
        onClick={() => assignProductType()}
      >
        Add product type
      </Button>
      <AlertDialog open={showFailedToAdd} onOpenChange={setShowFailedToAdd}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Could not add product type</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogAction className="bg-secondary">Ok</AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog
        open={showFailedToDelete}
        onOpenChange={setShowFailedToDelete}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Could not remove product type</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogAction className="bg-secondary">Ok</AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default UpdateBaseProductProductType;
