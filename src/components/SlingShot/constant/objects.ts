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
  if (level === 7) {
    return Matter.Bodies.circle(750, y, TARGETS[0].radius, {
      label: "target",
      render: {
        sprite: {
          texture: "./img/target1.svg",
        },
      },
    });
  }

  return Matter.Bodies.circle(x, y, TARGETS[0].radius, {
    label: "target",
    render: {
      sprite: {
        texture: `./img/target${level}.svg`,
      },
    },
  });
};

function _createStand(x: number, y: number, h: number) {
  const opt = {
    density: 0.0025,
  };

  const bodies = [
    Matter.Bodies.rectangle(x, y, 100, 30, {
      ...opt,
      render: {
        sprite: {
          texture: `./img/plate-sm-leaves.svg`,
        },
      },
    }),
    Matter.Bodies.rectangle(x, y, 20, h, {
      ...opt,
      render: {
        sprite: {
          texture: `./img/column.svg`,
        },
      },
    }),
  ];

  return bodies;
}

function _createObject(x: number, y: number) {
  const opt = { density: 0.0025 };

  const bodies = [
    Matter.Bodies.circle(x, y - 50, 20, {
      ...opt,
      label: "object",
      render: {
        sprite: {
          texture: "./img/leaves1.svg",
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
    w: 10010,
    h: 60,
    option: {
      label: "ground",
      isStatic: true,
      render: {
        fillStyle: "#ffdddd",
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
    option: {
      isStatic: true,
      render: {
        sprite: {
          texture: `./img/plate-lg.svg`,
        },
      },
    },
  },
];

export const BIRDS: Bodies[] = [
  {
    name: "bird1",
    type: "circle",
    level: 1,
    posX: 150,
    posY: 200,
    w: 30,
    h: 30,
    option: {
      label: "bird",
      density: 0.7,
      friction: 0.05,
      frictionAir: 0.05,
    },
  },
];

export const LEVEL_BLOCKS = [
  {
    level: 1,
    getBlocks: (function () {
      const newComposite = Matter.Composite.create();

      const bodies = [];
      bodies.push(..._createStand(600, 200, 90));
      bodies.push(..._createObject(550, 400));
      bodies.push(..._createObject(650, 400));

      Matter.Composite.add(newComposite, bodies);
      return newComposite;
    })(),
  },
  {
    level: 2,
    getBlocks: Matter.Composites.stack(
      500,
      100,
      1,
      10,
      0,
      0,
      function (x: number, y: number) {
        return Matter.Bodies.rectangle(x, y, 20, 20, {
          label: "object",
          render: {
            sprite: {
              texture: "./img/leaves1.svg",
            },
          },
        });
      }
    ),
  },
  {
    level: 3,
    getBlocks: Matter.Composites.stack(
      500,
      50,
      3,
      15,
      0,
      0,
      function (x: number, y: number) {
        return Matter.Bodies.rectangle(x, y, 20, 20, {
          label: "object",
          render: {
            sprite: {
              texture: "./img/leaves1.svg",
            },
          },
        });
      }
    ),
  },
  {
    level: 4,
    getBlocks: Matter.Composites.pyramid(
      500,
      200,
      10,
      6,
      0,
      0,
      function (x: number, y: number) {
        return Matter.Bodies.rectangle(x, y, 20, 20, {
          label: "object",
          stiffness: 0.2,
          render: {
            sprite: {
              texture: "./img/leaves1.svg",
            },
          },
        });
      }
    ),
  },
  {
    level: 5,
    getBlocks: (function () {
      const newComposite = Matter.Composite.create();

      const bodies = [];
      bodies.push(..._createStand(600, 200, 50));
      bodies.push(..._createStand(400, 400, 50));
      bodies.push(..._createStand(750, 500, 50));

      bodies.push(..._createObject(400, 400));
      bodies.push(..._createObject(750, 500));

      Matter.Composite.add(newComposite, bodies);
      return newComposite;
    })(),
  },
  {
    level: 6,
    getBlocks: Matter.Composites.stack(
      500,
      50,
      4,
      15,
      0,
      0,
      function (x: number, y: number) {
        return Matter.Bodies.rectangle(x, y, 20, 20, {
          label: "object",
          density: 1,
          stiffness: 1,
          render: {
            sprite: {
              texture: "./img/leaves1.svg",
            },
          },
        });
      }
    ),
  },
  {
    level: 7,
    getBlocks: (function () {
      const newComposite = Matter.Composite.create();

      const bodies = [];
      bodies.push(..._createStand(750, 500, 50));

      Matter.Composite.add(newComposite, bodies);
      return newComposite;
    })(),
  },
];
