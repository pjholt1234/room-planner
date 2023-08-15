import RectanglePoints from "./point-types/RectanglePoints";
import ShapeInterface from "./ShapeInterface";
import Point from "./point-types/Point";

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

    public getPoints(): RectanglePoints {
        return this.points;
    }

    public resize(clickX: number, clickY: number, x: number, y: number): void {
        const closestPointIndex = this.findClosestPoint(clickX, clickY);
        this.points[closestPointIndex] = { x: x, y: y };
    }

    private calculateDistance(point1: Point, point2: Point): number {
        const dx = point2.x - point1.x;
        const dy = point2.y - point1.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    private findClosestPoint(x: number, y: number): number
    {
        let closestPointIndex = 0;
        let minDistance = 0;

        this.points.forEach((point: Point, index: number) => {
            const distance = this.calculateDistance({ x: x, y: y }, point);
            if (distance < minDistance) {
                minDistance = distance;
                closestPointIndex = index;
            }
        });

        return closestPointIndex;
    }
}

export default Rectangle;