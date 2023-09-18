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

    public isPointInside(point: Point): boolean {
        const m =
            (this.points[0].y - this.points[1].y) /
            (this.points[0].x - this.points[1].x);

        const c = this.points[0].y - m * this.points[0].x;
        const lineXCoordinate = (point.y - c) / m;

        const clickLineXIntersect = Math.abs(point.x - lineXCoordinate);

        if (clickLineXIntersect > 2 && clickLineXIntersect < 2) {
            return false;
        }

        const boundingBox = this.calculateBoundingBox();

        let minY = boundingBox[0].y;
        let maxY = boundingBox[0].y;

        for (let i = 0; i < boundingBox.length - 1; i++) {
            if (boundingBox[i].y < minY) {
                minY = boundingBox[i].y;
            }
            if (boundingBox[i].y > maxY) {
                maxY = boundingBox[i].y;
            }
        }

        if (point.y < minY || point.y > maxY) {
            return false;
        }

        return true;
    }

    private calculateBoundingBox(): Point[] {
        const m =
            (this.points[0].y - this.points[1].y) /
            (this.points[0].x - this.points[1].x);

        const c = this.points[0].y - m * this.points[0].x;

        const boundingBoxSize = 5;

        let lowestX;
        let highestX;

        if (this.points[0].x < this.points[1].x) {
            lowestX = this.points[0].x - boundingBoxSize;
            highestX = this.points[1].x + boundingBoxSize;
        } else {
            lowestX = this.points[1].x - boundingBoxSize;
            highestX = this.points[0].x + boundingBoxSize;
        }

        return [
            {
                x: lowestX,
                y: m * lowestX + c - boundingBoxSize
            },
            {
                x: lowestX,
                y: m * lowestX + c + boundingBoxSize
            },
            {
                x: highestX,
                y: m * highestX + c + boundingBoxSize
            },
            {
                x: highestX,
                y: m * highestX + c - boundingBoxSize
            }
        ];
    }
}

export default Line;
