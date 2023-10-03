"use client";
import { Dispatch, SetStateAction, useRef } from "react";
import UseMatter from "./hooks/useMatter";
import { Button, Tag, Text } from "@chakra-ui/react";
import { BsHeart, BsHeartFill } from "react-icons/bs";
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

  return (
    <div className="max-w-[1060px]">
      <div className="w-full flex justify-between gap-4 my-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center">레벨: {level ? level : "-"}</div>
          <div className="flex items-center gap-2 text-red-500">
            {life !== 0 && (
              <>
                <BsHeartFill />
                {life}
              </>
            )}

            {life === 0 && <BsHeart />}
          </div>
          {!isGameover && (
            <div>
              {score} : 송편 {heartCount}, 솔잎 {blockCount}
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
        <div
          id="render"
          className="w-[1060px] min-h-[600px] bg-slate-200"
          ref={renderRef}
        />
      )}

      {level === 0 && (
        <div className="w-[1060px] min-h-[600px] bg-slate-200 flex-center flex-col">
          <Text fontSize={"3xl"} colorScheme="facebook">
            {isClear ? "축하합니다!" : "송편 게임 끝!"}
          </Text>
          {isClear && <Tag colorScheme="linkedin">게임 클리어!</Tag>}
          <img src="/img/player.svg" className="animate-spin" />

          {isClear && (
            <Text fontSize={"2xl"} colorScheme="facebook">
              플레이해주셔서 감사합니다 🩷
            </Text>
          )}
          {/* <Text fontSize={"5xl"}>{"level: " + level}</Text> */}
          <Text fontSize={"5xl"}>{"score: " + score}</Text>

          <Text fontSize={"mg"} className="mt-10 animate-pulse">
            게임을 다시 시작하려면 새로고침 해주세요
          </Text>
          <Text fontSize={"mg"} className="mt-5" colorScheme="gray">
            (점수 계산: 송편 = 500점, 솔잎 = 15점)
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
