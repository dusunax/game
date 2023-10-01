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
    option: { isStatic: true },
  },
  {
    name: "ground",
    type: "rectangle",
    level: 1,
    posX: 600,
    posY: 450,
    w: 300,
    h: 10,
    option: { isStatic: true },
  },
];

export const BIRDS: Bodies[] = [
  {
    name: "birdA",
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
    name: "birdB",
    type: "circle",
    level: 1,
    posX: 150,
    posY: 200,
    w: 10,
    h: 10,
  },
  {
    name: "birdC",
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

export const CONSTANTS: GeometryContant[] = [
  { name: "오브젝트1", size: [20, 20], type: "rectangle", level: 1 },
  { name: "오브젝트2", size: [40, 40], type: "rectangle", level: 1 },
  { name: "오브젝트3", size: [50, 50], type: "rectangle", level: 1 },
];
