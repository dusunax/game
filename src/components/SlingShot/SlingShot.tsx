"use client";
import { Dispatch, SetStateAction, useRef } from "react";
import UseMatter from "./hooks/useMatter";
import { Button, Text } from "@chakra-ui/react";
import { BsHeart, BsHeartFill } from "react-icons/bs";

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
    count,
  } = UseMatter(renderRef);

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
          <div>
            {score} : 하트 {count.heart}, 송편 {count.block}
          </div>
        </div>
        <div className="flex gap-4">
          {level === 0 && isGameover ? (
            <StartButton level={level} onClick={gameStart} />
          ) : (
            <EndButton level={level} onClick={gameOver} />
          )}
          {level !== 0 &&
            !isGameover &&
            [1, 2, 3, 4, 5, 6, 7].map((e, idx) => (
              <Button
                key={idx}
                onClick={() => setLevel(e)}
                colorScheme={level === e ? "green" : "gray"}
              >
                {e}
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
          <Text fontSize={"2xl"}>송편 게임</Text>
          <Text fontSize={"xl"}>게임 만드는 중</Text>
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
