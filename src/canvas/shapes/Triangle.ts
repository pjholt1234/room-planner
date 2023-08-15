import TrianglePoints from "./point-types/TrianglePoints";
import ShapeInterface from "./ShapeInterface";
import findClosestPoint from "./shape-utilities/getClosestPoint";

class Triangle implements ShapeInterface {
    public name = "Triangle";
    private pivotPointIndex: number | null = null;

    constructor(public points : TrianglePoints ) {}

    public draw(context: CanvasRenderingContext2D, colour?: string): void {
        if(!colour) colour = "black";

        context.beginPath();
        context.strokeStyle = colour;
        context.lineWidth = 1;
        context.moveTo(this.points[0].x, this.points[0].y);
        context.lineTo(this.points[1].x, this.points[1].y);
        context.lineTo(this.points[2].x, this.points[2].y);
        context.closePath();
        context.stroke();
    }

    public isPointInside(x: number, y: number): boolean {
        // Calculate the barycentric coordinates
        const denominator = ((this.points[1].y - this.points[2].y) * (this.points[0].x - this.points[2].x)) + ((this.points[2].x - this.points[1].x) * (this.points[0].y - this.points[2].y));
        const alpha = ((this.points[1].y - this.points[2].y) * (x - this.points[2].x) + (this.points[2].x - this.points[1].x) * (y - this.points[2].y)) / denominator;
        const beta = ((this.points[2].y - this.points[0].y) * (x - this.points[2].x) + (this.points[0].x - this.points[2].x) * (y - this.points[2].y)) / denominator;
        const gamma = 1 - alpha - beta;

        // Check if the point lies inside the triangle
        return alpha >= 0 && beta >= 0 && gamma >= 0;
    }

    public setPosition(x: number, y: number) {
        const xOffset = x - this.points[0].x;
        const yOffset = y - this.points[0].y;

        this.points.forEach(point => {
            point.x += xOffset;
            point.y += yOffset;
        });
    }

    public getPoints(): TrianglePoints {
        return this.points;
    }

    public resize(x: number, y: number): void {
        if(this.pivotPointIndex === null) return;
        this.points[this.pivotPointIndex] = { x: x, y: y };
    }

    public setPivotPoint(x: number, y: number): void {
        this.pivotPointIndex = findClosestPoint(this.points, x, y);
    }
}

export default Triangle;