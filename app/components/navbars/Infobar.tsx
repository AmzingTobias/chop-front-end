import Link from "next/link";

const navigateBtns = [
  {
    visibleName: "Help & FAQ",
    navigatePath: "/",
  },
  {
    visibleName: "Track my order",
    navigatePath: "/",
  },
  {
    visibleName: "Contact us",
    navigatePath: "/",
  },
];

const Infobar = () => {
  return (
    <nav className="w-full bg-gray-300 text-sm">
      <ul className="flex justify-end mx-8">
        {navigateBtns.map((item, index) => {
          return (
            <li
              key={index}
              className={`px-2 border-black select-none border-opacity-30 border-l-2 transition-colors duration-150
              hover:cursor-pointer hover:bg-gray-400 hover:bg-opacity-40 
              active:bg-opacity-100
              ${index === navigateBtns.length - 1 ? " border-r-2" : ""}`}
            >
              <Link href={item.navigatePath}>{item.visibleName}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
export default Infobar;
