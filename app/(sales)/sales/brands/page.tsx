import { getAccountTypeFromCookie, EAccountTypes } from "@/app/data/auth";
import { cookies } from "next/headers";
import BrandContent from "../../../(admin)/admin/brands/BrandContent";

const Page = () => {
  const authCookie = cookies().get("auth");
  const accountTypeLoggedIn = authCookie
    ? getAccountTypeFromCookie(authCookie.value)
    : undefined;

  if (accountTypeLoggedIn !== EAccountTypes.sales) {
    return null;
  }
  return (
    <main className="w-full h-screen max-h-screen overflow-clip flex flex-row p-4">
      <BrandContent accountTypeLoggedIn={accountTypeLoggedIn} />
    </main>
  );
};

export default Page;
