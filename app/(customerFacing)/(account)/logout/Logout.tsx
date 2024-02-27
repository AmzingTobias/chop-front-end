"use client";

import { clearBasket } from "@/app/redux/slices/basket.slice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface ILogoutProps {
  accountLoggedIn: boolean;
}

const Logout: React.FC<ILogoutProps> = ({ accountLoggedIn }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    if (accountLoggedIn) {
      fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/v1/auth/logout`,
        {
          method: "POST",
          credentials: "include",
        }
      ).then((response) => {
        if (response.ok) {
          dispatch(clearBasket());
          router.refresh();
        }
      });
    }
  }, [router, dispatch, accountLoggedIn]);

  useEffect(() => {
    if (!accountLoggedIn) {
      router.push("./");
    }
  }, [accountLoggedIn, router]);

  return null;
};

export default Logout;
