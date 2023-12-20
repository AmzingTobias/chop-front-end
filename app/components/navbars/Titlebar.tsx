import { AiOutlineMenu } from "react-icons/ai";
import WebsiteTitle from "./common/Website-Title";
import Searchbar from "../searchbars/Searchbar";
import ShoppingCartBtn from "./common/ShoppingCartBtn";
import AccountBtn from "./common/AccountBtn";
import MobileOpenSearchPage from "./common/MobileOpenSearchPage";
import { Dispatch, SetStateAction } from "react";

interface ITitlebarProps {
  setMobileNavbarOpen: Dispatch<SetStateAction<boolean>>;
  accountLoggedIn: boolean;
  setMobileSearchOpen: Dispatch<SetStateAction<boolean>>;
  mobileSearchOpen: boolean;
}

const Titlebar: React.FC<ITitlebarProps> = ({
  setMobileNavbarOpen,
  accountLoggedIn,
  setMobileSearchOpen,
  mobileSearchOpen,
}) => {
  return (
    <nav className="bg-accent text-secondary py-2.5 flex md:justify-center text-3xl sm:text-4xl">
      <div className="flex items-center w-full gap-2 mx-2 sm:gap-4 sm:mx-4 md:mx-0 max-w-screen-2xl md:w-11/12">
        <div
          onClick={() => setMobileNavbarOpen((prevToggle) => !prevToggle)}
          className="p-2 rounded-full md:hidden hover:cursor-pointer hover:bg-black hover:bg-opacity-10 active:bg-black active:bg-opacity-30"
        >
          <AiOutlineMenu />
        </div>
        <div className="flex align-middle">
          <WebsiteTitle />
        </div>
        <div className="items-baseline hidden w-full md:flex">
          <div className="w-full lg:w-1/2 text-background">
            <Searchbar showResultsOnInputChange={true} searchResultLimit={3} />
          </div>
        </div>
        <div className="flex items-center justify-end visible w-full mr-2 sm:mx-2 lg:mx-4 xl:mx-6 md:w-fit">
          <div className="mr-6 md:hidden">
            <MobileOpenSearchPage
              searchOpen={mobileSearchOpen}
              setSearchOpen={setMobileSearchOpen}
            />
          </div>
          <div className="mr-6">
            <AccountBtn loggedIn={accountLoggedIn} />
          </div>
          <ShoppingCartBtn />
        </div>
      </div>
    </nav>
  );
};

export default Titlebar;
