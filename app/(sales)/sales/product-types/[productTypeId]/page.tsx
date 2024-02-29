import { getAccountTypeFromCookie, EAccountTypes } from "@/app/data/auth";
import { cookies } from "next/headers";
import ProductTypeProductContent from "../../../../(admin)/admin/product-types/[productTypeId]/ProductTypeProductContent";

const Page = ({ params }: { params: { productTypeId: number } }) => {
  const authCookie = cookies().get("auth");
  const accountTypeLoggedIn = authCookie
    ? getAccountTypeFromCookie(authCookie.value)
    : undefined;

  if (accountTypeLoggedIn !== EAccountTypes.sales) {
    return null;
  }
  return (
    <main className="w-full h-screen max-h-screen overflow-clip flex flex-row p-4">
      <ProductTypeProductContent
        productTypeId={params.productTypeId}
        accountTypeLoggedIn={accountTypeLoggedIn}
      />
    </main>
  );
};

export default Page;
