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
        const rectangle = this.draw(event, canvas, false);
        if (!rectangle) return;

        canvas.canvasObjects.push(rectangle);
        this._isDrawing = false;
    }

    public mouseMove(event: any, canvas: Canvas): void {
        this.draw(event, canvas, true);
    }

    public keyDown(event: any, canvas: Canvas): void {
        if (event.key === 'r' || event.key === 'R') {
            this.enable(canvas);
        }
    }

    public cursorStyle(): CursorStyle {
        return CursorStyle.Crosshair;
    }

    public addCustomEventListeners(canvas: Canvas): void {
        document.addEventListener('rectangle', () => this.enable(canvas));
    }

    private enable(canvas: Canvas): void {
        console.log('Rectangle mode');
        canvas.selectedTool = this;
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

    private draw(
        event: any,
        canvas: Canvas,
        preview: boolean = false
    ): Rectangle | undefined {
        if (!this._isDrawing || !this._selectedPoint) return;
        canvas.redrawCanvas();

        const points = this.translateCoordinates(this._selectedPoint, {
            x: event.clientX,
            y: event.clientY
        });

        const rectangle = new Rectangle(points);

        let color = 'black';
        if (preview) color = 'blue';

        rectangle.draw(canvas.ctx, color);

        return rectangle;
    }
}

export default RectangleTool;
