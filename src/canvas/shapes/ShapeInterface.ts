import Point from './point-types/Point';

interface ShapeInterface {
    draw(context: CanvasRenderingContext2D, colour?: string): void;

    isPointInside(point: Point): boolean;

    setPosition(point: Point): void;

    getPoints(): any;

    resize(point: Point): void;

    setPivotPoint(point: Point): void;
}

export default ShapeInterface;
