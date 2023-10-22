import { BiUser } from "react-icons/bi";
import WebsiteTitle from "../Website-Title";
import Searchbar from "../Searchbar";
import ShoppingCartBtn from "../ShoppingCartBtn";
import AccountBtn from "../AccountBtn";

const Titlebar = () => {
  return (
    <nav className="w-full bg-emerald-600 flex flex-row py-2 items-center">
      <div className="mx-12 align-middle hover:cursor-pointer">
        <WebsiteTitle />
      </div>
      <div className="flex justify-center w-full">
        <div className="w-full">
          <Searchbar />
        </div>
      </div>
      <div className="flex justify-end text-4xl mx-8 text-gray-900">
        <div className="mr-6">
          <AccountBtn />
        </div>
        <ShoppingCartBtn numInCart={10} />
      </div>
    </nav>
  );
};

export default Titlebar;
