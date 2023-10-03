"use client";
import { Button, useToast } from "@chakra-ui/react";
import { useState } from "react";

export default function LinkCopyButton({ size = "lg" }: { size?: string }) {
  const [isShared, setIsShared] = useState(false);
  const toast = useToast();

  const linkCopy = () => {
    const currentURL = window.location.href;
    const shareableURL = encodeURIComponent(currentURL);

    // 클립보드에 복사하기
    const textArea = document.createElement("textarea");
    textArea.value = currentURL;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);

    setIsShared(true);

    // 토스트 메시지 표시
    toast({
      title: "링크가 클립보드에 복사되었습니다.",
      status: "success",
      duration: 3000, // 표시 시간 (밀리초)
      isClosable: true,
      position: "top",
    });
  };

  return (
    <>
      <Button
        size={size}
        colorScheme={isShared ? "twitter" : "linkedin"}
        onClick={linkCopy}
        rounded={"xl"}
      >
        {isShared ? "링크 복사 완료!" : "링크 공유하기 🩷"}
      </Button>
    </>
  );
}
