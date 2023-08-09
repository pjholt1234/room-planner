import RectanglePoints from "../RectanglePoints";

class Rectangle implements ShapeInterface {
    public name = "Rectangle";
    constructor(public points : RectanglePoints ) {}

    public draw(context: CanvasRenderingContext2D) {
        context.beginPath();
        context.strokeStyle = 'black';
        context.lineWidth = 1;
        context.rect(
            this.points.x1,
            this.points.y1,
            this.points.x2 - this.points.x1,
            this.points.y2 - this.points.y1
        );
        context.stroke();
        context.closePath();
    }
}

export default Rectangle;