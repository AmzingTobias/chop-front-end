"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface ILoginProps {
  adminLoggedIn: boolean;
}

const Login: React.FC<ILoginProps> = ({ adminLoggedIn }) => {
  const router = useRouter();

  useEffect(() => {
    if (adminLoggedIn) {
      router.push("/admin");
    }
  }, [router, adminLoggedIn]);

  return null;
};

export default Login;
