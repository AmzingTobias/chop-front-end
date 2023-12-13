import SectionHeading from "@/app/components/SectionHeading";
import BasketContents from "./BaseketContents";

export default function Page() {
  return (
    <main className="flex flex-col w-full min-h-screen">
      <SectionHeading text={"Shopping cart"} />
      <BasketContents />
    </main>
  );
}
