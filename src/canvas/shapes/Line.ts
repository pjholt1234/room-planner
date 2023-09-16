import Point from './point-types/Point';
import AbstractShape from './AbstractShape';

class Line extends AbstractShape {
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
        context.moveTo(this.points[0].x, this.points[0].y);
        context.lineTo(this.points[1].x, this.points[1].y);
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

    //@ts-ignore
    public isPointInside(point: Point): boolean {
        //todo

        return false;
    }
}

export default Line;
