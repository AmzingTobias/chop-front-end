"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Redirect = () => {
  const router = useRouter();

  useEffect(() => {
    const timerId = setTimeout(() => router.push("./"), 2000);
    return () => clearTimeout(timerId);
  }, [router]);

  return null;
};

export default Redirect;
