import Searchbar from "./Searchbar";

const MobileSearchBar = () => {
  return (
    <div
      className={`h-screen w-screen bg-gradient-to-b from-sky-900 to-blue-900 fixed left-0 top-16 z-10`}
    >
      <div className="flex flex-col w-full p-4">
        <div className="w-full text-lg">
          <div className="mt-1 text-gray-900">
            <Searchbar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileSearchBar;
