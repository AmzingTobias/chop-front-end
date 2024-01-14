import SectionHeading from "@/app/components/SectionHeading";
import BasketContents from "./BaseketContents";
import { getCustomerIdFromCookie } from "@/app/data/auth";
import { cookies } from "next/headers";

export default function Page() {
  const authCookie = cookies().get("auth");
  const customerId = authCookie
    ? getCustomerIdFromCookie(authCookie.value)
    : undefined;

  return (
    <main className="flex flex-col w-full space-y-4 mt-4">
      <SectionHeading text={"Shopping cart"} />
      <BasketContents customerLoggedIn={customerId !== undefined} />
    </main>
  );
}
