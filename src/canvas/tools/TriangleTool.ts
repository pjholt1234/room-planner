import CanvasToolInterface from "./CanvasToolInterface";
import Canvas from "../Canvas";
import TrianglePoints from "../shapes/point-types/TrianglePoints";
import Triangle from "../shapes/Triangle";
import Point from "../shapes/point-types/Point";

class TriangleTool implements CanvasToolInterface {
    private _selectedPoint: Point | null = null;

    private _isDrawing: boolean = false;

    public mouseDown(event: any): void
    {   
        this._selectedPoint = {x: event.clientX, y: event.clientY};
        this._isDrawing = true;
    }

    public mouseMove(event: any, canvas: Canvas): void
    {
        if(!this._isDrawing || !this._selectedPoint) return;
        canvas.redrawCanvas();

        const points = this.translateCoordinates(this._selectedPoint, {x: event.clientX, y: event.clientY});
        const triangle = new Triangle(points);
        triangle.draw(canvas.ctx);
    }

    public mouseUp(event: any, canvas: Canvas): void
    {
        if(!this._isDrawing || !this._selectedPoint) return;
        this._isDrawing = false;

        const points = this.translateCoordinates(this._selectedPoint, {x: event.clientX, y: event.clientY});
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
    
    private translateCoordinates(point1: Point, point2: Point): TrianglePoints
    {
        const topXPoint = Math.min(point1.x, point2.x) + (((Math.max(point1.x, point2.x) - Math.min(point1.x, point2.x)) / 2 ));

        const top = [topXPoint, Math.min(point1.y, point2.y)];
        const bottomLeft = [Math.min(point1.x, point2.x), Math.max(point1.y, point2.y)];
        const bottomRight = [Math.max(point1.x, point2.x), Math.max(point1.y, point2.y)];

        return [
            {
                x: top[0],
                y: top[1],
            },
            {
                x: bottomLeft[0],
                y: bottomLeft[1],
            },
            {
                x: bottomRight[0],
                y: bottomRight[1]
            }
        ];
    }

}

export default TriangleTool;