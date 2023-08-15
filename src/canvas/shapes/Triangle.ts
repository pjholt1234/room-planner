import TrianglePoints from "../TrianglePoints";
import ShapeInterface from "./ShapeInterface";

class Triangle implements ShapeInterface {
    public name = "Triangle";
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
        const x2Change = this.points[1].x - this.points[0].x;
        const y2Change = this.points[1].y - this.points[0].y;

        const x3Change = this.points[2].x - this.points[0].x;
        const y3Change = this.points[2].y - this.points[0].y;

        this.points[0].x = x;
        this.points[0].y = y;

        this.points[1].x = x + x2Change;
        this.points[1].y = y + y2Change;

        this.points[2].x = x + x3Change;
        this.points[2].y = y + y3Change;
    }
}

export default Triangle;