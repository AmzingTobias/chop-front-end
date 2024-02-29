import DeleteProductTypeBtn from "./DeleteProductTypeBtn";
import UpdateProductTypeForm from "./UpdateProductTypeNameForm";

interface ISidebarProps {
  productTypeId: number;
  refreshProducts: () => void;
}

const Sidebar: React.FC<ISidebarProps> = ({
  productTypeId,
  refreshProducts,
}) => {
  return (
    <div className="h-full flex flex-col gap-4 w-full">
      <DeleteProductTypeBtn productTypeId={productTypeId} />
      <UpdateProductTypeForm
        refreshProducts={refreshProducts}
        productTypeId={productTypeId}
      />
    </div>
  );
};

export default Sidebar;
