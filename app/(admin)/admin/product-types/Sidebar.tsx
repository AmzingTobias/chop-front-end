import NewProductType from "./NewProductType";

interface ISidebarProps {
  refreshProductTypes: () => void;
}

const Sidebar: React.FC<ISidebarProps> = ({ refreshProductTypes }) => {
  return (
    <div className="h-full flex flex-col gap-4 w-full">
      <NewProductType refreshProductTypes={refreshProductTypes} />
    </div>
  );
};

export default Sidebar;
