// @ts-ignore
import Matter from "matter-js";
import { Bodies, GeometryContant } from "@/interface/matter";

export const TARGETS: GeometryContant[] = [
  { name: "target1", radius: 20, type: "circle", level: 1, point: 500 },
  { name: "target2", radius: 10, type: "circle", level: 2, point: 500 },
];

export const BLOCK: GeometryContant[] = [
  { name: "block1", size: [20, 20], type: "rectangle", level: 1, point: 25 },
  { name: "block2", size: [40, 40], type: "rectangle", level: 1, point: 25 },
  { name: "block3", size: [50, 50], type: "rectangle", level: 1, point: 25 },
];

export const setTarget = function (x: number, y: number, level: number) {
  return Matter.Bodies.circle(x, y, TARGETS[0].radius, {
    render: {
      sprite: {
        texture: "./img/icons8-love-circled-94.png",
      },
    },
  });
};

function _createStand(x: number, y: number, h: number) {
  const opt = { density: 0.0025 };

  const bodies = [
    Matter.Bodies.rectangle(x, y, 100, 30, opt),
    Matter.Bodies.rectangle(x, y, 20, h, opt),
    Matter.Bodies.circle(x, y - 50, 20, {
      ...opt,
      render: {
        sprite: {
          texture: "./img/bird2.svg",
        },
      },
    }),
  ];

  return bodies;
}

export const GROUNDS: Bodies[] = [
  {
    name: "globalGround",
    type: "rectangle",
    level: 1,
    posX: 400,
    posY: 600,
    w: 810,
    h: 60,
    option: {
      isStatic: true,
      render: {
        fillStyle: "#ff00ff",
      },
    },
  },
  {
    name: "ground",
    type: "rectangle",
    level: 1,
    posX: 600,
    posY: 450,
    w: 200,
    h: 20,
    option: { isStatic: true, render: { fillStyle: "brown" } },
  },
];

export const BIRDS: Bodies[] = [
  {
    name: "bird1",
    type: "circle",
    level: 1,
    posX: 150,
    posY: 200,
    w: 20,
    h: 20,
    option: {
      density: 0.2,
    },
  },
  {
    name: "bird2",
    type: "circle",
    level: 1,
    posX: 150,
    posY: 200,
    w: 10,
    h: 10,
  },
  {
    name: "bird3",
    type: "circle",
    level: 1,
    posX: 150,
    posY: 200,
    w: 40,
    h: 40,
    option: {
      density: 1,
      frictionAir: 0.05,
    },
  },
  {
    name: "bird4",
    type: "circle",
    level: 1,
    posX: 150,
    posY: 200,
    w: 40,
    h: 40,
    option: {
      density: 1,
      frictionAir: 0.05,
    },
  },
];

export const LEVEL_BLOCKS = [
  {
    level: 1,
    getBlocks: Matter.Composites.stack(
      500,
      100,
      1,
      10,
      0,
      0,
      function (x: number, y: number) {
        return Matter.Bodies.rectangle(x, y, 20, 20, {
          render: {
            sprite: {
              texture: "./img/bird2.svg",
            },
          },
        });
      }
    ),
  },
  {
    level: 2,
    getBlocks: Matter.Composites.stack(
      500,
      50,
      4,
      15,
      0,
      0,
      function (x: number, y: number) {
        return Matter.Bodies.rectangle(x, y, 20, 20, {
          render: {
            sprite: {
              texture: "./img/bird2.svg",
            },
          },
        });
      }
    ),
  },
  {
    level: 3,
    getBlocks: Matter.Composites.pyramid(
      500,
      200,
      10,
      6,
      0,
      0,
      function (x: number, y: number) {
        return Matter.Bodies.rectangle(x, y, 20, 20, {
          render: {
            sprite: {
              texture: "./img/bird2.svg",
            },
          },
        });
      }
    ),
  },
  {
    level: 4,
    getBlocks: (function () {
      const newComposite = Matter.Composite.create();

      const bodies = [];
      bodies.push(..._createStand(600, 200, 50));
      bodies.push(..._createStand(400, 400, 50));
      bodies.push(..._createStand(750, 500, 50));

      Matter.Composite.add(newComposite, bodies);
      return newComposite;
    })(),
  },
];
