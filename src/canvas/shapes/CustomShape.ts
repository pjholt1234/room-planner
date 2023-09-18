import Point from './point-types/Point';
import AbstractShape from './AbstractShape';

class CustomShape extends AbstractShape {
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

    //@ts-ignore
    public isPointInside(point: Point): boolean {
        //todo

        return false;
    }
}

export default CustomShape;
