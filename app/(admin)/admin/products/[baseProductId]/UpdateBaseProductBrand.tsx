import {
  getAllBrands,
  TBrandEntry,
  updateBrandIdForBaseProduct,
} from "@/app/data/brands";
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

interface IUpdateBaseProductBrandProps {
  fetchedBrandName?: string;
  baseProductId: number;
}

const UpdateBaseProductBrand: React.FC<IUpdateBaseProductBrandProps> = ({
  baseProductId,
  fetchedBrandName,
}) => {
  const [couldNotUpdateBoxOpen, setCouldNotUpdateBoxOpen] = useState(false);
  const [updatedBoxOpen, setUpdatedBoxOpen] = useState(false);

  // Get all brands
  const useBrands = () => {
    const [allBrands, setAllBrands] = useState<TBrandEntry[]>([]);
    useEffect(() => {
      getAllBrands()
        .then((brands) => setAllBrands(brands))
        .catch((err) => {
          console.error(err);
          setAllBrands([]);
        });
    }, []);
    return allBrands;
  };

  const brands = useBrands();
  const [selectedBrandName, setSelectedBrandName] = useState<string>(
    fetchedBrandName === undefined ? "" : fetchedBrandName
  );

  const onBtnPress = () => {
    if (selectedBrandName !== "") {
      const selectedBrand = brands.find(
        (brand) => brand.name === selectedBrandName
      );
      if (selectedBrand !== undefined) {
        updateBrandIdForBaseProduct(baseProductId, selectedBrand.id)
          .then((_) => setUpdatedBoxOpen(true))
          .catch((err) => {
            console.error(err);
            setCouldNotUpdateBoxOpen(true);
          });
      }
    } else {
      updateBrandIdForBaseProduct(baseProductId, undefined)
        .then((_) => setUpdatedBoxOpen(true))
        .catch((err) => {
          console.error(err);
          setCouldNotUpdateBoxOpen(true);
        });
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <h2 className="underline font-semibold text-lg">Brand</h2>
      <Select
        value={selectedBrandName}
        defaultValue={selectedBrandName}
        onValueChange={setSelectedBrandName}
      >
        <SelectTrigger value={selectedBrandName}>
          <SelectValue placeholder="No brand selected" />
        </SelectTrigger>
        <SelectContent>
          {brands.map((brand) => (
            <SelectItem
              className="cursor-pointer text-accent-foreground hover:text-secondary"
              key={brand.id}
              value={brand.name}
            >
              {brand.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {selectedBrandName !== "" && (
        <Button
          onClick={() => setSelectedBrandName("")}
          variant={"destructive"}
        >
          Remove Brand
        </Button>
      )}
      <Button onClick={() => onBtnPress()}>Update</Button>
      <AlertDialog
        open={couldNotUpdateBoxOpen}
        onOpenChange={setCouldNotUpdateBoxOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Failed to update brand</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogAction className="bg-secondary">Ok</AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog open={updatedBoxOpen} onOpenChange={setUpdatedBoxOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Brand updated</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogAction className="bg-secondary">Ok</AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default UpdateBaseProductBrand;
