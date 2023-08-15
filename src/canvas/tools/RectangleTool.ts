import Canvas from "../Canvas";
import CanvasToolInterface from "./CanvasToolInterface";
import RectanglePoints from "../shapes/point-types/RectanglePoints";
import Rectangle from "../shapes/Rectangle";

class RectangleTool implements CanvasToolInterface {
    private x1: number = 0;
    private y1: number = 0;

    private _isDrawing: boolean = false;

    public mouseDown(event: any): void
    {
        this.x1 = event.clientX;
        this.y1 = event.clientY;

        this._isDrawing = true;
    }

    public mouseUp(event: any, canvas: Canvas): void
    {
        if(!this._isDrawing) return;
        this._isDrawing = false;

        const points = this.translateCoordinates(this.x1, this.y1, event.clientX, event.clientY);

        const rectangle = new Rectangle(points);
        rectangle.draw(canvas.ctx);

        canvas.canvasObjects.push(rectangle);
    }

    public mouseMove(event: any, canvas: Canvas): void
    {
        if(!this._isDrawing) return;
        canvas.redrawCanvas();

        const points = this.translateCoordinates(this.x1, this.y1, event.clientX, event.clientY);

        const rectangle = new Rectangle(points);
        rectangle.draw(canvas.ctx);
    }

    public keyDown(event: any, canvas: Canvas): void
    {
        if (event.key === "r" || event.key === "R") {
            console.log('Rectangle mode');
            canvas.selectedTool = this;
        }
    }

    private translateCoordinates(x1: number, y1: number, x2: number, y2: number): RectanglePoints
    {
        const topLeft = [Math.min(x1, x2), Math.min(y1, y2)];
        const bottomRight = [Math.max(x1, x2), Math.max(y1, y2)];

        return [
            {
                x: topLeft[0],
                y: topLeft[1],
            },
            {
                x: topLeft[0],
                y: bottomRight[1],
            },
            {
                x: bottomRight[0],
                y: topLeft[1],
            },
            {
                x: bottomRight[0],
                y: bottomRight[1],
            },
        ];
    }
}

export default RectangleTool;
