import AccountsContent from "./AccountsContent";
import AccountsTable from "./AccountsTable";

const Page = () => {
  return (
    <main className="w-full h-screen max-h-screen overflow-clip flex flex-row p-4">
      <AccountsContent />
    </main>
  );
};

export default Page;
