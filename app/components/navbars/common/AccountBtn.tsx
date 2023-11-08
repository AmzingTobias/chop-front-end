"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { BiUser, BiSolidUser } from "react-icons/bi";

const AccountBtn = () => {
  const [cookies] = useCookies(["auth"]);
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    setLoggedIn(cookies["auth"] !== undefined);
  }, [cookies]);

  return (
    <div className="hover:cursor-pointer hover:text-gray-400">
      {loggedIn ? (
        <Link href={"/login"}>
          <BiSolidUser />
        </Link>
      ) : (
        <Link href={"/login"}>
          <BiUser />
        </Link>
      )}
    </div>
  );
};

export default AccountBtn;
