import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";

import Navigation from "@/app/components/Navigation";
import { getProductTypes } from "@/app/data/navigationLinks";
import { cookies } from "next/headers";
import Footer from "@/app/components/footer/Footer";
import { getAccountTypeFromCookie } from "@/app/data/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "chop",
  description: "chop, an ecommerce solution",
};

export default async function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authCookie = cookies().get("auth");
  const accountTypeLoggedIn = authCookie
    ? getAccountTypeFromCookie(authCookie.value)
    : undefined;

  return (
    <>
      <Navigation
        minorNavbarBtns={await getProductTypes()}
        accountTypeLoggedIn={accountTypeLoggedIn}
      />
      <div className="w-full bg-accent-foreground">
        <div
          id="container"
          className="flex flex-grow w-full p-4 mx-auto max-w-screen-2xl md:w-11/12 min-h-screen"
        >
          {children}
        </div>
      </div>
      <Footer />
    </>
  );
}
