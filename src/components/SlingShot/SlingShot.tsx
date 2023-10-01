"use client";
import { useRef } from "react";
import UseMatter from "./hooks/useMatter";
import { Button } from "@chakra-ui/react";

export default function SlingShot() {
  const renderRef = useRef<HTMLDivElement | null>(null);
  const { level, setLevel } = UseMatter(renderRef);

  return (
    <>
      <div className="flex gap-4 my-4">
        {[1, 2, 3].map((e, idx) => (
          <Button
            key={idx}
            onClick={() => setLevel(e)}
            colorScheme={level === e ? "green" : "gray"}
          >
            {e}
          </Button>
        ))}
      </div>

      <div id="render" ref={renderRef} />
    </>
  );
}
