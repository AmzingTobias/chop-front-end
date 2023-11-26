import Link from "next/link";
import { TNavigationLinks } from "@/app/data/navigationLinks";

interface IHorizonNavbarProps {
  navigationBtns: TNavigationLinks[];
}

const HorizontalNavbar: React.FC<IHorizonNavbarProps> = ({
  navigationBtns,
}) => {
  return (
    <nav className="w-full bg-primary text-accent py-1 flex justify-center">
      <div className="flex max-w-screen-2xl md:w-11/12 items-center">
        <ul className="flex overflow-hidden gap-4 text-lg">
          {navigationBtns.map((item, index) => {
            return (
              <li
                key={index}
                className={`p-1 select-none transition-colors duration-150 font-semibold
                cursor-pointer
                active:opacity-100`}
              >
                <Link href={item.path}>{item.displayName}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default HorizontalNavbar;
