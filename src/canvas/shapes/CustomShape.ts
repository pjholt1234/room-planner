import Point from './point-types/Point';
import AbstractShape from './AbstractShape';

class CustomShape extends AbstractShape {
    public name: string = 'CustomShape';
    public points: Point[];

    constructor(points: Point[]) {
        super();
        this.points = points;
    }

    public draw(context: CanvasRenderingContext2D, colour?: string): void {
        if (!colour) colour = this.strokeColour;
        //this needs a loop
        context.beginPath();
        context.strokeStyle = colour;
        context.lineWidth = 1;
        context.moveTo(this.points[0].x, this.points[0].y);

        for (let i = 1; i < this.points.length; i++) {
            context.lineTo(this.points[i].x, this.points[i].y);
        }

        context.stroke();
        context.closePath();

        if (this.fillColour !== '') {
            context.fillStyle = this.fillColour;
            context.fill();
        }
    }

    public getPoints(): any {
        return this.points;
    }

    public isPointInside(point: Point): boolean {
        let crossings = 0;

        for (let i = 0; i < this.points.length; i++) {
            const currentPoint = this.points[i];
            const nextPoint = this.points[(i + 1) % this.points.length];

            if (
                (currentPoint.y <= point.y && point.y < nextPoint.y) ||
                (nextPoint.y <= point.y && point.y < currentPoint.y)
            ) {
                const intersectionX =
                    ((point.y - currentPoint.y) /
                        (nextPoint.y - currentPoint.y)) *
                        (nextPoint.x - currentPoint.x) +
                    currentPoint.x;

                if (point.x < intersectionX) {
                    crossings++;
                }
            }
        }

        return crossings % 2 === 1;
    }
}

export default CustomShape;
