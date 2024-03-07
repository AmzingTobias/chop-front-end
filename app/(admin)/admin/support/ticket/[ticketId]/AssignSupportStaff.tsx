"use client";

import {
  ISupportStaffWithAssigned,
  assignSupportStaffToTicket,
  getSupportStaffAvailable,
} from "@/app/data/support";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

interface IAssignSupportStaffProps {
  refreshAssignedAccount: () => void;
  ticketId: number;
}

const AssignSupportStaff: React.FC<IAssignSupportStaffProps> = ({
  ticketId,
  refreshAssignedAccount,
}) => {
  const useAccountsAvailable = () => {
    const [accountsAvailable, setAccountsAvailable] = useState<
      ISupportStaffWithAssigned[]
    >([]);
    useEffect(() => {
      getSupportStaffAvailable()
        .then((accounts) => setAccountsAvailable(accounts))
        .catch((err) => {
          console.error(err);
          setAccountsAvailable([]);
        });
    }, []);
    return accountsAvailable;
  };

  const accounts = useAccountsAvailable();
  const [selectedAccountId, setSelectedAccountId] = useState("");
  const [disableAssignBtn, setDisableAssignBtn] = useState(false);

  return (
    <div className=" flex flex-row gap-2">
      <Select
        value={selectedAccountId === "" ? undefined : selectedAccountId}
        onValueChange={setSelectedAccountId}
      >
        <SelectTrigger className="min-w-[300px]">
          <SelectValue placeholder="Select an account type" />
        </SelectTrigger>
        <SelectContent>
          {accounts.map((account) => (
            <SelectItem key={account.supportId} value={`${account.supportId}`}>
              {account.email} | Count: {account.ticketCount}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button
        className="w-full"
        variant={"secondary"}
        disabled={selectedAccountId === "" || disableAssignBtn}
        onClick={() => {
          if (selectedAccountId !== "") {
            assignSupportStaffToTicket(ticketId, Number(selectedAccountId))
              .then(() => refreshAssignedAccount())
              .catch((err) => {
                console.error(err);
                setDisableAssignBtn(false);
              });
          }
        }}
      >
        Assign support staff
      </Button>
    </div>
  );
};

export default AssignSupportStaff;
