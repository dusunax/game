type BodiesType = "rectangle" | "circle";

export interface Bodies {
  name: string;
  type: BodiesType;
  posX: number;
  posY: number;
  w: number;
  h: number;
  option?: Record<string, unknown>;
  level: number;
}

export interface GeometryContant {
  name: string;
  size?: number[];
  radius?: number;
  type: BodiesType;
  level: number;
  point: number;
}
