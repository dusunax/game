"use client";
import { PropsWithChildren } from "react";
import { useRouter } from "next/navigation";

interface Props extends PropsWithChildren {
  className?: string;
  hasLogo?: boolean;
}

const Header = ({ children, hasLogo = false }: Props) => {
  return (
    <header className={"flex justify-between items-center h-16"}>
      {hasLogo && <Logo />}
      {children}
    </header>
  );
};

export default Header;

function Logo() {
  const router = useRouter();
  return (
    <button className="w-16 h-full" onClick={() => router.push("/")}>
      🌕
    </button>
  );
}
