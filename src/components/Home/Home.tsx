import Link from "next/link";
import { Button, Card, Text } from "@chakra-ui/react";
import Header from "@/layout/Header";
import LinkCopyButton from "./LinkCopyButton";

export default function Home() {
  return (
    <>
      <Header hasLogo={true} />

      <Card
        textAlign={"center"}
        boxShadow={"none"}
        className="gap-4 h-full justify-center"
      >
        <Text fontSize={"3xl"}>송편 터뜨리기 게임</Text>
        <Text fontSize={"md"}>
          송편 터뜨리기 게임은 2023년 추석을 맞이하여 만든 웹게임입니다.
          <br />
          chrome 브라우저 사용을 권장하며, 모바일 최적화 되어있지 않습니다
        </Text>

        <div className="flex flex-col gap-2 mt-10 w-full max-w-md mx-auto">
          <Link href={"/slingshot"} className="w-full">
            <Button
              rounded={"xl"}
              size={"lg"}
              colorScheme="messenger"
              width={"full"}
              className="w-full"
            >
              게임 시작하기
            </Button>
          </Link>
          <LinkCopyButton />
        </div>
      </Card>
    </>
  );
}
