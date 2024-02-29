import NewBrand from "./NewBrand";

interface ISidebarProps {
  refreshBrands: () => void;
}

const Sidebar: React.FC<ISidebarProps> = ({ refreshBrands }) => {
  return (
    <div className="h-full flex flex-col gap-4 w-full">
      <NewBrand refreshBrands={refreshBrands} />
    </div>
  );
};

export default Sidebar;
