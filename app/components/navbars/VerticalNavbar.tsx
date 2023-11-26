import Link from "next/link";
import { AiOutlineClose } from "react-icons/ai";
import { TNavigationLinks } from "@/app/data/navigationLinks";
import { Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";

interface IVerticalNavbarProps {
  setMobileNavbarOpen: Dispatch<SetStateAction<boolean>>;
  navbarOpen: boolean;

  navigationBtns: TNavigationLinks[];
  className?: string;
}

const VerticalNavbar: React.FC<IVerticalNavbarProps> = ({
  setMobileNavbarOpen,
  navbarOpen,
  navigationBtns,
}) => {
  return (
    <AlertDialog open={navbarOpen} onOpenChange={setMobileNavbarOpen}>
      <AlertDialogContent className="flex flex-col min-w-full min-h-screen max-h-screen border-0 sm:rounded-none bg-primary p-1 overflow-y-scroll">
        <Button
          onClick={() => setMobileNavbarOpen((prevToggle) => !prevToggle)}
          className="flex justify-end mt-8 p-2 text-4xl text-accent hover:opacity-80"
        >
          <AiOutlineClose />
        </Button>
        <nav className="flex w-full  -mt-10">
          <ul className="flex flex-col h-full">
            {navigationBtns.map((item, index) => {
              return (
                <li
                  key={index}
                  className={`select-none p-2.5 transition-colors duration-150 font-semibold w-fit
                hover:cursor-pointer  hover:opacity-80 text-xl
                active:opacity-100`}
                >
                  <Link href={item.path}>{item.displayName}</Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default VerticalNavbar;
