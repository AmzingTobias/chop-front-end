"use client";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LogoutPage = () => {
  const router = useRouter();
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/v1/auth/logout`, {
      method: "POST",
      credentials: "include",
    }).then((response) => {
      if (response.ok) {
        router.push("./");
      }
    });
  }, [router]);

  return (
    <div className="flex mt-32 justify-center bg-primary p-4 shadow-md rounded-md">
      <p className="font-bold text-3xl text-accent flex items-center">
        <Loader2 className="mr-2 animate-spin" />
        Logging out
      </p>
    </div>
  );
};

export default LogoutPage;
