import RectanglePoints from "./point-types/RectanglePoints";
import ShapeInterface from "./ShapeInterface";
import findClosestPoint from "./shape-utilities/getClosestPoint";
import Point from "./point-types/Point";

class Rectangle implements ShapeInterface {
    public name = "Rectangle";
    private pivotPointIndex: number | null = null;
    constructor(public points : RectanglePoints ) {}

    public draw(context: CanvasRenderingContext2D, colour?: string) {
        if(!colour) colour = "black";

        context.beginPath();
        context.strokeStyle = colour;
        context.lineWidth = 1;
        context.moveTo(this.points[0].x, this.points[0].y);
        context.lineTo(this.points[1].x, this.points[1].y);
        context.lineTo(this.points[3].x, this.points[3].y);
        context.lineTo(this.points[2].x, this.points[2].y);
        context.lineTo(this.points[0].x, this.points[0].y);
        context.stroke();
        context.closePath();
    }

    public isPointInside(point: Point): boolean {
        const xCheck =  point.x > this.points[0].x && point.x < this.points[3].x;
        const yCheck = point.y > this.points[0].y && point.y < this.points[3].y;

        return xCheck && yCheck;
    }

    public setPosition(point: Point): void {
        const xOffset = point.x - this.points[0].x;
        const yOffset = point.y - this.points[0].y;

        this.points.forEach(point => {
            point.x += xOffset;
            point.y += yOffset;
        });
    }

    public getPoints(): RectanglePoints {
        return this.points;
    }

    public resize(point: Point): void {
        if(this.pivotPointIndex === null) return;
        this.points[this.pivotPointIndex] = point;
    }

    public setPivotPoint(point: Point): void {
        this.pivotPointIndex = findClosestPoint(this.points, point);
    }
}

export default Rectangle;