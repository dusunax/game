import { PropsWithChildren } from "react";
import ArrowHeader from "./ArrowHeader";

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
    <div className={`flex-col-full w-full max-w-7xl px-16 ${className}`}>
      {hasGoBack && <ArrowHeader />}
      <div className="flex-col-full">{children}</div>
    </div>
  );
}
