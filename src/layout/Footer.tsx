"use client";
import { PropsWithChildren } from "react";
import { useRouter } from "next/navigation";
import { Divider, StepSeparator, Text } from "@chakra-ui/react";
import ContentArea from "./ContentArea";
import Link from "next/link";

interface Props extends PropsWithChildren {
  className?: string;
}

const Footer = ({ children }: Props) => {
  return (
    <footer
      className={"w-full min-h-[3rem] pt-2 pb-4 bg-[#222222] text-[#dddddd]"}
    >
      <ContentArea>
        {children}

        <div className="flex gap-3 h-4 my-2 items-center justify-center">
          <Text>개발자 문의: dusunax@gmail.com</Text>
          <Divider orientation="vertical" />
          <Link href={"https://github.com/dusunax/game"}>
            코드 저장소:{" "}
            <span className="underline">https://github.com/dusunax/game</span>
          </Link>
        </div>

        <Copyright />
      </ContentArea>
    </footer>
  );
};

export default Footer;

function Copyright() {
  return (
    <Text fontSize={"md"} className="w-full text-center">
      Copyright © {new Date().getFullYear()} dusunax. All rights reserved.
    </Text>
  );
}
