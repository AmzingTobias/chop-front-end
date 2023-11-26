import WebsiteTitle from "./common/Website-Title";

const MinimalTitlebar = () => {
  return (
    <nav className="w-full bg-accent flex flex-row py-2.5 items-center justify-center">
      <div className="flex align-middle">
        <WebsiteTitle />
      </div>
    </nav>
  );
};

export default MinimalTitlebar;
