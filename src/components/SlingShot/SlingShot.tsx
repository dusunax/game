"use client";
import { Dispatch, SetStateAction, useRef } from "react";
import UseMatter from "./hooks/useMatter";
import { Button, Text } from "@chakra-ui/react";
import { BsHeart, BsHeartFill } from "react-icons/bs";

export default function SlingShot() {
  const renderRef = useRef<HTMLDivElement | null>(null);
  const { level, setLevel, life } = UseMatter(renderRef);

  return (
    <>
      <div className="flex gap-4 my-4">
        <div className="flex items-center gap-2 text-red-500">
          <BsHeartFill />
          {life}
        </div>
        {level === 0 ? (
          <StartButton level={level} setLevel={setLevel} />
        ) : (
          <EndButton level={level} setLevel={setLevel} />
        )}

        {level !== 0 &&
          [1, 2, 3].map((e, idx) => (
            <Button
              key={idx}
              onClick={() => setLevel(e)}
              colorScheme={level === e ? "green" : "gray"}
            >
              {e}
            </Button>
          ))}
      </div>

      <div
        id="render"
        className="w-[800px] min-h-[600px] bg-slate-200"
        ref={renderRef}
      >
        <div className="w-full h-full flex-center flex-col">
          <Text fontSize={"2xl"}>송편 게임</Text>
          <Text fontSize={"xl"}>게임 만드는 중</Text>
        </div>
      </div>
    </>
  );
}

interface ButtonProps {
  level: number;
  setLevel: Dispatch<SetStateAction<number>>;
}

function StartButton({ level, setLevel }: ButtonProps) {
  return (
    <Button
      onClick={() => setLevel(1)}
      colorScheme={level === 0 ? "green" : "gray"}
    >
      게임 시작
    </Button>
  );
}

function EndButton({ level, setLevel }: ButtonProps) {
  return (
    <Button
      onClick={() => setLevel(0)}
      colorScheme={level !== 0 ? "red" : "gray"}
    >
      게임 종료
    </Button>
  );
}
