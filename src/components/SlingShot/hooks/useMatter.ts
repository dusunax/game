// @ts-ignore
import Matter from "matter-js";
import { MutableRefObject, useEffect } from "react";

import { placeObjectOnePyramid } from "@/utils/matter/placeObject";
import { BIRDS, CONSTANTS, GROUNDS } from "../constant/objects";

export default function UseMatter(
  ref: MutableRefObject<HTMLDivElement | null>
) {
  const Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;

  const level = 1;
  const worldObjects = [...GROUNDS, BIRDS[level - 1]];

  // ----------------------------------------------------------------
  // useEffect
  // ----------------------------------------------------------------
  useEffect(() => {
    const len = ref.current?.childNodes.length || 0;

    if (len < 1) {
      const engine = Engine.create();
      engine.gravity = { x: 0, y: 1, scale: 0.0005 };

      const render = Render.create({
        element: ref.current,
        engine: engine,
        options: {
          height: 600,
          width: 800,
          wireframes: false,
        },
      });

      const result = placeObjectOnePyramid(600, 390, 5, CONSTANTS[level - 1]);

      const print = [...result, ...worldObjects].map((b) => {
        if (b.type === "circle") return Bodies.circle(b.x, b.y, b.w, b.option);

        return Bodies.rectangle(b.x, b.y, b.w, b.h, b.option);
      });

      Composite.add(engine.world, print); // 예전에는 world
      Render.run(render);

      const runner = Runner.create();
      Runner.run(runner, engine);
      // Engine.update(engine);

      // console
      // console.log(print);
      // console.log(Matter);
      // console.log(render);
      // console.log(result, bodies, engine);
    }
  }, [worldObjects]);

  // ----------------------------------------------------------------
  // 이벤트 핸들러 여기 작성
  // ----------------------------------------------------------------

  return {};
}

function createRenderObject() {}
