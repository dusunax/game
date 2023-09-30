"use client";
import { useRef } from "react";
import UseMatter from "./hooks/useMatter";

export default function SlingShot() {
  const renderRef = useRef<HTMLDivElement | null>(null);
  const {} = UseMatter(renderRef);

  return <div id="render" ref={renderRef} />;
}
