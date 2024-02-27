import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { cookies } from "next/headers";
import { StoreProvider } from "@/app/redux/store.provider";
import { EAccountTypes, getAccountTypeFromCookie } from "@/app/data/auth";
import BasketWebSocket from "@/app/components/BasketWebSocket";

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
  const authCookie = cookies().get("auth");
  const accountTypeLoggedIn = authCookie
    ? getAccountTypeFromCookie(authCookie.value)
    : undefined;

  return (
    <html lang="en">
      <body
        className={`${inter.className} min-h-screen flex flex-col bg-accent-foreground`}
      >
        <StoreProvider>
          <BasketWebSocket
            customerLoggedIn={accountTypeLoggedIn === EAccountTypes.customer}
          />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
