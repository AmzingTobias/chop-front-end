import { getAccountTypeFromCookie, EAccountTypes } from "@/app/data/auth";
import { cookies } from "next/headers";
import BrandProductContent from "../../../../(admin)/admin/brands/[brandId]/BrandProductContent";

const Page = ({ params }: { params: { brandId: number } }) => {
  const authCookie = cookies().get("auth");
  const accountTypeLoggedIn = authCookie
    ? getAccountTypeFromCookie(authCookie.value)
    : undefined;

  if (accountTypeLoggedIn !== EAccountTypes.sales) {
    return null;
  }
  return (
    <main className="w-full h-screen max-h-screen overflow-clip flex flex-row p-4">
      <BrandProductContent
        brandId={params.brandId}
        accountTypeLoggedIn={accountTypeLoggedIn}
      />
    </main>
  );
};

export default Page;
