import { Bodies, GeometryContant } from "@/interface/matter";

export function placeObjectOnePyramid(
  x: number,
  y: number,
  pyramidHeight: number,
  object: GeometryContant
) {
  const [w, h] = [object.size[0], object.size[1]];
  const objects: Bodies[] = [];
  const xOffset = w * 1.5;
  const yOffset = h * 1.2;

  for (let i = 0; i < pyramidHeight; i++) {
    const rowLength = pyramidHeight - i;
    const startX = x - (rowLength - 1) * w * 0.5;

    for (let j = 0; j < rowLength; j++) {
      const posX = startX + j * xOffset;
      const posY = y - i * yOffset;
      objects.push({
        name: object.name,
        posX: posX,
        posY: posY,
        w,
        h,
        type: object.type,
        level: object.level,
      });
    }
  }

  return objects;
}
