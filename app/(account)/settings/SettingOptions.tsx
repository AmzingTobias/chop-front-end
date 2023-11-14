import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const SettingOptions = () => {
  return (
    <Tabs
      defaultValue="account"
      className="flex text-xl"
      orientation="vertical"
    >
      <TabsList className="basis-1/4 p-0 w-[200px] bg-transparent">
        <div className="basis-1/4 bg-green-400 w-full min-h-[96px] mb-10 flex">
          <div className="bg-black w-[40px] h-[40px] rounded-full"></div>
          <div className="">
            <p>Hi,</p>
            <p>tobias@tdmd.co.uk</p>
          </div>
        </div>
        <div className="bg-green-400 p-2">
          <TabsTrigger className="w-full text-lg" value="account">
            Overview
          </TabsTrigger>
          <TabsTrigger className="w-full text-lg" value="security">
            Account security
          </TabsTrigger>
          <TabsTrigger className="w-full text-lg" value="address">
            Address book
          </TabsTrigger>
          <TabsTrigger className="w-full text-lg" value="balance">
            Gift cards & balance
          </TabsTrigger>
          <TabsTrigger className="w-full text-lg" value="logout">
            Logout
          </TabsTrigger>
        </div>
      </TabsList>
      <div className="mx-4 basis-3/4 w-[1000px] ">
        <TabsContent value="account" className="bg-blue-500">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="security" className="mt-0">
          <div className="min-h-[96px] bg-blue-400 mb-10">
            <h1>Account Settings</h1>
          </div>
          <div className="bg-red-500 min-h-full">
            Change your password here.
          </div>
        </TabsContent>
        <TabsContent value="address">Change your address here.</TabsContent>
        <TabsContent value="balance">Change your balance here.</TabsContent>
      </div>
    </Tabs>
  );
};
