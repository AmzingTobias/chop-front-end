import { cookies } from "next/headers";
import { ChangePasswordForm } from "./ChangePasswordForm";
import { SettingOptions, TSettingOptions } from "./SettingOptions";
import SettingsContent from "./SettingsContent";
const settings: TSettingOptions[] = [
  {
    optionDisplayName: "Account Security",
    optionHeaderName: "Security",
    optionContent: (
      <div className="lg:w-1/2">
        <ChangePasswordForm />
      </div>
    ),
  },
  {
    optionDisplayName: "Address Book",
    optionHeaderName: "Addresses",
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
    <main className="flex flex-col w-full p-4 mx-auto max-w-screen-2xl">
      <SettingOptions
        settingTabs={settings}
        accountEmail={accountDetails.email ? accountDetails.email : ""}
      />
    </main>
  );
};

export default SettingsPage;
