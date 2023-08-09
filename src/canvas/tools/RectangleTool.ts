import Canvas from "../Canvas";
import CanvasToolInterface from "./CanvasToolInterface";
import RectanglePoints from "../RectanglePoints";
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

        const points: RectanglePoints = {
            x1: this.x1,
            y1: this.y1,
            x2: event.clientX,
            y2: event.clientY
        }

        const rectangle = new Rectangle(points);
        rectangle.draw(canvas.ctx);

        canvas.canvasObjects.push(rectangle);
    }

    public mouseMove(event: any, canvas: Canvas): void
    {
        if(!this._isDrawing) return;
        canvas.redrawCanvas();

        const points: RectanglePoints = {
            x1: this.x1,
            y1: this.y1,
            x2: event.clientX,
            y2: event.clientY
        }

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
}

export default RectangleTool;
