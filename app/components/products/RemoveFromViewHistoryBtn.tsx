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
import { AiOutlineClose } from "react-icons/ai";

interface IRemoveFromViewHistoryBtnProps {
  productId: number;
  removeFromViewHistory: (productId: number) => void;
}

const RemoveFromViewHistoryBtn: React.FC<IRemoveFromViewHistoryBtnProps> = ({
  productId,
  removeFromViewHistory,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [removeRequest, setRemoveRequest] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      <div
        onClick={(event) => {
          event.preventDefault();
          setRemoveRequest(true);
        }}
        className={`relative flex justify-center bg-accent rounded-full p-1.5 text-xl text-secondary hover:opacity-80 cursor-pointer`}
      >
        <AiOutlineClose style={{ strokeWidth: "50px" }} />
      </div>
      {isMounted ? (
        <AlertDialog open={removeRequest} onOpenChange={setRemoveRequest}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm deletion</AlertDialogTitle>
              <AlertDialogDescription className="text-accent-foreground/90">
                Are you sure you want to remove this product from your history?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-transparent border-secondary text-accent-foregound">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="bg-destructive"
                onClick={() => {
                  removeFromViewHistory(productId);
                }}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ) : (
        <></>
      )}
    </>
  );
};

export default RemoveFromViewHistoryBtn;
