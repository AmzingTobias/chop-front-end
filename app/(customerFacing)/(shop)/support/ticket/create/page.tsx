import SectionHeading from "@/app/components/SectionHeading";
import CreateTicketForm from "./CreateTicketForm";

const Page = () => {
  return (
    <main className="flex flex-col gap-4 w-full p-1">
      <SectionHeading text="Create ticket" />
      <CreateTicketForm />
    </main>
  );
};

export default Page;
