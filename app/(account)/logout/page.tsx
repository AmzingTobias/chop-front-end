"use client";
import { logoutAction } from "./actions";
import { useEffect, useRef } from "react";

const LogoutPage = () => {
  const formRef: React.Ref<HTMLFormElement> = useRef(null);

  useEffect(() => {
    if (formRef.current !== null) {
      formRef.current.requestSubmit();
    }
  }, []);

  return <form ref={formRef} action={logoutAction} />;
};

export default LogoutPage;
