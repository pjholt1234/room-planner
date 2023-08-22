import Point from '../shapes/point-types/Point';
import ShapeInterface from '../shapes/ShapeInterface';
import findClosestPoint from '../shapes/shape-helpers/getClosestPoint';

class Text implements ShapeInterface {
    public body: string;
    public fontSize: number;
    public font: string;
    public textStartPoint: Point;
    private _boundingBox: Point[];
    private pivotPointIndex: number | null = null;
    private initialClickXOffset: number;
    private initialClickYOffset: number;

    constructor(
        textStartPoint: Point,
        body: string,
        fontSize: number = 20,
        font: string = 'Arial'
    ) {
        this.body = body;
        this.fontSize = fontSize;
        this.font = font;
        this.textStartPoint = textStartPoint;
    }

    public draw(context: CanvasRenderingContext2D, colour?: string): void {
        if (!colour) colour = 'black';

        context.font = this.fontSize + 'px ' + this.font;
        context.fillStyle = colour;
        context.fillText(
            this.body,
            this.textStartPoint.x,
            this.textStartPoint.y
        );

        this._boundingBox = this.setBoundingBox(context);
    }

    private setBoundingBox(context: CanvasRenderingContext2D): Point[] {
        context.font = this.fontSize + 'px ' + this.font;
        const textMetrics = context.measureText(this.body);

        const textWidth = textMetrics.width;
        const textHeight = this.fontSize;

        const topLeft = [
            this.textStartPoint.x,
            this.textStartPoint.y - textHeight
        ];

        const bottomRight = [
            this.textStartPoint.x + textWidth,
            this.textStartPoint.y + textHeight / 2
        ];

        return [
            {
                x: topLeft[0],
                y: topLeft[1]
            },
            {
                x: topLeft[0],
                y: bottomRight[1]
            },
            {
                x: bottomRight[0],
                y: topLeft[1]
            },
            {
                x: bottomRight[0],
                y: bottomRight[1]
            }
        ];
    }

    getPoints(): any {
        return this.textStartPoint;
    }

    isPointInside(point: Point): boolean {
        const xCheck =
            point.x > this._boundingBox[0].x &&
            point.x < this._boundingBox[3].x;
        const yCheck =
            point.y > this._boundingBox[0].y &&
            point.y < this._boundingBox[3].y;

        console.log(this._boundingBox, point.x, point.y, xCheck, yCheck);

        return xCheck && yCheck;
    }

    public resize(point: Point): void {
        if (this.pivotPointIndex === null) return;
        this._boundingBox[this.pivotPointIndex] = point;
    }

    public setPivotPoint(point: Point): void {
        this.pivotPointIndex = findClosestPoint(this._boundingBox, point);
    }

    // @ts-ignore
    public setClickOffsets(point: Point): void {
        this.initialClickXOffset = point.x - this.textStartPoint.x;
        this.initialClickYOffset = point.y - this.textStartPoint.y;
    }

    // @ts-ignore
    setPosition(point: Point): void {
        this.textStartPoint = {
            x: point.x - this.initialClickXOffset,
            y: point.y - this.initialClickYOffset
        };
    }
}

export default Text;
