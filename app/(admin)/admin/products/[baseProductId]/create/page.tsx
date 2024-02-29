import { EAccountTypes, getAccountTypeFromCookie } from "@/app/data/auth";
import CreateProductForm from "./CreateProductForm";
import { cookies } from "next/headers";

const Page = ({ params }: { params: { baseProductId: number } }) => {
  const authCookie = cookies().get("auth");
  const accountTypeLoggedIn = authCookie
    ? getAccountTypeFromCookie(authCookie.value)
    : undefined;

  if (accountTypeLoggedIn !== EAccountTypes.admin) {
    return null;
  }
  return (
    <main className="w-full h-screen max-h-screen overflow-y-scroll flex flex-row p-2">
      <CreateProductForm
        baseProductId={params.baseProductId}
        accountTypeLoggedIn={accountTypeLoggedIn}
      />
    </main>
  );
};

export default Page;
