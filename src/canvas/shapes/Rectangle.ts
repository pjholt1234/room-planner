import RectanglePoints from "./point-types/RectanglePoints";
import ShapeInterface from "./ShapeInterface";
import findClosestPoint from "./shape-utilities/getClosestPoint";

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

    public isPointInside(x: number, y: number): boolean {
        const xCheck =  x > this.points[0].x && x < this.points[3].x;
        const yCheck = y > this.points[0].y && y < this.points[3].y;

        return xCheck && yCheck;
    }

    public setPosition(x: number, y: number) {
        const xOffset = x - this.points[0].x;
        const yOffset = y - this.points[0].y;

        this.points.forEach(point => {
            point.x += xOffset;
            point.y += yOffset;
        });
    }

    public getPoints(): RectanglePoints {
        return this.points;
    }

    public resize(x: number, y: number): void {


        if(this.pivotPointIndex === null) return;

        this.points[this.pivotPointIndex] = { x: x, y: y };

        console.log(this.points);
    }

    public setPivotPoint(x: number, y: number): void {
        this.pivotPointIndex = findClosestPoint(this.points, x, y);
    }
}

export default Rectangle;