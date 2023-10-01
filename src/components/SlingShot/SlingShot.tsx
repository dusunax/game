"use client";
import { Dispatch, SetStateAction, useRef } from "react";
import UseMatter from "./hooks/useMatter";
import { Button } from "@chakra-ui/react";

export default function SlingShot() {
  const renderRef = useRef<HTMLDivElement | null>(null);
  const { level, setLevel } = UseMatter(renderRef);

  return (
    <>
      <div className="flex gap-4 my-4">
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

      <div id="render" className="min-h-[600px]" ref={renderRef} />
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
