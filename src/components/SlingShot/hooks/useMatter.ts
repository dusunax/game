// @ts-ignore
import Matter from "matter-js";
import { MutableRefObject, useEffect, useState } from "react";

import { BIRDS, GROUNDS, LEVEL_BLOCKS, setTarget } from "../constant/objects";
import { type Bodies as BodiesType } from "@/interface/matter";

const Engine = Matter.Engine,
  Render = Matter.Render,
  Runner = Matter.Runner,
  Bodies = Matter.Bodies,
  Composite = Matter.Composite;

export default function UseMatter(
  ref: MutableRefObject<HTMLDivElement | null>
) {
  let isFire = false;
  const fullLife = 3;
  // const [level, setLevel] = useState(0);
  const [level, setLevel] = useState(4);
  const [life, setLife] = useState(fullLife);
  const [isGameover, setIsGameOver] = useState(false);

  // ----------------------------------------------------------------
  // useEffect
  // ----------------------------------------------------------------
  useEffect(() => {
    if (!level || !life) {
      return gameOver();
    }

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
        x: BIRDS[0]?.posX,
        y: BIRDS[0]?.posY,
      },
      bodyB: birdsLeft[0] || null,
      stiffness: 0.2,
      length: 20,
    });

    const newComposite = Matter.Composite.create();
    const bodies = [];
    bodies.push(
      Matter.Bodies.fromVertices(
        200,
        550,
        [
          { x: 0, y: 0 },
          { x: 0, y: -50 },
          { x: 500, y: -50 },
          { x: 550, y: 0 },
          { x: 600, y: 0 },
        ],
        { isStatic: true, render: { fillStyle: "red" } }
      )
    );
    Matter.Composite.add(newComposite, bodies);

    const worldObjects = [
      ...grounds,
      birdsLeft[0],
      sling,
      getLevelBlock(level),
      setTarget(600, 0, level),
      newComposite,
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
      if (!life || birdsLeft.length === 0) {
        return gameOver();
      }

      if (isFire) {
        birdsLeft.shift();
        setLife(birdsLeft.length);

        const newBird = birdsLeft[0];
        if (!newBird) {
          sling.bodyB = null;
          // Composite.remove(engine.world, sling);
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

  function getBodies(b: BodiesType) {
    let newBody;

    if (b.type === "circle") {
      newBody = Bodies.circle(b.posX, b.posY, b.w, b.option);
    } else {
      newBody = Bodies.rectangle(b.posX, b.posY, b.w, b.h, b.option);
    }

    return newBody;
  }

  function gameOver() {
    setIsGameOver(true);
    setLife(0);
    setLevel(0);
  }

  function gameStart() {
    setIsGameOver(false);
    setLife(fullLife);
    setLevel(1);
  }

  return { level, setLevel, life, isGameover, gameOver, gameStart };
}
