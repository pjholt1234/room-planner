interface ShapeInterface {
  draw(context: CanvasRenderingContext2D): void;
  isPointInside(x: number, y: number): boolean;
};