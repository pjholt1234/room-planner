import Point from './point-types/Point';
import AbstractShape from './AbstractShape';

class Circle extends AbstractShape {
    public points: Point[];

    constructor(points: Point[]) {
        super();
        this.points = points;
    }

    public draw(context: CanvasRenderingContext2D, colour?: string): void {
        if (!colour) colour = this.strokeColour;

        context.beginPath();
        context.strokeStyle = colour;
        context.lineWidth = 1;
        const center = this.calculateCenter();
        const radius = this.calculateRadius();
        context.arc(center.x, center.y, radius, 0, 2 * Math.PI);
        context.stroke();

        if (this.fillColour !== '') {
            context.fillStyle = this.fillColour;
            context.fill();
        }
    }

    public getPoints(): any {
        return this.points;
    }

    public isPointInside(point: Point): boolean {
        const center = this.calculateCenter();
        const distance = Math.sqrt(
            (point.x - center.x) ** 2 + (point.y - center.y) ** 2
        );

        return distance <= this.calculateRadius();
    }

    private calculateRadius(): number {
        return (
            Math.sqrt(
                (this.points[1].x - this.points[0].x) ** 2 +
                    (this.points[1].y - this.points[0].y) ** 2
            ) / 2
        );
    }

    private calculateCenter(): Point {
        return {
            x: (this.points[0].x + this.points[1].x) / 2,
            y: (this.points[0].y + this.points[1].y) / 2
        };
    }
}

export default Circle;
