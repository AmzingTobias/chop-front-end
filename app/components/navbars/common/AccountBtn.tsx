"use client";

import Link from "next/link";
import { BiUser, BiSolidUser, BiExit } from "react-icons/bi";
import { BsBasket, BsGear } from "react-icons/bs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const AccountBtn: React.FC<{ loggedIn: boolean }> = ({ loggedIn }) => {
  const textStyles = "text-md";

  return (
    <div className="hover:cursor-pointer hover:opacity-80">
      {loggedIn ? (
        <DropdownMenu>
          <DropdownMenuTrigger className="flex focus:outline-none">
            <BiSolidUser />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel className={textStyles}>
              My Account
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className={textStyles}>
              <Link
                href="/"
                className="flex flex-row items-center gap-1.5 w-full"
              >
                <BsBasket />
                Orders
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className={textStyles}>
              <Link
                href="/settings"
                className="flex flex-row items-center gap-1.5 w-full"
              >
                <BsGear />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className={textStyles}>
              <Link
                href={"/logout"}
                className="flex flex-row items-center gap-1.5 w-full cursor-pointer"
              >
                <BiExit />
                Logout
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link href={"/login"}>
          <BiUser />
        </Link>
      )}
    </div>
  );
};

export default AccountBtn;
