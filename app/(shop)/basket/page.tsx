import SectionHeading from "@/app/components/SectionHeading";
import BasketContents from "./BaseketContents";

export default function Page() {
  return (
    <main className="flex flex-col w-full space-y-4 mt-4">
      <SectionHeading text={"Shopping cart"} />
      <BasketContents />
    </main>
  );
}
