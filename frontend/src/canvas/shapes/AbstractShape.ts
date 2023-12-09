import Point from './point-types/Point';
import findClosestPoint from './shape-helpers/getClosestPoint';
import ShapeInterface from './ShapeInterface';

abstract class AbstractShape implements ShapeInterface {
    public points: Point[];
    public strokeColour: string = 'black';
    protected pivotPointIndex: number | null = null;
    protected initialClickXOffset: number;
    protected initialClickYOffset: number;
    protected fillColour: string = '';

    abstract draw(context: CanvasRenderingContext2D, colour?: string): void;

    abstract isPointInside(point: Point): boolean;

    public setPosition(point: Point): void {
        const xOffset = point.x - this.points[0].x - this.initialClickXOffset;
        const yOffset = point.y - this.points[0].y - this.initialClickYOffset;

        this.points.forEach((point) => {
            point.x += xOffset;
            point.y += yOffset;
        });
    }

    public getPoints() {
        return this.points;
    }

    public resize(point: Point): void {
        if (this.pivotPointIndex === null) return;
        this.points[this.pivotPointIndex] = point;
    }

    public setPivotPoint(point: Point): void {
        this.pivotPointIndex = findClosestPoint(this.points, point);
    }

    public setClickOffsets(point: Point): void {
        this.initialClickXOffset = point.x - this.points[0].x;
        this.initialClickYOffset = point.y - this.points[0].y;
    }

    public setFillColour(colour: string): void {
        this.fillColour = colour;
    }

    public encode() {
        return {
            type: this.constructor.name,
            points: this.points,
            strokeColour: this.strokeColour,
            fillColour: this.fillColour,
            isText: false
        };
    }
}

export default AbstractShape;
