import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReactNode } from "react";
import Welcome from "./Welcome";
import SettingOptionHeader from "./SettingOptionHeader";

export type TSettingOptions = {
  optionDisplayName: string;
  optionHeaderName: string;
  optionContent: ReactNode;
};

export const SettingOptions: React.FC<{ settingTabs: TSettingOptions[] }> = ({
  settingTabs,
}) => {
  return (
    <Tabs
      defaultValue="0"
      className="flex flex-col sm:flex-row"
      orientation="vertical"
    >
      <TabsList className="sm:basis-1/4 p-0 w-[200px] bg-transparent">
        <div className="basis-1/4 bg-slate-200 w-full min-h-[112px] mb-2 rounded-sm hidden md:flex shadow-sm">
          <Welcome />
        </div>
        <div className="bg-slate-200 p-2 w-full rounded-sm shadow-sm">
          {settingTabs.map((settingTab, index) => (
            <TabsTrigger
              className="w-full text-lg hover:bg-white hover:bg-opacity-20"
              value={`${index}`}
              key={index}
            >
              {settingTab.optionDisplayName}
            </TabsTrigger>
          ))}
          <TabsTrigger
            className="w-full text-lg rounded-sm hover:bg-white hover:bg-opacity-20"
            value="logout"
          >
            Logout
          </TabsTrigger>
        </div>
      </TabsList>
      <div className="mt-4 sm:mt-0 sm:mx-4 sm:basis-3/4 sm:w-full ">
        {settingTabs.map((setting, index) => (
          <TabsContent value={`${index}`} key={index} className="mt-0">
            <div className="min-h-[96px] bg-slate-200 mb-2 rounded-sm p-2 flex shadow-sm">
              <SettingOptionHeader header={setting.optionHeaderName} />
            </div>
            <div className="bg-slate-200 min-h-full rounded-sm p-2 shadow-sm">
              {setting.optionContent}
            </div>
          </TabsContent>
        ))}
      </div>
    </Tabs>
  );
};
