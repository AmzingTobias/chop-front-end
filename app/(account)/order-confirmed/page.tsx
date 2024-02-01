import { Loader2 } from "lucide-react";
import Redirect from "./Redirect";

const LogoutPage = () => {
  return (
    <div className="flex mt-32 justify-center bg-primary p-4 shadow-md rounded-md">
      <Redirect />
      <p className="font-bold text-3xl text-accent flex items-center">
        <Loader2 className="mr-2 animate-spin" />
        Order placed
      </p>
    </div>
  );
};

export default LogoutPage;
