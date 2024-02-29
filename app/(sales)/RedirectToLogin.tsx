"use client";

import { useRouter } from "next/navigation";

const RedirectToLogin = () => {
  const router = useRouter();

  router.replace("/login/sales");

  return null;
};

export default RedirectToLogin;
