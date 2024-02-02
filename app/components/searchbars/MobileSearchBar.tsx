import Searchbar from "./Searchbar";

interface IMobileSearchBar {
  display: boolean;
  className?: string;
}

const MobileSearchBar: React.FC<IMobileSearchBar> = ({
  display,
  className,
}) => {
  if (!display) return <></>;
  return (
    <div
      className={`p-4 border-t-2 rounded-none bg-accent border-secondary/80 text-accent-foreground ${className}`}
    >
      <div className="w-full">
        <Searchbar showResultsOnInputChange={false} />
      </div>
    </div>
  );
};

export default MobileSearchBar;
