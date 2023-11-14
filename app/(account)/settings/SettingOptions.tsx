import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReactNode } from "react";

export type TSettingOptions = {
  optionDisplayName: string;
  optionHeaderName: string;
  optionContent: ReactNode;
};

export const SettingOptions: React.FC<{ settingTabs: TSettingOptions[] }> = ({
  settingTabs,
}) => {
  return (
    <Tabs defaultValue="0" className="flex" orientation="vertical">
      <TabsList className="basis-1/4 p-0 w-[200px] bg-transparent">
        <div className="basis-1/4 bg-slate-200 w-full min-h-[112px] mb-2  rounded-sm">
          <div className="flex self-center items-center gap-2 m-4">
            <div className="bg-gradient-to-t from-indigo-900 to-blue-900 w-[80px] h-[80px] rounded-full"></div>
            <div className="text-black font-bold mt-2">
              <p>Hi,</p>
              <p>email@email.co.uk</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-200 p-2 w-full rounded-sm">
          {settingTabs.map((settingTab, index) => (
            <TabsTrigger
              className="w-full text-lg"
              value={`${index}`}
              key={index}
            >
              {settingTab.optionDisplayName}
            </TabsTrigger>
          ))}
          <TabsTrigger className="w-full text-lg" value="logout">
            Logout
          </TabsTrigger>
        </div>
      </TabsList>
      <div className="mx-4 basis-3/4 w-[1000px] ">
        {settingTabs.map((setting, index) => (
          <TabsContent value={`${index}`} key={index} className="mt-0">
            <div className="min-h-[96px] bg-slate-200 mb-2 rounded-sm p-2 flex">
              <h1 className="self-center text-4xl font-semibold mt-4">
                {setting.optionHeaderName}
              </h1>
            </div>
            <div className="bg-slate-200 min-h-full rounded-sm p-2">
              {setting.optionContent}
            </div>
          </TabsContent>
        ))}
      </div>
    </Tabs>
  );
};
