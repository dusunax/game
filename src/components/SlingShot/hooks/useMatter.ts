// @ts-ignore
import Matter from "matter-js";
import { MutableRefObject, useEffect, useState } from "react";

import { BIRDS, GROUNDS, LEVEL_BLOCKS, setTarget } from "../constant/objects";
import { Bodies } from "@/interface/matter";

const Engine = Matter.Engine,
  Render = Matter.Render,
  Runner = Matter.Runner,
  Bodies = Matter.Bodies,
  Composite = Matter.Composite;

export default function UseMatter(
  ref: MutableRefObject<HTMLDivElement | null>
) {
  // const [level, setLevel] = useState(0);
  const [level, setLevel] = useState(1);
  const [life, setLife] = useState(3);
  let isFire = false;

  // ----------------------------------------------------------------
  // useEffect
  // ----------------------------------------------------------------
  useEffect(() => {
    if (!level) return;

    // ref 초기화
    const element = ref.current as HTMLDivElement;
    while (element && element.firstChild) {
      element.removeChild(element.firstChild);
    }

    // setup engine & renderer
    const engine = Engine.create();
    Matter.Engine.clear(engine);

    engine.gravity = { x: 0, y: 1, scale: 0.0005 };

    const render = Render.create({
      element: ref.current,
      engine: engine,
      options: {
        wireframes: false,
        width: 800,
        height: 600,
        showAngleIndicator: true,
      },
    });

    Render.run(render);

    // setup runner
    const runner = Runner.create();
    Runner.run(runner, engine);

    // bodies
    const birdsLeft = new Array(life)
      .fill("")
      .map(() => getBodies(BIRDS[level - 1]));

    const grounds = GROUNDS.map((e) => getBodies(e));
    const sling = Matter.Constraint.create({
      pointA: {
        x: BIRDS[0].posX,
        y: BIRDS[0].posY,
      },
      bodyB: birdsLeft[0],
      stiffness: 0.2,
      length: 20,
    });

    const worldObjects = [
      ...grounds,
      birdsLeft[0],
      sling,
      getLevelBlock(level),
      setTarget(600, 0, level),
    ];

    // mouse interaction
    const mouse = Matter.Mouse.create(ref.current);
    const mouseConstraint = Matter.MouseConstraint.create(engine, { mouse });

    Matter.Events.on(mouseConstraint, "enddrag", (e: any) => {
      birdsLeft.map((bird) => {
        if (!bird) return;

        if (e.body === bird) {
          isFire = true;
        }
      });
    });

    Matter.Events.on(engine, "afterUpdate", () => {
      if (!life || birdsLeft.length === 0) return;
      if (isFire) {
        birdsLeft.shift();
        setLife(birdsLeft.length);

        const newBird = birdsLeft[0];
        if (!newBird) {
          sling.bodyB = null;
          Composite.remove(engine.world, sling);
        } else {
          sling.bodyB = newBird;
          setTimeout(() => {
            Composite.add(engine.world, newBird);
          }, 500);
        }

        isFire = false;
      }
    });

    // composite.add === world.add
    Composite.add(engine.world, worldObjects);
    Composite.add(engine.world, mouseConstraint);
  }, [level]);

  // ----------------------------------------------------------------
  // 이벤트 핸들러 여기 작성
  // ----------------------------------------------------------------
  const getLevelBlock = (level: number) => {
    return LEVEL_BLOCKS.filter((e) => e.level === level)[0].getBlocks;
  };

  function getBodies(b: Bodies) {
    let newBody;

    if (b.type === "circle") {
      newBody = Bodies.circle(b.posX, b.posY, b.w, b.option);
    } else {
      newBody = Bodies.rectangle(b.posX, b.posY, b.w, b.h, b.option);
    }

    return newBody;
  }

  return { level, setLevel, life };
}
