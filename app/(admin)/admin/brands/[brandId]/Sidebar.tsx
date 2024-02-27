import UpdateBrandNameForm from "./UpdateBrandNameForm";

interface ISidebarProps {
  brandId: number;
  refreshProducts: () => void;
}

const Sidebar: React.FC<ISidebarProps> = ({ brandId, refreshProducts }) => {
  return (
    <div className="h-full flex flex-col gap-4 w-full">
      <UpdateBrandNameForm
        refreshProducts={refreshProducts}
        brandId={brandId}
      />
    </div>
  );
};

export default Sidebar;
