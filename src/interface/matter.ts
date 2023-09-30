type BodiesType = "rectangle" | "circle";

export interface Bodies {
  name: string;
  type: BodiesType;
  x: number;
  y: number;
  w: number;
  h: number;
  option?: Record<string, unknown>;
  level: number;
}

export interface GeometryContant {
  name: string;
  size: number[];
  type: BodiesType;
}
