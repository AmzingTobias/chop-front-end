import { cookies } from "next/headers";
import Search from "./Search";

const SearchPage = () => {
  const accountLoggedIn = cookies().has("auth");

  return (
    <main className="flex flex-col w-full overflow-x-clip p-1">
      <Search accountLoggedIn={accountLoggedIn} />
    </main>
  );
};

export default SearchPage;
