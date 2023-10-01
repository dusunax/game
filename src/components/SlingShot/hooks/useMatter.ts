// @ts-ignore
import Matter from "matter-js";
import { MutableRefObject, useEffect } from "react";

import { BIRDS, GROUNDS } from "../constant/objects";

const Engine = Matter.Engine,
  Render = Matter.Render,
  Runner = Matter.Runner,
  Bodies = Matter.Bodies,
  Composite = Matter.Composite;

export default function UseMatter(
  ref: MutableRefObject<HTMLDivElement | null>
) {
  const level = 1;
  let birdBody: any;
  let slingData: any;
  const worldObjects = [...GROUNDS, BIRDS[0]];

  // ----------------------------------------------------------------
  // useEffect
  // ----------------------------------------------------------------
  useEffect(() => {
    const len = ref.current?.childNodes.length || 0;
    if (len > 0) return;

    // setup
    const engine = Engine.create();
    engine.gravity = { x: 0, y: 1, scale: 0.0005 };

    const render = Render.create({
      element: ref.current,
      engine: engine,
      options: {
        wireframes: false,
      },
    });

    const result: any[] = [];

    const print = [...result, ...worldObjects].map((b) => {
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

    // 피라미드
    // let composite = Matter.Composites.pyramid(
    //   500,
    //   200,
    //   10,
    //   6,
    //   0,
    //   0,
    //   function (x: number, y: number) {
    //     return Matter.Bodies.rectangle(x, y, 20, 20);
    //   }
    // );

    // 젠가
    let composite = Matter.Composites.stack(
      500,
      50,
      10,
      20,
      0,
      0,
      function (x: number, y: number) {
        return Matter.Bodies.rectangle(x, y, 20, 20);
      }
    );

    // 세로 스택
    // let composite = Matter.Composites.stack(
    //   500,
    //   100,
    //   1,
    //   3,
    //   0,
    //   0,
    //   function (x: number, y: number) {
    //     return Matter.Bodies.rectangle(x, y, 20, 100);
    //   }
    // );

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

    Composite.add(engine.world, composite);
    Composite.add(engine.world, mouseConstraint);
    Composite.add(engine.world, print); // 예전에는 world
    Render.run(render);

    const runner = Runner.create();
    Runner.run(runner, engine);
  }, []);

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

  return {};
}
