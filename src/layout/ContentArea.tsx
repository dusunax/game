import { PropsWithChildren } from "react";

export default function ContentArea({ children }: PropsWithChildren) {
  return (
    <div className="flex-col-full justify-center w-full max-w-7xl mx-auto">
      {children}
    </div>
  );
}
