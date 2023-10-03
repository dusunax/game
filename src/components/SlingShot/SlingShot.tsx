"use client";
import { useEffect, useRef, useState } from "react";
import UseMatter from "./hooks/useMatter";
import { Button, Tag, Text, useToast } from "@chakra-ui/react";
import { BsHeartFill } from "react-icons/bs";
import ScreenShotButton from "../Home/ScreenShotButton";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import LinkCopyButton from "../Home/LinkCopyButton";

export default function SlingShot() {
  const renderRef = useRef<HTMLDivElement | null>(null);
  const {
    level,
    setLevel,
    life,
    isGameover,
    gameEnd,
    gameStart,
    score,
    heartCount,
    blockCount,
    finalLevel,
    isClear,
  } = UseMatter(renderRef);
  const params = useSearchParams();
  const mode = params.get("mode");
  const [isHover, setIsHover] = useState(false);

  const toast = useToast();
  useEffect(() => {
    if (!isClear) return;

    toast({
      title: "게임 클리어!",
      status: "info",
      duration: 3000, // 표시 시간 (밀리초)
      isClosable: true,
      position: "top",
    });
  }, [isClear]);

  return (
    <div className="w-full max-w-[1060px] min-h-[600px] relative">
      <div className="flex justify-between item-end">
        <div>
          <div className="flex gap-2 text-xl px-1">
            <Text fontWeight={"bold"}>송편 터뜨리기:</Text>
            <Text>복 주머니를 날려서 송편을 맞춰 떨어뜨리세요!</Text>
          </div>
          <div className="flex gap-2 text-xl px-1">
            <Text fontSize={"xs"}>
              7라운드 클리어 시, 고득점: 5000점 | 평균: 4000점 | 최저 3500점
            </Text>
          </div>
        </div>
        <ScreenShotButton />
      </div>
      <div className="w-full flex justify-between gap-4 my-4">
        <div className="relative h-12 flex items-center gap-4 px-1">
          {!isGameover && (
            <Tag
              fontSize={"xl"}
              colorScheme="linkedin"
              onMouseEnter={() => !isHover && setIsHover(true)}
              onMouseLeave={() => isHover && setIsHover(false)}
            >
              {score}점
            </Tag>
          )}
          <Tag className="flex items-center">
            레벨: {level ? level : "-"} / {finalLevel}
          </Tag>
          <div className="flex items-center gap-3 text-red-500 absolute left-0 -bottom-8 translate-y-full pl-4 z-30">
            {life >= 0 &&
              Array(life)
                .fill("")
                .map((e, idx) => <BsHeartFill size={24} key={idx} />)}
          </div>

          {!isGameover && isHover && (
            <div className="absolute left-0 top-0 -translate-y-full">
              <Tag>송편 {heartCount}</Tag>
              <Tag>솔잎 {blockCount}</Tag>
            </div>
          )}
        </div>

        <div className="flex gap-4">
          {mode === "dev" && level === 0 && isGameover && (
            <StartButton level={level} onClick={gameStart} />
          )}
          {mode === "dev" && <EndButton level={level} onClick={gameEnd} />}
          {mode === "dev" &&
            level > 0 &&
            !isGameover &&
            Array(finalLevel)
              .fill("")
              .map((e, idx) => (
                <Button
                  key={idx}
                  onClick={() => setLevel(idx + 1)}
                  colorScheme={level === idx + 1 ? "green" : "gray"}
                >
                  {idx + 1}
                </Button>
              ))}
        </div>
      </div>

      <div className="min-h-[648px] bg-gradient-to-t to-slate-200 from-white ">
        {level > 0 && (
          <>
            <div className="w-[1060px] min-h-[600px] relative">
              <div
                id="render"
                className="w-full h-full bg-slate-200"
                ref={renderRef}
              />

              {life === 0 && (
                <div className="fade-in absolute left-0 top-0 w-full h-full">
                  <div className="w-full h-full flex flex-col gap-6 items-center justify-center bg-[rgba(0,0,0,0.4)]">
                    <Text textColor={"#fff"} textAlign={"center"}>
                      게임이 끝나지 않으면 게임 종료 버튼을 눌러주세요 <br />{" "}
                      (자동으로 끝나지 않는 버그 수정 중)
                    </Text>

                    <EndButton level={level} onClick={gameEnd} />
                  </div>
                </div>
              )}
            </div>
            <div className="flex justify-between">
              <Text
                fontSize={"xs"}
                className="mt-2 flex-1"
                textAlign={"right"}
                textColor={"#555"}
              >
                (점수: 송편 = 각 500점, 솔잎 = 각 15점, {finalLevel}레벨 클리어
                후 남은 기회 = 각 300점)
              </Text>
            </div>
          </>
        )}

        {(level <= 0 || life <= 0 || isGameover) && (
          <div className="w-[1060px] min-h-[600px] absolute top-32 mt-2 left-0 bg-slate-200 flex-center flex-col fade-in delay-2s">
            <Text fontSize={"3xl"}>
              {isClear ? "축하합니다!" : "송편 게임 끝!"}
            </Text>
            {isClear && <Tag colorScheme="linkedin">게임 클리어!</Tag>}
            <Image
              src={"/img/player.svg"}
              alt="game end!"
              className="animate-spin"
              width={200}
              height={200}
            />

            {isClear && (
              <Text fontSize={"2xl"}>플레이해주셔서 감사합니다 🩷</Text>
            )}
            {/* <Text fontSize={"5xl"}>{"level: " + level}</Text> */}
            <Text fontSize={"5xl"}>{"score: " + score}</Text>

            <Text fontSize={"xs"} className="mt-5" colorScheme="gray">
              (점수 계산: 송편 = 각 500점, 솔잎 = 각 15점, 클리어 후 남은 기회 =
              각 300점)
            </Text>
            <Text fontSize={"xl"} className="mt-5 animate-pulse">
              게임을 다시 시작하려면 새로고침 해주세요
            </Text>

            <div className="flex gap-4 mt-6">
              <LinkCopyButton size="md" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

interface ButtonProps {
  level: number;
  onClick: () => void;
}

function StartButton({ level, onClick }: ButtonProps) {
  return (
    <Button
      onClick={() => onClick()}
      colorScheme={level === 0 ? "green" : "gray"}
    >
      게임 시작
    </Button>
  );
}

function EndButton({ level, onClick }: ButtonProps) {
  return (
    <Button onClick={() => onClick()} colorScheme={"gray"}>
      게임 종료
    </Button>
  );
}
