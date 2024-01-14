"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface ILoginProps {
  accountLoggedIn: boolean;
}

const Login: React.FC<ILoginProps> = ({ accountLoggedIn }) => {
  const router = useRouter();

  useEffect(() => {
    if (accountLoggedIn) {
      router.push("./");
    }
  }, [router, accountLoggedIn]);

  return null;
};

export default Login;
