import { infobarBtns } from "@/app/data/navigationLinks";
import Link from "next/link";

const Infobar = () => {
  return (
    <nav className="w-full bg-gray-300 text-sm">
      <ul className="flex justify-end mx-8">
        {infobarBtns.map((item, index) => {
          return (
            <li
              key={index}
              className={`px-2 border-black select-none border-opacity-30 border-l-2 transition-colors duration-150
              hover:cursor-pointer hover:bg-gray-400 hover:bg-opacity-40 
              active:bg-opacity-100
              ${index === infobarBtns.length - 1 ? " border-r-2" : ""}`}
            >
              <Link href={item.path}>{item.displayName}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
export default Infobar;
