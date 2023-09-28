import Link from "next/link";
import { Card, Text } from "@chakra-ui/react";
import Header from "@/layout/Header";

export default function Home() {
  return (
    <>
      <Header hasLogo={true} />

      <Card textAlign={"center"} boxShadow={"none"}>
        <Text fontSize={"2xl"}>메인 페이지</Text>
        <Link href={"/slingshot"}>송편 터뜨리기</Link>
      </Card>
    </>
  );
}
