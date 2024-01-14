import { Loader2 } from "lucide-react";
import Logout from "./Logout";
import { cookies } from "next/headers";
import { getAccountTypeFromCookie } from "@/app/data/auth";

const LogoutPage = () => {
  const authCookie = cookies().get("auth");
  const accountTypeLoggedIn = authCookie
    ? getAccountTypeFromCookie(authCookie.value)
    : undefined;

  return (
    <div className="flex mt-32 justify-center bg-primary p-4 shadow-md rounded-md">
      <Logout accountLoggedIn={accountTypeLoggedIn !== undefined} />
      <p className="font-bold text-3xl text-accent flex items-center">
        <Loader2 className="mr-2 animate-spin" />
        Logging out
      </p>
    </div>
  );
};

export default LogoutPage;
