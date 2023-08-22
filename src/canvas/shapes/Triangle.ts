import Point from './point-types/Point';
import AbstractShape from './AbstractShape';

class Triangle extends AbstractShape {
    public name = 'Triangle';
    public points: Point[];

    constructor(points: Point[]) {
        super();
        this.points = points;
    }

    public draw(context: CanvasRenderingContext2D, colour?: string): void {
        if (!colour) colour = 'black';

        context.beginPath();
        context.strokeStyle = colour;
        context.lineWidth = 1;
        context.moveTo(this.points[0].x, this.points[0].y);
        context.lineTo(this.points[1].x, this.points[1].y);
        context.lineTo(this.points[2].x, this.points[2].y);
        context.closePath();
        context.stroke();

        if (this.fillColour !== '') {
            context.fillStyle = this.fillColour;
            context.fill();
        }
    }

    public isPointInside(point: Point): boolean {
        // Calculate the barycentric coordinates
        const denominator =
            (this.points[1].y - this.points[2].y) *
                (this.points[0].x - this.points[2].x) +
            (this.points[2].x - this.points[1].x) *
                (this.points[0].y - this.points[2].y);
        const alpha =
            ((this.points[1].y - this.points[2].y) *
                (point.x - this.points[2].x) +
                (this.points[2].x - this.points[1].x) *
                    (point.y - this.points[2].y)) /
            denominator;
        const beta =
            ((this.points[2].y - this.points[0].y) *
                (point.x - this.points[2].x) +
                (this.points[0].x - this.points[2].x) *
                    (point.y - this.points[2].y)) /
            denominator;
        const gamma = 1 - alpha - beta;

        // Check if the point lies inside the triangle
        return alpha >= 0 && beta >= 0 && gamma >= 0;
    }
}

export default Triangle;
