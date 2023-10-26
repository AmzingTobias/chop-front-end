import { AiOutlineMenu } from "react-icons/ai";
import WebsiteTitle from "./common/Website-Title";
import Searchbar from "../searchbars/Searchbar";
import ShoppingCartBtn from "./common/ShoppingCartBtn";
import AccountBtn from "./common/AccountBtn";
import MobileOpenSearchPage from "./common/MobileOpenSearchPage";
import { Dispatch, SetStateAction } from "react";

interface ITitlebarProps {
  setMobileNavbarOpen: Dispatch<SetStateAction<boolean>>;
}

const Titlebar: React.FC<ITitlebarProps> = ({ setMobileNavbarOpen }) => {
  return (
    <nav className="w-full bg-gradient-to-b from-blue-950 to-sky-950 flex flex-row py-2 items-center">
      <div className="md:hidden text-white text-2xl ml-2 p-2 hover:cursor-pointer hover:bg-black hover:bg-opacity-10 active:bg-black active:bg-opacity-30 rounded-full">
        <div onClick={() => setMobileNavbarOpen((prevToggle) => !prevToggle)}>
          <AiOutlineMenu />
        </div>
      </div>
      <div className="flex mx-0 sm:mx-6 align-middle hover:cursor-pointer min-w-[146px] min-h-[36px] ">
        <WebsiteTitle />
      </div>
      <div className="justify-center items-baseline w-full hidden md:flex">
        <div className="w-11/12 md:w-full">
          <Searchbar />
        </div>
      </div>
      <div className="justify-end text-4xl mr-2 sm:mx-2 lg:mx-4 xl:mx-6 text-white flex visible w-full md:w-fit items-center">
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
