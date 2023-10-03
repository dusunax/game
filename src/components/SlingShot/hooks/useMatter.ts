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
  const finalLevel = 7;
  const [level, setLevel] = useState(1);
  // const [level, setLevel] = useState(4);
  const [life, setLife] = useState(fullLife);
  const [isGameover, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0); // 점수 상태 추가
  const [heartCount, setHeartCount] = useState(0);
  const [blockCount, setBlockCount] = useState(0);
  const [isClear, setIsClear] = useState(false);

  // ----------------------------------------------------------------
  // useEffect
  // ----------------------------------------------------------------
  useEffect(() => {
    if (!level || !life) {
      return gameEnd();
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
        background:
          "linear-gradient(rgba(0, 0, 255, 0.5), rgba(255, 255, 255, 1))",
        wireframes: false,
        width: 1060,
        height: 600,
      },
    });

    Render.run(render);

    // setup runner
    const runner = Runner.create();
    Runner.run(runner, engine);

    // bodies
    const birdsLeft = new Array(life).fill("").map(() => getBodies(BIRDS[0]));

    const grounds = GROUNDS.map((e) => getBodies(e));
    const sling = Matter.Constraint.create({
      pointA: {
        x: BIRDS[0]?.posX,
        y: BIRDS[0]?.posY,
      },
      bodyB: birdsLeft[0] || null,
      stiffness: 0.2,
      length: 10,
    });

    const groundHill = Matter.Composite.create();
    const tempBodies = [];
    tempBodies.push(
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
        {
          label: "ground",
          isStatic: true,
          render: { fillStyle: "#ffdddd" },
        }
      )
    );
    Matter.Composite.add(groundHill, tempBodies);

    const target = setTarget(600, 0, level);
    const object = getLevelBlock(level);

    const worldObjects = [
      ...grounds,
      birdsLeft[0],
      sling,
      object,
      target,
      groundHill,
    ];

    // collision & detection
    const detector = Matter.Detector.create();
    Matter.Detector.clear(detector);
    Matter.Detector.setBodies(detector, [
      ...grounds,
      ...groundHill.bodies,
      ...object.bodies,
      target,
    ]);

    // mouse interaction
    const mouse = Matter.Mouse.create(ref.current);
    const mouseConstraint = Matter.MouseConstraint.create(engine, { mouse });

    Matter.Events.on(mouseConstraint, "enddrag", (e: any) => {
      birdsLeft.map((bird) => {
        if (e.body === bird) {
          isFire = true;
        }
      });
    });

    Matter.Events.on(engine, "afterUpdate", () => {
      if (birdsLeft.length === 0 && life === -1) {
        setTimeout(() => {
          console.log(birdsLeft);
          if (birdsLeft) return;

          return gameEnd();
        }, 2000);
      }

      const collisions = Matter.Detector.collisions(detector); // 충돌 감지 반복

      collisions.forEach((collision: any) => {
        const { bodyA, bodyB } = collision;

        if (
          (bodyA.label === "ground" && bodyB.label === "object") ||
          (bodyA.label === "object" && bodyB.label === "ground")
        ) {
          // 점수를 1 증가시키고 화면에 업데이트
          setScore((prevScore) => prevScore + 15);
          setBlockCount((prev) => prev + 1);

          const body = (bodyA.label = "object" ? bodyA : bodyB);

          Composite.remove(engine.world, body);
        }

        if (
          (bodyA.label === "ground" && bodyB.label === "target") ||
          (bodyA.label === "target" && bodyB.label === "ground")
        ) {
          setScore((prevScore) => {
            return prevScore + 500;
          });
          setHeartCount((prev) => prev + 1);

          Composite.remove(engine.world, target);
          Matter.Detector.clear(detector);

          if (level < finalLevel) {
            setTimeout(() => {
              setLevel(level + 1);
              life === 0 ? setLife(1) : setLife(birdsLeft.length + 1);
            }, 1000);
          } else {
            setScore((prevScore) => {
              return prevScore + life * 300;
            });
            gameWin();
          }
        }
      });

      if (isFire) {
        const oldBird = birdsLeft.shift();
        setLife(birdsLeft.length);

        const newBird = birdsLeft[0];
        if (!newBird) {
          sling.bodyB = null;
        } else {
          sling.bodyB = newBird;

          setTimeout(() => {
            Composite.add(engine.world, newBird);
          }, 500);
        }

        setTimeout(() => {
          Composite.remove(engine.world, oldBird);
        }, 1000);

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

    if (b.name.includes("bird")) {
      newBody = Bodies.circle(b.posX, b.posY, b.w, {
        ...b.option,
        render: {
          sprite: {
            texture: "./img/player.svg",
          },
        },
      });
    } else if (b.type === "circle") {
      newBody = Bodies.circle(b.posX, b.posY, b.w, b.option);
    } else {
      newBody = Bodies.rectangle(b.posX, b.posY, b.w, b.h, b.option);
    }

    return newBody;
  }

  function gameStart() {
    setIsGameOver(false);
    setLife(fullLife);
    setLevel(1);
  }

  function gameEnd() {
    setIsGameOver(true);
    setLife(0);
    setLevel(0);
  }

  function gameWin() {
    setIsClear(true);

    setTimeout(() => {
      gameEnd();
    }, 100);
  }

  return {
    level,
    setLevel,
    life,
    isGameover,
    gameEnd,
    gameStart,
    score,
    heartCount,
    blockCount,
    finalLevel,
    isClear,
  };
}
