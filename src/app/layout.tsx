import "@styles/global.css";
import "@styles/index.css";

import { PropsWithChildren } from "react";
import type { Metadata } from "next";
import DefaultLayout from "@/layout/DefaultLayout";
import { ChakraProvider } from "@chakra-ui/react";

export const metadata: Metadata = {
  title: "추석 게임 🧀",
  description: "추석을 함께할 게임",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html>
      <link rel="icon" href="/favicon/favicon.ico" />
      <body className="flex-col-screen items-center">
        <ChakraProvider>
          <DefaultLayout>{children}</DefaultLayout>
        </ChakraProvider>
      </body>
    </html>
  );
}
