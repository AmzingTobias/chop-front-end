import Link from "next/link";
import { AiOutlineClose } from "react-icons/ai";
import { TNavigationLinks } from "@/app/data/navigationLinks";
import { Dispatch, SetStateAction } from "react";

interface IVerticalNavbarProps {
  setMobileNavbarOpen: Dispatch<SetStateAction<boolean>>;
  navigationBtns: TNavigationLinks[];
}

const VerticalNavbar: React.FC<IVerticalNavbarProps> = ({
  setMobileNavbarOpen,
  navigationBtns,
}) => {
  return (
    <div className="absolute top-0 left-0 min-w-full min-h-screen bg-gradient-to-b from-blue-950 to-sky-950 text-white z-10">
      <div className="flex right-0 justify-end m-2">
        <div
          onClick={() => setMobileNavbarOpen((prevToggle) => !prevToggle)}
          className="text-4xl p-1 hover:cursor-pointer rounded-full hover:bg-black hover:bg-opacity-10 active:bg-black active:bg-opacity-30"
        >
          <AiOutlineClose />
        </div>
      </div>
      <nav className="flex flex-col text-xl px-4 pb-6 ">
        <ul className="flex flex-col overflow-y-scroll h-full">
          {navigationBtns.map((item, index) => {
            return (
              <li
                key={index}
                className={`select-none p-3 transition-colors duration-150 font-semibold w-fit
                hover:cursor-pointer hover:text-sky-400 hover:opacity-90 
                active:opacity-100`}
              >
                <Link href={item.path}>{item.displayName}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default VerticalNavbar;
