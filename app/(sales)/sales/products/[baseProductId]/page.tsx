import { getProductTypes } from "@/app/data/products";
import BaseProductSideBar from "../../../../(admin)/admin/products/[baseProductId]/BaseProductSideBar";
import ProductGrid from "../../../../(admin)/admin/products/[baseProductId]/ProductGrid";
import { getAccountTypeFromCookie, EAccountTypes } from "@/app/data/auth";
import { cookies } from "next/headers";

const Page = async ({ params }: { params: { baseProductId: number } }) => {
  const productTypesAvailable = await getProductTypes();
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
        <ProductGrid
          baseProductId={params.baseProductId}
          accountTypeLoggedIn={accountTypeLoggedIn}
        />
      </div>
      <div className="min-w-fit border-l-2 border-accent pl-6">
        <BaseProductSideBar
          productTypes={productTypesAvailable}
          baseProductId={params.baseProductId}
          accountTypeLoggedIn={accountTypeLoggedIn}
        />
      </div>
    </main>
  );
};

export default Page;
