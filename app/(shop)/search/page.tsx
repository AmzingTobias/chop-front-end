import { cookies } from "next/headers";
import Search from "./Search";
import { getAccountTypeFromCookie } from "@/app/data/auth";

const SearchPage = () => {
  const authCookie = cookies().get("auth");
  const accountTypeLoggedIn = authCookie
    ? getAccountTypeFromCookie(authCookie.value)
    : undefined;

  return (
    <main className="flex flex-col w-full overflow-x-clip p-1">
      <Search accountTypeLoggedIn={accountTypeLoggedIn} />
    </main>
  );
};

export default SearchPage;
