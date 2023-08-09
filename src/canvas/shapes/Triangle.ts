import TrianglePoints from "../TrianglePoints";

class Triangle implements ShapeInterface {
    public name = "Triangle";
    constructor(public points : TrianglePoints ) {}

    draw(context: CanvasRenderingContext2D): void {
        context.beginPath();
        context.strokeStyle = 'black';
        context.lineWidth = 1;
        context.moveTo(this.points.x1, this.points.y1);
        context.lineTo(this.points.x2, this.points.y2);
        context.lineTo(this.points.x3, this.points.y3);
        context.closePath();
        context.stroke();
    }

    isPointInside(x: number, y: number): boolean {
        return false;
    }
}

export default Triangle;