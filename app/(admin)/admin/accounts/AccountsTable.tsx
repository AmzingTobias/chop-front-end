"use client";

import {
  EAccountTypes,
  TAccountDetailsEntry,
  getAllAccounts,
} from "@/app/data/auth";
import StaffTable from "@/components/StaffTable";
import { useEffect, useState } from "react";
import FilterAccounts from "./FilterAccounts";

interface IAccountsTableProps {
  fetchedAccounts: TAccountDetailsEntry[];
}

const AccountsTable: React.FC<IAccountsTableProps> = ({ fetchedAccounts }) => {
  const [filteredAccounts, setFilteredAccounts] = useState(fetchedAccounts);
  useEffect(() => {
    setFilteredAccounts(fetchedAccounts);
  }, [fetchedAccounts]);

  const mapAccountTypeToStr = (accountTypeNum: number): string => {
    const asAccountType: EAccountTypes = accountTypeNum;
    switch (asAccountType) {
      case EAccountTypes.customer:
        return "Customer";
      case EAccountTypes.sales:
        return "Sales";
      case EAccountTypes.support:
        return "Support";
      case EAccountTypes.admin:
        return "Admin";
      case EAccountTypes.warehouse:
        return "Warehouse";
      default:
        return "";
    }
  };

  const filterAccountsByType = (type: string) => {
    if (type !== "-1") {
      const typeAsNum = Number(type);
      setFilteredAccounts(
        fetchedAccounts.filter((account) => account.type === typeAsNum)
      );
    } else {
      setFilteredAccounts(fetchedAccounts);
    }
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <FilterAccounts onFilterChange={filterAccountsByType} />
      <StaffTable
        headings={[
          { display: "ID", sortable: true },
          { display: "Email", sortable: true },
          { display: "Type", sortable: true },
        ]}
        rows={filteredAccounts.map((account) => ({
          id: account.id,
          cells: [
            { display: account.id, sortValue: account.id },
            { display: account.email, sortValue: account.email },
            {
              display:
                account.type === null ? "" : mapAccountTypeToStr(account.type),
              sortValue: account.type === null ? -1 : account.type,
            },
          ],
        }))}
      />
    </div>
  );
};

export default AccountsTable;
