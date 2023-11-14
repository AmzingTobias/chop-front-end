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

const SettingsPage = () => {
  return (
    <main className="flex flex-col w-full max-w-screen-2xl p-4 mx-auto">
      <SettingOptions settingTabs={settings} />
    </main>
  );
};

export default SettingsPage;
