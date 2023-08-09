import CanvasToolInterface from "./CanvasToolInterface";
import Canvas from "../Canvas";
import TrianglePoints from "../TrianglePoints";
import Triangle from "../shapes/Triangle";

class TriangleTool implements CanvasToolInterface {
    private x1: number = 0;
    private y1: number = 0;

    private _isDrawing: boolean = false;

    public mouseDown(event: any): void
    {
        this.x1 = event.clientX;
        this.y1 = event.clientY;

        this._isDrawing = true;
    }

    public mouseMove(event: any, canvas: Canvas): void
    {
        if(!this._isDrawing) return;
        canvas.redrawCanvas();

        let points = this.translateCoordinates(this.x1, this.y1, event.clientX, event.clientY);
        const triangle = new Triangle(points);
        triangle.draw(canvas.ctx);
    }

    public mouseUp(event: any, canvas: Canvas): void
    {
        if(!this._isDrawing) return;
        this._isDrawing = false;

        let points = this.translateCoordinates(this.x1, this.y1, event.clientX, event.clientY);
        const triangle = new Triangle(points);
        triangle.draw(canvas.ctx);

        canvas.canvasObjects.push(triangle);
    }

    public keyDown(event: any, canvas: Canvas): void {
        if (event.key === "t" || event.key === "T") {
            console.log('Triangle mode');
            canvas.selectedTool = this;
        }
    }
    
    private translateCoordinates(x1: number, y1: number, x2: number, y2: number): TrianglePoints
    {
        const topXPoint = Math.min(x1, x2) + (((Math.max(x1, x2) - Math.min(x1, x2)) / 2 ));

        const top = [topXPoint, Math.min(y1, y2)];
        const bottomLeft = [Math.min(x1, x2), Math.max(y1, y2)];
        const bottomRight = [Math.max(x1, x2), Math.max(y1, y2)];

        return {
            x1: top[0],
            y1: top[1],
            x2: bottomLeft[0],
            y2: bottomLeft[1],
            x3: bottomRight[0],
            y3: bottomRight[1],
        };
    }
}

export default TriangleTool;