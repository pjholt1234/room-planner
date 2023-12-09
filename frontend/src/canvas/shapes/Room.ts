import CustomShape from '../shapes/CustomShape';
import Point from '../shapes/point-types/Point';

class Room extends CustomShape {
    public name: string = 'room';

    constructor(points: Point[]) {
        super(points);
    }

    public draw(context: CanvasRenderingContext2D, colour?: string): void {
        if (!colour) colour = this.strokeColour;

        context.beginPath();
        context.strokeStyle = colour;

        context.lineWidth = 1;
        context.moveTo(this.points[0].x, this.points[0].y);

        for (let i = 1; i < this.points.length; i++) {
            context.lineTo(this.points[i].x, this.points[i].y);
        }

        context.stroke();
        context.closePath();
        context.fillStyle = 'white';
        context.fill();

        if (this.fillColour !== '') {
            context.fillStyle = this.fillColour;
            context.fill();
        }
    }
}

export default Room;
