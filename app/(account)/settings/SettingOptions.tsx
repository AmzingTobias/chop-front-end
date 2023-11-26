import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReactNode } from "react";
import Welcome from "./Welcome";
import Link from "next/link";
import { IconType } from "react-icons/lib";
import { Raleway } from "next/font/google";
const raleway = Raleway({ subsets: ["latin"] });

export type TSettingOptions = {
  optionDisplayName: string;
  optionHeaderName: string;
  optionContent: ReactNode;
};

export const SettingOptions: React.FC<{
  settingTabs: TSettingOptions[];
  accountEmail: string;
  active?: number;
}> = ({ settingTabs, active = 0, accountEmail }) => {
  return (
    <Tabs
      defaultValue={`${active}`}
      className="flex flex-col sm:flex-row"
      orientation="vertical"
    >
      <TabsList className="sm:basis-1/4 p-0 w-[200px] bg-transparent justify-normal">
        <div className="basis-1/4 bg-accent  w-full min-h-[112px] mb-6 rounded-sm shadow-md hidden md:flex">
          <Welcome email={accountEmail} />
        </div>
        <div className="flex flex-col w-full gap-2 p-2 rounded-sm shadow-md bg-accent">
          {settingTabs.map((settingTab, index) => (
            <TabsTrigger className="text-lg" value={`${index}`} key={index}>
              {settingTab.optionDisplayName}
            </TabsTrigger>
          ))}
          <TabsTrigger className="w-full text-lg " value="logout">
            <Link href={"/logout"}>Logout</Link>
          </TabsTrigger>
        </div>
      </TabsList>
      <div className="mt-4 sm:mt-0 sm:ml-2 md:ml-6 lg:ml-10 sm:basis-3/4 sm:w-full ">
        {settingTabs.map((setting, index) => (
          <TabsContent value={`${index}`} key={index} className="mt-0">
            <div className="min-h-[96px] bg-primary mb-4 p-2 flex items-center shadow-md">
              <div className="flex gap-2 mt-4 ml-4">
                <h1
                  className={`text-4xl font-semibold ${raleway.className} uppercase`}
                >
                  {setting.optionHeaderName}
                </h1>
              </div>
            </div>
            <div className="min-h-full p-6 rounded-sm shadow-md bg-primary">
              {setting.optionContent}
            </div>
          </TabsContent>
        ))}
      </div>
    </Tabs>
  );
};
