"use client";

import Link from "next/link";
import { BiUser, BiSolidUser, BiExit } from "react-icons/bi";
import { BsBasket, BsGear, BsHeartFill } from "react-icons/bs";
import { GrContact } from "react-icons/gr";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

const AccountBtn: React.FC<{ customerLoggedIn: boolean }> = ({
  customerLoggedIn,
}) => {
  const textStyles = "text-md";
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="hover:cursor-pointer hover:opacity-80">
      {customerLoggedIn ? (
        <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
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
                onClick={() => setMenuOpen(false)}
                href="/orders"
                className="flex flex-row items-center gap-1.5 w-full"
              >
                <BsBasket />
                Orders
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className={textStyles}>
              <Link
                onClick={() => setMenuOpen(false)}
                href="/favourites"
                className="flex flex-row items-center gap-1.5 w-full"
              >
                <BsHeartFill />
                Favourites
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className={textStyles}>
              <Link
                onClick={() => setMenuOpen(false)}
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
                onClick={() => setMenuOpen(false)}
                href={"/support"}
                className="flex flex-row items-center gap-1.5 w-full cursor-pointer"
              >
                <GrContact />
                Contact us
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className={textStyles}>
              <Link
                onClick={() => setMenuOpen(false)}
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
