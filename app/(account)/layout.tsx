import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import MinimalTitlebar from "../components/navbars/MinimalTitlebar";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "chop",
  description: "chop, an ecommerce solution",
};

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MinimalTitlebar />
      <div
        id="container"
        className="flex w-full max-w-screen-2xl md:w-11/12 mx-auto items-center justify-center"
      >
        {children}
      </div>
    </>
  );
}
