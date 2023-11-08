import Link from "next/link";
import { TNavigationLinks } from "@/app/data/navigationLinks";

interface IHorizonNavbarProps {
  navigationBtns: TNavigationLinks[];
}

const HorizontalNavbar: React.FC<IHorizonNavbarProps> = ({
  navigationBtns,
}) => {
  return (
    <nav className="w-full bg-blue-800 text-white text-xl p-2">
      <ul className="flex mx-4 overflow-hidden">
        {navigationBtns.map((item, index) => {
          return (
            <li
              key={index}
              className={`px-4 mx-2 select-none transition-colors duration-150 font-semibold
                hover:cursor-pointer hover:text-gray-400 hover:opacity-90 
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
