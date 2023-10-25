import Link from "next/link";
import { navigationbarBtns } from "@/app/data/navigationLinks";

const HorizontalNavbar = () => {
  return (
    <nav className="w-full bg-sky-900 text-white text-xl p-2">
      <ul className="flex mx-4 overflow-hidden">
        {navigationbarBtns.map((item, index) => {
          return (
            <li
              key={index}
              className={`px-4 mx-2 select-none transition-colors duration-150 font-semibold
                hover:cursor-pointer hover:text-sky-400 hover:opacity-90 
                active:opacity-100`}
            >
              <Link href={item.path}>{item.displayName}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default HorizontalNavbar;
