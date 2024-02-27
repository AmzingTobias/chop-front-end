"use client";
import { TAccountDetailsEntry, getAllAccounts } from "@/app/data/auth";
import AccountsTable from "./AccountsTable";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";

const AccountsContent = () => {
  const useAccounts = () => {
    const [accounts, setAccounts] = useState<TAccountDetailsEntry[]>([]);
    const refreshAccounts = () => {
      getAllAccounts()
        .then((accounts) => setAccounts(accounts))
        .catch((err) => {
          console.error(err);
          setAccounts([]);
        });
    };
    useEffect(() => {
      refreshAccounts();
    }, []);
    return { accounts, refreshAccounts };
  };
  const { accounts: fetchedAccounts, refreshAccounts } = useAccounts();

  return (
    <div className="w-full flex flex-row">
      <div className="pr-6 w-full">
        <AccountsTable fetchedAccounts={fetchedAccounts} />
      </div>
      <div className="min-w-fit border-l-2 border-accent pl-6">
        <Sidebar refreshAccounts={refreshAccounts} />
      </div>
    </div>
  );
};

export default AccountsContent;
