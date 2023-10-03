"use client";
import { useRef, useState } from "react";
import UseMatter from "./hooks/useMatter";
import { Button, Tag, Text } from "@chakra-ui/react";
import { BsHeartFill } from "react-icons/bs";
import ScreenShotButton from "../Home/ScreenShotButton";
import { useSearchParams } from "next/navigation";

export default function SlingShot() {
  const renderRef = useRef<HTMLDivElement | null>(null);
  const {
    level,
    setLevel,
    life,
    isGameover,
    gameOver,
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

  return (
    <div className="max-w-[1060px]">
      <div className="w-full flex justify-between gap-4 my-4">
        <div className="relative flex items-center gap-4 px-1">
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
          <div className="flex items-center gap-3 text-red-500 absolute left-0 -bottom-8 translate-y-full pl-4">
            {Array(life)
              .fill("")
              .map((e) => (
                <BsHeartFill size={24} />
              ))}
          </div>

          {!isGameover && isHover && (
            <div className="absolute left-0 top-0 -translate-y-full">
              <Tag>송편 {heartCount}</Tag>
              <Tag>솔잎 {blockCount}</Tag>
            </div>
          )}
        </div>
        <div className="flex gap-4">
          <ScreenShotButton />
          {mode === "dev" && level === 0 && isGameover && (
            <StartButton level={level} onClick={gameStart} />
          )}
          {<EndButton level={level} onClick={gameOver} />}
          {mode === "dev" &&
            level !== 0 &&
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

      {level !== 0 && (
        <>
          <div
            id="render"
            className="w-[1060px] min-h-[600px] bg-slate-200"
            ref={renderRef}
          />

          <Text
            fontSize={"xs"}
            className="mt-2"
            textAlign={"right"}
            textColor={"#555"}
          >
            (점수: 송편 = 각 500점, 솔잎 = 각 15점, {finalLevel}레벨 클리어 후
            남은 기회 = 각 300점)
          </Text>
        </>
      )}

      {level === 0 && (
        <div className="w-[1060px] min-h-[600px] bg-slate-200 flex-center flex-col">
          <Text fontSize={"3xl"}>
            {isClear ? "축하합니다!" : "송편 게임 끝!"}
          </Text>
          {isClear && <Tag colorScheme="linkedin">게임 클리어!</Tag>}
          <img src="/img/player.svg" className="animate-spin" />

          {isClear && <Text fontSize={"2xl"}>플레이해주셔서 감사합니다 🩷</Text>}
          {/* <Text fontSize={"5xl"}>{"level: " + level}</Text> */}
          <Text fontSize={"5xl"}>{"score: " + score}</Text>

          <Text fontSize={"mg"} className="mt-10 animate-pulse">
            게임을 다시 시작하려면 새로고침 해주세요
          </Text>
          <Text fontSize={"mg"} className="mt-5" colorScheme="gray">
            (점수 계산: 송편 = 각 500점, 솔잎 = 각 15점, 클리어 후 남은 기회 =
            각 300점)
          </Text>
        </div>
      )}
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
    <Button
      onClick={() => onClick()}
      colorScheme={level !== 0 ? "red" : "gray"}
    >
      게임 종료
    </Button>
  );
}
