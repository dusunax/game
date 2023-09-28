"use client";
import Header from "./Header";

import { BsArrowLeft } from "react-icons/bs";
import { useRouter } from "next/navigation";

const ArrowHeader = () => {
  const router = useRouter();

  return (
    <Header>
      <button
        className={"cursor-pointer flex-center h-full w-16"}
        onClick={() => router.back()}
      >
        <BsArrowLeft size={30} />
      </button>
    </Header>
  );
};

export default ArrowHeader;
