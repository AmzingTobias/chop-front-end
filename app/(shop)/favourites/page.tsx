import SectionHeading from "@/app/components/SectionHeading";
import { EAccountTypes, getAccountTypeFromCookie } from "@/app/data/auth";
import { cookies } from "next/headers";
import FavouriteProducts from "./FavouriteProducts";

const FavouritesPage = () => {
  const authCookie = cookies().get("auth");
  const accountTypeLoggedIn = authCookie
    ? getAccountTypeFromCookie(authCookie.value)
    : undefined;

  return (
    <main className="flex flex-col w-full overflow-x-clip p-1">
      <div className="flex flex-col justify-center space-y-4">
        <SectionHeading text="Your favourites" />
        <FavouriteProducts
          customerLoggedIn={accountTypeLoggedIn === EAccountTypes.customer}
        />
      </div>
    </main>
  );
};

export default FavouritesPage;
