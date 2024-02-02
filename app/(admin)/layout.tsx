import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import Sidebar from "./Sidebar";
import { TNavigationLinks } from "@/app/data/navigationLinks";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "chop",
  description: "chop, an ecommerce solution",
};

const adminNavLinks: TNavigationLinks[] = [
  { path: "/admin", displayName: "Overview" },
];

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} min-h-screen flex flex-row min-w-full max-w-full bg-accent-foreground`}
      >
        <Sidebar navLinks={adminNavLinks} />
        {children}
      </body>
    </html>
  );
}
