import DefaultLayout from "@/layout/DefaultLayout";

import { PropsWithChildren } from "react";

export default function RootLayout({ children }: PropsWithChildren) {
  return <DefaultLayout hasGoBack={true}>{children}</DefaultLayout>;
}
