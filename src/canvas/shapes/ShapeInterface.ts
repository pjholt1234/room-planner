interface ShapeInterface {
  draw(context: CanvasRenderingContext2D, colour?: string): void;
  isPointInside(x: number, y: number): boolean;
  setPosition(x: number, y: number): void;
  getPoints(): any;
  resize(clickX: number, clickY: number, x: number, y: number): void;

}

export default ShapeInterface;