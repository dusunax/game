import Link from "next/link";
import { Card, ChakraProvider, Text } from "@chakra-ui/react";

export default function Home() {
  return (
    <ChakraProvider>
      <Card textAlign={"center"} boxShadow={"none"}>
        <Text fontSize={"2xl"}>메인 페이지</Text>
        <Link href={"/slingshot"}>송편 터뜨리기</Link>
      </Card>
    </ChakraProvider>
  );
}
