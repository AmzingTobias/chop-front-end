import WebsiteTitle from "./common/Website-Title";

const MinimalTitlebar = () => {
  return (
    <nav className="w-full bg-gradient-to-t from-indigo-900 to-blue-900 flex flex-row py-2.5 items-center justify-center">
      <div className="flex mx-0 sm:mx-6 align-middle  hover:cursor-pointer min-w-[146px] min-h-[36px] ">
        <WebsiteTitle />
      </div>
    </nav>
  );
};

export default MinimalTitlebar;
