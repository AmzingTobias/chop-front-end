import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

import Navigation from "../components/Navigation";
import { getProductTypes } from "../data/navigationLinks";
import { cookies } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "chop",
  description: "chop, an ecommerce solution",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const accountLoggedIn = cookies().has("auth");

  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen`}>
        <Navigation
          minorNavbarBtns={await getProductTypes()}
          accountLoggedIn={accountLoggedIn}
        />
        <div
          id="container"
          className="flex w-full max-w-screen-2xl md:w-11/12 p-4 mx-auto"
        >
          {children}
        </div>
      </body>
    </html>
  );
}