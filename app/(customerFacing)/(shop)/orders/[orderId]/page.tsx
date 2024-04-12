import { Button } from "@/components/ui/button";
import OrderDetails from "./OrderDetails";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: { orderId: number };
}) {
  return (
    <main className="flex flex-col w-full p-4 mx-auto max-w-screen-2xl gap-4">
      <OrderDetails orderId={params.orderId} />
      <Button className="w-fit self-end" variant={"secondary"}>
        <Link href={"/orders"}>Return</Link>
      </Button>
    </main>
  );
}
