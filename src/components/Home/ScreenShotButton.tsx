import { Button, useToast } from "@chakra-ui/react";
import html2canvas from "html2canvas";
import { useState } from "react";

export default function ScreenShotButton() {
  const [isShared, setIsShared] = useState(false);
  const toast = useToast();
  const bodyEl = document.querySelector("body") as HTMLElement;

  const saveScreenshot = () => {
    if (!bodyEl) return;

    html2canvas(bodyEl).then((canvas) => {
      const link = document.createElement("a");
      document.body.appendChild(link);
      link.href = canvas.toDataURL("image/png");
      link.download = "game-result.png";
      link.click();
      document.body.removeChild(link);
    });

    // 토스트 메시지 표시
    toast({
      title: "게임 결과를 다운로드 했습니다.",
      status: "success",
      duration: 3000, // 표시 시간 (밀리초)
      isClosable: true,
      position: "top",
    });

    setIsShared(true);
  };

  return (
    <div className="flex gap-2 justify-center">
      <Button colorScheme="linkedin" onClick={saveScreenshot}>
        {isShared ? "다운로드 완료" : "스크린샷 저장하기"}
      </Button>
    </div>
  );
}
