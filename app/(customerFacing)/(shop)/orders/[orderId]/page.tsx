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
      <div className="w-full flex flex-col md:flex-row gap-4 md:gap-0">
        <Button className="w-fit" variant={"secondary"}>
          <Link
            href={`/support/ticket/create?title=Query%20regarding%20order:%20%23${params.orderId}`}
          >
            Contact customer service
          </Link>
        </Button>
        <Button className="w-fit md:ml-auto" variant={"secondary"}>
          <Link href={"/orders"}>Return to all orders</Link>
        </Button>
      </div>
    </main>
  );
}
