// @ts-ignore
import Matter from "matter-js";
import { Bodies, GeometryContant } from "@/interface/matter";

export const GROUNDS: Bodies[] = [
  {
    name: "globalGround",
    type: "rectangle",
    level: 1,
    posX: 400,
    posY: 600,
    w: 810,
    h: 60,
    option: { isStatic: true, render: { fillStyle: "brown" } },
  },
  {
    name: "ground",
    type: "rectangle",
    level: 1,
    posX: 600,
    posY: 450,
    w: 300,
    h: 10,
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
      frictionAir: 0.001,
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
];

export const LEVEL_BLOCKS = [
  {
    level: 1,
    getBlocks: Matter.Composites.stack(
      500,
      100,
      1,
      3,
      0,
      0,
      function (x: number, y: number) {
        return Matter.Bodies.rectangle(x, y, 20, 100);
      }
    ),
  },
  {
    level: 2,
    getBlocks: Matter.Composites.stack(
      500,
      50,
      10,
      20,
      0,
      0,
      function (x: number, y: number) {
        return Matter.Bodies.rectangle(x, y, 20, 20);
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
        return Matter.Bodies.rectangle(x, y, 20, 20);
      }
    ),
  },
];

export const BLOCK: GeometryContant[] = [
  { name: "block1", size: [20, 20], type: "rectangle", level: 1 },
  { name: "block2", size: [40, 40], type: "rectangle", level: 1 },
  { name: "block3", size: [50, 50], type: "rectangle", level: 1 },
];
