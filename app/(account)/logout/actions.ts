"use server";

import { cookies } from "next/headers";
import { RedirectType, redirect } from "next/navigation";

export async function logoutAction() {
  cookies().delete("auth");
  redirect("./", RedirectType.replace);
}
