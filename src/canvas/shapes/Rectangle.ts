import RectanglePoints from "./point-types/RectanglePoints";
import ShapeInterface from "./ShapeInterface";

class Rectangle implements ShapeInterface {
    public name = "Rectangle";
    constructor(public points : RectanglePoints ) {}

    public draw(context: CanvasRenderingContext2D, colour?: string) {
        if(!colour) colour = "black";

        context.beginPath();
        context.strokeStyle = colour;
        context.lineWidth = 1;
        context.rect(
            this.points[0].x,
            this.points[0].y,
            this.points[3].x - this.points[0].x,
            this.points[3].y - this.points[0].y
        );
        context.stroke();
        context.closePath();
    }

    public isPointInside(x: number, y: number): boolean {
        const xCheck =  x > this.points[0].x && x < this.points[3].x;
        const yCheck = y > this.points[0].y && y < this.points[3].y;

        return xCheck && yCheck;
    }

    public setPosition(x: number, y: number) {
        //todo this needs work, it locks to the top left corner right now
        const width = this.points[3].x - this.points[0].x;
        const height = this.points[3].y - this.points[0].y;

        this.points[0].x = x;
        this.points[0].y = y;
        this.points[3].x = x + width;
        this.points[3].y = y + height;
    }
}

export default Rectangle;