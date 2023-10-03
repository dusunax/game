"use client";
import { PropsWithChildren } from "react";
import { useRouter } from "next/navigation";
import { Text } from "@chakra-ui/react";
import ContentArea from "./ContentArea";

interface Props extends PropsWithChildren {
  className?: string;
}

const Footer = ({ children }: Props) => {
  return (
    <footer className={"w-full min-h-[3rem] pt-2 bg-[#222222] text-[#eeeeee]"}>
      <ContentArea>
        {children}

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
