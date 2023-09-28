import "@styles/global.css";
import "@styles/index.css";

import { PropsWithChildren } from "react";
import type { Metadata } from "next";
import DefaultLayout from "@/layout/DefaultLayout";
import Header from "@/layout/Header";

export const metadata: Metadata = {
  title: "추석 게임 🧀",
  description: "추석을 함께할 게임",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html>
      <link rel="icon" href="/favicon/favicon.ico" />
      <body className="flex-col-screen items-center">
        <DefaultLayout>
          <Header hasLogo={true} />
          {children}
        </DefaultLayout>
      </body>
    </html>
  );
}
