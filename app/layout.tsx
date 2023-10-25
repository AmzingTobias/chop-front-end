import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Titlebar from "./components/navbars/Titlebar";
import Infobar from "./components/navbars/Infobar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "chop",
  description: "chop, an ecommerce solution",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen`}>
        <div className="hidden md:flex">
          <Infobar />
        </div>
        <Titlebar />
        <div
          id="container"
          className="flex w-full max-w-screen-2xl md:w-11/12 p-4 bg-gray-900 bg-opacity-5 mx-auto"
        >
          {children}
        </div>
      </body>
    </html>
  );
}
