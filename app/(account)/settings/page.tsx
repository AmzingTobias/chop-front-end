import { SettingOptions, TSettingOptions } from "./SettingOptions";
import SettingsContent from "./SettingsContent";

const settings: TSettingOptions[] = [
  {
    optionDisplayName: "Account Security",
    optionHeaderName: "Security",
    optionContent: <SettingsContent />,
  },
  {
    optionDisplayName: "Address Book",
    optionHeaderName: "Addresses",
    optionContent: <SettingsContent />,
  },
];

const SettingsPage = () => {
  return (
    <div className="mt-10">
      <SettingOptions settingTabs={settings} />
    </div>
  );
};

export default SettingsPage;
