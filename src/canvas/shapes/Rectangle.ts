import RectanglePoints from "../RectanglePoints";

class Rectangle implements ShapeInterface {
    public name = "Rectangle";
    constructor(public points : RectanglePoints ) {
        this.translateCoordinates();
    }

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

    public isPointInside(x: number, y: number): boolean {
        let xCheck =  x > this.points.x1 && x < this.points.x2;
        let yCheck = y > this.points.y1 && y < this.points.y2;

        return xCheck && yCheck;
    }


    private translateCoordinates() {
        const topLeft = [Math.min(this.points.x1, this.points.x2), Math.min(this.points.y1, this.points.y2)];
        const bottomRight = [Math.max(this.points.x1, this.points.x2), Math.max(this.points.y1, this.points.y2)];

        this.points = {
            x1: topLeft[0],
            y1: topLeft[1],
            x2: bottomRight[0],
            y2: bottomRight[1],
        };
    }

}

export default Rectangle;