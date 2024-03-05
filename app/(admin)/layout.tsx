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

const adminNavLinks: TNavigationLinks[] = [
  { path: "/admin", displayName: "Overview" },
  { path: "/admin/accounts", displayName: "Accounts" },
  { path: "/admin/orders", displayName: "Orders" },
  { path: "/admin/products", displayName: "Products" },
  { path: "/admin/products/search", displayName: "Search products" },
  { path: "/admin/brands", displayName: "Brands" },
  { path: "/admin/product-types", displayName: "Product types" },
  { path: "/admin/discounts", displayName: "Discount codes" },
  { path: "/admin/support", displayName: "Support tickets" },
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

  if (accountTypeLoggedIn !== EAccountTypes.admin) {
    return <RedirectToLogin />;
  }

  return (
    <html lang="en">
      <body
        className={`${inter.className} flex flex-row bg-accent-foreground max-h-screen max-w-full w-full overflow-x-clip`}
      >
        <Sidebar navLinks={adminNavLinks} />
        {children}
      </body>
    </html>
  );
}
