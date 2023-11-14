"use client";

import Link from "next/link";
import { BiUser, BiSolidUser, BiExit } from "react-icons/bi";
import { BsHouse, BsBasket, BsGear } from "react-icons/bs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const AccountBtn: React.FC<{ loggedIn: boolean }> = ({ loggedIn }) => {
  return (
    <div className="hover:cursor-pointer hover:text-gray-400">
      {loggedIn ? (
        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none flex">
            <BiSolidUser />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link
                href="/"
                className="flex flex-row items-center gap-1.5 w-full"
              >
                <BsBasket />
                Orders
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                href="/"
                className="flex flex-row items-center gap-1.5 w-full"
              >
                <BsHouse />
                Addresses
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                href="/settings"
                className="flex flex-row items-center gap-1.5 w-full"
              >
                <BsGear />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
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
