interface ShapeInterface {
  draw(context: CanvasRenderingContext2D, colour?: string): void;
  isPointInside(x: number, y: number): boolean;
  setPosition(x: number, y: number): void;
  getPoints(): any;
  resize(x: number, y: number): void;
  setPivotPoint(x: number, y: number): void;
}

export default ShapeInterface;