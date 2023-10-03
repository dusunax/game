import { PropsWithChildren } from "react";
import ArrowHeader from "./ArrowHeader";
import Footer from "./Footer";
import ContentArea from "./ContentArea";

interface Props extends PropsWithChildren {
  className?: string;
  hasGoBack?: boolean;
}

export default function DefaultLayout({
  children,
  className = "",
  hasGoBack = false,
}: Props) {
  return (
    <div className={`flex-col-full w-full ${className}`}>
      {hasGoBack && <ArrowHeader />}
      <ContentArea>{children}</ContentArea>
    </div>
  );
}
