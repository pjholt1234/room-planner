import Point from '../shapes/point-types/Point';
import ShapeInterface from '../shapes/ShapeInterface';

class Text implements ShapeInterface {
    public body: string;
    public fontSize: number;
    public font: string;
    public textStartPoint: Point;
    public strokeColour: string = 'black';

    private _boundingBox: Point[];
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
        if (!colour) colour = this.strokeColour;

        context.font = this.fontSize + 'px ' + this.font;
        context.fillStyle = colour;
        context.fillText(
            this.body,
            this.textStartPoint.x,
            this.textStartPoint.y
        );

        this._boundingBox = this.setBoundingBox(context);
    }

    public getPoints(): Point {
        return this.textStartPoint;
    }

    public isPointInside(point: Point): boolean {
        const xCheck =
            point.x > this._boundingBox[0].x &&
            point.x < this._boundingBox[3].x;
        const yCheck =
            point.y > this._boundingBox[0].y &&
            point.y < this._boundingBox[3].y;

        return xCheck && yCheck;
    }

    //@ts-ignore
    public resize(point: Point): void {}

    //@ts-ignore
    public setPivotPoint(point: Point): void {}

    public setClickOffsets(point: Point): void {
        this.initialClickXOffset = point.x - this.textStartPoint.x;
        this.initialClickYOffset = point.y - this.textStartPoint.y;
    }

    public setPosition(point: Point): void {
        this.textStartPoint = {
            x: point.x - this.initialClickXOffset,
            y: point.y - this.initialClickYOffset
        };
    }

    //@ts-ignore
    public setFillColour(colour: string): void {}

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
}

export default Text;
