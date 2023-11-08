import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import MinimalTitlebar from "../components/navbars/MinimalTitlebar";

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
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen`}>
        <MinimalTitlebar />
        <div
          id="container"
          className="flex w-full max-w-screen-2xl md:w-11/12 p-4 mx-auto items-center justify-center"
        >
          {children}
        </div>
      </body>
    </html>
  );
}
