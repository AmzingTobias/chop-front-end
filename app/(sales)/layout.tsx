import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { cookies } from "next/headers";
import { EAccountTypes, getAccountTypeFromCookie } from "@/app/data/auth";
import Sidebar from "./Sidebar";
import { TNavigationLinks } from "../data/navigationLinks";
import RedirectToLogin from "./RedirectToLogin";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "chop",
  description: "chop, an ecommerce solution",
};

const salesNavLinks: TNavigationLinks[] = [
  { path: "/sales/products", displayName: "Products" },
  { path: "/sales/products/search", displayName: "Search products" },
  { path: "/sales/brands", displayName: "Brands" },
  { path: "/sales/product-types", displayName: "Product types" },
  { path: "/sales/discounts", displayName: "Discount codes" },
];

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authCookie = cookies().get("auth");
  const accountTypeLoggedIn = authCookie
    ? getAccountTypeFromCookie(authCookie.value)
    : undefined;

  if (accountTypeLoggedIn !== EAccountTypes.sales) {
    return <RedirectToLogin />;
  }

  return (
    <html lang="en">
      <body
        className={`${inter.className} flex flex-row bg-accent-foreground max-h-screen max-w-full w-full overflow-x-clip`}
      >
        <Sidebar navLinks={salesNavLinks} />
        {children}
      </body>
    </html>
  );
}
