import { Bodies, GeometryContant } from "@/interface/matter";

export const GROUNDS: Bodies[] = [
  {
    name: "globalGround",
    type: "rectangle",
    level: 1,
    x: 400,
    y: 600,
    w: 810,
    h: 60,
    option: { isStatic: true },
  },
  {
    name: "ground",
    type: "rectangle",
    level: 1,
    x: 600,
    y: 400,
    w: 300,
    h: 10,
    option: { isStatic: true },
  },
];

export const BIRDS: Bodies[] = [
  {
    name: "bird",
    type: "circle",
    level: 1,
    x: 100,
    y: 100,
    w: 30,
    h: 30,
    option: { isStatic: true },
  },
];

export const CONSTANTS: GeometryContant[] = [
  { name: "오브젝트1", size: [30, 30], type: "rectangle" },
  { name: "오브젝트2", size: [40, 40], type: "rectangle" },
  { name: "오브젝트3", size: [50, 50], type: "rectangle" },
];
