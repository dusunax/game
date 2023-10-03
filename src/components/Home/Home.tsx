import Link from "next/link";
import { Button, Card, Tag, Text } from "@chakra-ui/react";
import Header from "@/layout/Header";
import LinkCopyButton from "./LinkCopyButton";

export default function Home() {
  return (
    <>
      <Header hasLogo={true} />

      <Card
        textAlign={"center"}
        boxShadow={"none"}
        className="gap-4 h-full justify-center items-center"
      >
        <Tag colorScheme="linkedin">2023년 추석을 맞이 웹게임</Tag>
        <Text fontSize={"5xl"}>송편 터뜨리기 게임</Text>
        <Link href={"/slingshot"} className="w-full">
          <img
            src="/img/target5.svg"
            className="w-40 my-10 mx-auto animate-bounce"
            alt="송편"
          />
        </Link>
        <Text fontSize={"md"}>
          송편을 복주머니로 떨어뜨리면 다음 레벨로 넘어갑니다.
        </Text>
        <Text fontSize={"md"}>지금 마지막 레벨은 7레벨이에요</Text>
        <div className="flex flex-col gap-4 mt-10 w-full max-w-md mx-auto">
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
          <Text fontSize={"sm"}>
            구글 chrome 브라우저 사용을 권장하며, 모바일 최적화 되어있지
            않습니다
          </Text>
        </div>
      </Card>
    </>
  );
}
