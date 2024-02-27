import CreateAccountForm from "./CreateAccountForm";

interface ISidebarProps {
  refreshAccounts: () => void;
}

const Sidebar: React.FC<ISidebarProps> = ({ refreshAccounts }) => {
  return (
    <div className="h-full flex flex-col gap-4 w-full">
      <CreateAccountForm refreshAccounts={refreshAccounts} />
    </div>
  );
};

export default Sidebar;
