import { cookies } from "next/headers";
import { ChangePasswordForm } from "./ChangePasswordForm";
import { SettingOptions, TSettingOptions } from "./SettingOptions";
import SettingsContent from "./SettingsContent";
import { SlLock } from "react-icons/sl";
import { SlHome } from "react-icons/sl";
const settings: TSettingOptions[] = [
  {
    optionDisplayName: "Account Security",
    optionHeaderName: "Security",
    optionHeaderIcon: SlLock,
    optionContent: (
      <div className="lg:w-1/2">
        <ChangePasswordForm />
      </div>
    ),
  },
  {
    optionDisplayName: "Address Book",
    optionHeaderName: "Addresses",
    optionHeaderIcon: SlHome,
    optionContent: <SettingsContent />,
  },
];

const SettingsPage = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/v1/auth/`,
    {
      headers: {
        "Content-type": "application/json",
        Cookie: `${cookies()}`,
      },
      credentials: "include",
      method: "GET",
    }
  );
  const accountDetails = res.ok ? await res.json() : "";

  return (
    <main className="flex flex-col w-full max-w-screen-2xl p-4 mx-auto">
      <SettingOptions
        settingTabs={settings}
        accountEmail={accountDetails.email ? accountDetails.email : ""}
      />
    </main>
  );
};

export default SettingsPage;
