"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BiExit, BiSolidUser } from "react-icons/bi";

interface IAccountBtnProps {
  email: string;
}

const AccountBtn: React.FC<IAccountBtnProps> = ({ email }) => {
  const [username, domain] = email.split("@");
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, [mounted]);

  if (!mounted) {
    return null;
  }

  return (
    // <div className="text-secondary flex flex-row w-full items-center cursor-pointer h-fit gap-1">
    <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
      <DropdownMenuTrigger className="text-secondary cursor-pointer focus:outline-none flex flex-row items-center bg-[#060E18] p-2 rounded-md h-fit gap-1">
        <BiSolidUser className={"text-3xl"} />
        <div className="flex flex-col items-start">
          <p className="text-base font-bold">{username}</p>
          <p className="text-xs font-light">@{domain}</p>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full">
        <DropdownMenuItem className={"text-base w-full"}>
          <Link
            onClick={() => setMenuOpen(false)}
            href={"/logout"}
            className="flex flex-row items-center gap-1.5 w-full cursor-pointer p-0"
          >
            <BiExit />
            Logout
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

    // </div>
  );
};

export default AccountBtn;
