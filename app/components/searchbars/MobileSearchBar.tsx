import Searchbar from "./Searchbar";

const MobileSearchBar = () => {
  return (
    <div
      className={`h-screen w-screen bg-emerald-900 fixed left-0 top-[3.25rem] z-10`}
    >
      <div className="flex flex-col w-full p-4">
        <div className="w-full text-lg">
          <div className="mt-1">
            <Searchbar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileSearchBar;
