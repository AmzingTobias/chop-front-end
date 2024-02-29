import { EAccountTypes, getAccountTypeFromCookie } from "@/app/data/auth";
import SearchGrid from "../../../../(admin)/admin/products/search/SearchGrid";
import { cookies } from "next/headers";

const Page = () => {
  const authCookie = cookies().get("auth");
  const accountTypeLoggedIn = authCookie
    ? getAccountTypeFromCookie(authCookie.value)
    : undefined;

  if (accountTypeLoggedIn !== EAccountTypes.sales) {
    return null;
  }

  return (
    <main className="w-full h-screen max-h-screen overflow-clip flex flex-row p-6">
      <div className="pr-6 w-full">
        <SearchGrid accountTypeLoggedIn={accountTypeLoggedIn} />
      </div>
    </main>
  );
};

export default Page;
