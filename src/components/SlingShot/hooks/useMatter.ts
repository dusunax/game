// @ts-ignore
import Matter from "matter-js";
import { MutableRefObject, useEffect, useState } from "react";

import { BIRDS, GROUNDS, LEVEL_BLOCKS } from "../constant/objects";

const Engine = Matter.Engine,
  Render = Matter.Render,
  Runner = Matter.Runner,
  Bodies = Matter.Bodies,
  Composite = Matter.Composite;

export default function UseMatter(
  ref: MutableRefObject<HTMLDivElement | null>
) {
  const [level, setLevel] = useState(1);
  let birdBody: any;
  let slingData: any;

  // ----------------------------------------------------------------
  // useEffect
  // ----------------------------------------------------------------
  useEffect(() => {
    // ref 초기화
    const element = ref.current as HTMLDivElement;
    while (element && element.firstChild) {
      element.removeChild(element.firstChild);
    }
    if (!level) return;

    // setup
    const newWorldObjects = [...GROUNDS, BIRDS[level - 1]];

    const engine = Engine.create();
    Matter.Engine.clear(engine);

    engine.gravity = { x: 0, y: 1, scale: 0.0005 };

    const render = Render.create({
      element: ref.current,
      engine: engine,
      options: {
        wireframes: false,
      },
    });

    const result: any[] = [];

    const print = [...result, ...newWorldObjects].map((b) => {
      let newBody;
      if (b.type === "circle") {
        newBody = Bodies.circle(b.posX, b.posY, b.w, b.option);
      } else {
        newBody = Bodies.rectangle(b.posX, b.posY, b.w, b.h, b.option);
      }

      if (b.name.includes("bird")) {
        birdBody = newBody;
        slingData = setShooter(engine, b.posX, b.posY, newBody);
      }
      return newBody;
    });

    const mouse = Matter.Mouse.create(ref.current);
    const mouseConstraint = Matter.MouseConstraint.create(engine, { mouse });

    let isFire = false;
    Matter.Events.on(mouseConstraint, "enddrag", (e: any) => {
      if (e.body === birdBody) isFire = true;
    });

    Matter.Events.on(engine, "afterUpdate", () => {
      if (isFire && slingData) {
        Composite.remove(engine.world, slingData, true);
        slingData = null;
      }
    });

    Composite.add(engine.world, getLevelBlock(level));
    Composite.add(engine.world, mouseConstraint);
    Composite.add(engine.world, print); // 예전에는 world
    Render.run(render);

    const runner = Runner.create();
    Runner.run(runner, engine);
  }, [level]);

  // ----------------------------------------------------------------
  // 이벤트 핸들러 여기 작성
  // ----------------------------------------------------------------
  const setShooter = (
    engine: any,
    x: number,
    y: number,
    body: any
  ): { sling: any } => {
    const options = {
      pointA: {
        x,
        y,
      },
      bodyB: body,
      stiffness: 0.2,
      length: 20,
    };

    const sling = Matter.Constraint.create(options);
    Composite.add(engine.world, sling);

    return sling;
  };

  const getLevelBlock = (level: number) => {
    return LEVEL_BLOCKS.filter((e) => e.level === level)[0].getBlocks;
  };

  return { level, setLevel };
}
