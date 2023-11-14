"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
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
import { useRouter } from "next/navigation";

const AccountBtn = () => {
  const [cookies, _, removeCookie] = useCookies(["auth"]);
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setLoggedIn(cookies["auth"] !== undefined);
  }, [cookies]);

  const logout = () => {
    removeCookie("auth");
    router.refresh();
  };

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
              <div
                onClick={() => logout()}
                className="flex flex-row items-center gap-1.5 w-full cursor-pointer"
              >
                <BiExit />
                Logout
              </div>
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
