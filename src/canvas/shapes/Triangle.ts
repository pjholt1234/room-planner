import TrianglePoints from "../TrianglePoints";

class Triangle implements ShapeInterface {
    public name = "Triangle";
    constructor(public points : TrianglePoints ) {}

    public draw(context: CanvasRenderingContext2D, colour?: string): void {
        if(!colour) colour = "black";

        context.beginPath();
        context.strokeStyle = colour;
        context.lineWidth = 1;
        context.moveTo(this.points.x1, this.points.y1);
        context.lineTo(this.points.x2, this.points.y2);
        context.lineTo(this.points.x3, this.points.y3);
        context.closePath();
        context.stroke();
    }

    public isPointInside(x: number, y: number): boolean {
        // Calculate the barycentric coordinates
        const denominator = ((this.points.y2 - this.points.y3) * (this.points.x1 - this.points.x3)) + ((this.points.x3 - this.points.x2) * (this.points.y1 - this.points.y3));
        const alpha = ((this.points.y2 - this.points.y3) * (x - this.points.x3) + (this.points.x3 - this.points.x2) * (y - this.points.y3)) / denominator;
        const beta = ((this.points.y3 - this.points.y1) * (x - this.points.x3) + (this.points.x1 - this.points.x3) * (y - this.points.y3)) / denominator;
        const gamma = 1 - alpha - beta;

        // Check if the point lies inside the triangle
        return alpha >= 0 && beta >= 0 && gamma >= 0;
    }

    public setPosition(x: number, y: number) {
        const x2Change = this.points.x2 - this.points.x1;
        const y2Change = this.points.y2 - this.points.y1;

        const x3Change = this.points.x3 - this.points.x1;
        const y3Change = this.points.y3 - this.points.y1;

        this.points.x1 = x;
        this.points.y1 = y;

        this.points.x2 = x + x2Change;
        this.points.y2 = y + y2Change;

        this.points.x3 = x + x3Change;
        this.points.y3 = y + y3Change;
    }
}

export default Triangle;