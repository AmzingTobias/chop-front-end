import WebsiteTitle from "./common/Website-Title";
import Searchbar from "../searchbars/Searchbar";
import ShoppingCartBtn from "./common/ShoppingCartBtn";
import AccountBtn from "./common/AccountBtn";
import MobileOpenSearchPage from "./common/MobileOpenSearchPage";

const Titlebar = () => {
  return (
    <nav className="w-full bg-gradient-to-b from-emerald-600 to-emerald-700 flex flex-row py-2 items-center">
      <div className="flex mx-6 align-middle hover:cursor-pointer min-w-[146px] min-h-[36px] ">
        <WebsiteTitle />
      </div>
      <div className="justify-center items-baseline w-full hidden md:flex">
        <div className="w-11/12 md:w-full">
          <Searchbar />
        </div>
      </div>
      <div className="justify-end text-4xl mx-2 lg:mx-4 xl:mx-6 text-gray-900 flex visible w-full md:w-fit items-center">
        <div className="text-3xl mr-6 md:hidden">
          <MobileOpenSearchPage />
        </div>
        <div className="mr-6">
          <AccountBtn />
        </div>
        <ShoppingCartBtn numInCart={10} />
      </div>
    </nav>
  );
};

export default Titlebar;
