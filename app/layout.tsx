import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Titlebar from "@/app/components/Navbars/Titlebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chop",
  description: "Chop, an ecommerce solution",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Titlebar />
        {children}
      </body>
    </html>
  );
}
