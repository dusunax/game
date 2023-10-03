"use client";
import { PropsWithChildren } from "react";
import { useRouter } from "next/navigation";

import Header from "./Header";

import { BsArrowLeft } from "react-icons/bs";

const ArrowHeader = ({ children }: PropsWithChildren) => {
  const router = useRouter();

  return (
    <Header>
      <button
        className={"cursor-pointer flex-center h-full w-16 ml-24"}
        onClick={() => router.back()}
      >
        <BsArrowLeft size={30} />
      </button>
      {children}
    </Header>
  );
};

export default ArrowHeader;
