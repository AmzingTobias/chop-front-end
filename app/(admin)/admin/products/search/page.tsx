import SearchGrid from "./SearchGrid";

const Page = () => {
  return (
    <main className="w-full h-screen max-h-screen overflow-clip flex flex-row p-6">
      <div className="pr-6 w-full">
        <SearchGrid />
      </div>
    </main>
  );
};

export default Page;
