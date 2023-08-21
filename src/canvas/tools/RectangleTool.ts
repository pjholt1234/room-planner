import Canvas from '../Canvas';
import CanvasToolInterface from './CanvasToolInterface';
import Point from '../shapes/point-types/Point';
import Rectangle from '../shapes/Rectangle';
import CursorStyle from '../enums/CursorStyle';

class RectangleTool implements CanvasToolInterface {
    private _selectedPoint: Point | null = null;

    private _isDrawing: boolean = false;

    public mouseDown(event: any): void {
        this._selectedPoint = { x: event.clientX, y: event.clientY };

        this._isDrawing = true;
    }

    public mouseUp(event: any, canvas: Canvas): void {
        if (!this._isDrawing || !this._selectedPoint) return;
        this._isDrawing = false;

        const points = this.translateCoordinates(this._selectedPoint, {
            x: event.clientX,
            y: event.clientY
        });

        const rectangle = new Rectangle(points);
        rectangle.draw(canvas.ctx);

        canvas.canvasObjects.push(rectangle);
    }

    public mouseMove(event: any, canvas: Canvas): void {
        if (!this._isDrawing || !this._selectedPoint) return;
        canvas.redrawCanvas();

        const points = this.translateCoordinates(this._selectedPoint, {
            x: event.clientX,
            y: event.clientY
        });

        const rectangle = new Rectangle(points);
        rectangle.draw(canvas.ctx, 'blue');
    }

    public keyDown(event: any, canvas: Canvas): void {
        if (event.key === 'r' || event.key === 'R') {
            console.log('Rectangle mode');
            canvas.selectedTool = this;
        }
    }

    public cursorStyle(): CursorStyle {
        return CursorStyle.Crosshair;
    }

    private translateCoordinates(point1: Point, point2: Point): Point[] {
        const topLeft = [
            Math.min(point1.x, point2.x),
            Math.min(point1.y, point2.y)
        ];
        const bottomRight = [
            Math.max(point1.x, point2.x),
            Math.max(point1.y, point2.y)
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

export default RectangleTool;
