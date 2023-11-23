import Link from "next/link";
import { AiOutlineClose } from "react-icons/ai";
import { TNavigationLinks } from "@/app/data/navigationLinks";
import { Dispatch, HTMLAttributes, SetStateAction } from "react";
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
      <AlertDialogContent className="flex min-w-full min-h-screen border-0 sm:rounded-none bg-primary">
        <nav className="flex w-full">
          <ul className="flex flex-col h-full overflow-y-scroll">
            {navigationBtns.map((item, index) => {
              return (
                <li
                  key={index}
                  className={`select-none p-3 transition-colors duration-150 font-semibold w-fit overflow-hidden
                hover:cursor-pointer  hover:opacity-80 text-xl
                active:opacity-100`}
                >
                  <Link href={item.path}>{item.displayName}</Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <Button
          onClick={() => setMobileNavbarOpen((prevToggle) => !prevToggle)}
          className="flex justify-end p-2 text-4xl text-accent hover:opacity-80"
        >
          <AiOutlineClose />
        </Button>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default VerticalNavbar;
