import RectanglePoints from './point-types/RectanglePoints';
import Point from './point-types/Point';
import AbstractShape from './AbstractShape';

class Rectangle extends AbstractShape {
    public name = 'Rectangle';
    public points: RectanglePoints;

    constructor(points: RectanglePoints) {
        super();
        this.points = points;
    }

    public draw(context: CanvasRenderingContext2D, colour?: string) {
        if (!colour) colour = 'black';

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

    public isPointInside(point: Point): boolean {
        const xCheck = point.x > this.points[0].x && point.x < this.points[3].x;
        const yCheck = point.y > this.points[0].y && point.y < this.points[3].y;

        return xCheck && yCheck;
    }
}

export default Rectangle;
