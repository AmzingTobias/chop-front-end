import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReactNode } from "react";
import Welcome from "./Welcome";
import Link from "next/link";
import { IconType } from "react-icons/lib";

export type TSettingOptions = {
  optionDisplayName: string;
  optionHeaderName: string;
  optionHeaderIcon?: IconType;
  optionContent: ReactNode;
};

export const SettingOptions: React.FC<{
  settingTabs: TSettingOptions[];
  active?: number;
}> = ({ settingTabs, active = 0 }) => {
  return (
    <Tabs
      defaultValue={`${active}`}
      className="flex flex-col sm:flex-row"
      orientation="vertical"
    >
      <TabsList className="sm:basis-1/4 p-0 w-[200px] bg-transparent justify-normal">
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
            <Link href={"/logout"}>Logout</Link>
          </TabsTrigger>
        </div>
      </TabsList>
      <div className="mt-4 sm:mt-0 sm:mx-4 sm:basis-3/4 sm:w-full ">
        {settingTabs.map((setting, index) => (
          <TabsContent value={`${index}`} key={index} className="mt-0">
            <div className="min-h-[96px] bg-slate-200 mb-2 rounded-sm p-2 flex items-center shadow-sm">
              <div className="flex ml-4 mt-4 gap-2">
                <h1 className="text-4xl font-semibold">
                  {setting.optionHeaderName}
                </h1>
                {setting.optionHeaderIcon ? (
                  <setting.optionHeaderIcon size={40} />
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="bg-slate-200 min-h-full rounded-sm p-6 shadow-sm">
              {setting.optionContent}
            </div>
          </TabsContent>
        ))}
      </div>
    </Tabs>
  );
};
