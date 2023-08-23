import CanvasToolInterface from './CanvasToolInterface';
import Canvas from '../Canvas';
import Point from '../shapes/point-types/Point';
import Triangle from '../shapes/Triangle';
import CursorStyle from '../enums/CursorStyle';

class TriangleTool implements CanvasToolInterface {
    private _selectedPoint: Point | null = null;

    private _isDrawing: boolean = false;

    public mouseDown(event: any): void {
        this._selectedPoint = { x: event.clientX, y: event.clientY };
        this._isDrawing = true;
    }

    public mouseMove(event: any, canvas: Canvas): void {
        this.draw(event, canvas, true);
    }

    public mouseUp(event: any, canvas: Canvas): void {
        const triangle = this.draw(event, canvas);
        if (!triangle) return;

        canvas.canvasObjects.push(triangle);
        this._isDrawing = false;
    }

    public keyDown(event: any, canvas: Canvas): void {
        if (event.key === 't' || event.key === 'T') {
            this.enable(canvas);
        }
    }

    public cursorStyle(): CursorStyle {
        return CursorStyle.Crosshair;
    }

    public addCustomEventListeners(canvas: Canvas): void {
        document.addEventListener('triangle', () => this.enable(canvas));
    }

    private enable(canvas: Canvas): void {
        console.log('Triangle mode');
        canvas.selectedTool = this;
    }

    private draw(
        event: any,
        canvas: Canvas,
        preview: boolean = false
    ): Triangle | undefined {
        if (!this._isDrawing || !this._selectedPoint) return;
        canvas.redrawCanvas();

        const points = this.translateCoordinates(this._selectedPoint, {
            x: event.clientX,
            y: event.clientY
        });

        const triangle = new Triangle(points);

        let color = 'black';
        if (preview) color = 'blue';

        triangle.draw(canvas.ctx, color);

        return triangle;
    }

    private translateCoordinates(point1: Point, point2: Point): Point[] {
        const topXPoint =
            Math.min(point1.x, point2.x) +
            (Math.max(point1.x, point2.x) - Math.min(point1.x, point2.x)) / 2;

        const top = [topXPoint, Math.min(point1.y, point2.y)];
        const bottomLeft = [
            Math.min(point1.x, point2.x),
            Math.max(point1.y, point2.y)
        ];
        const bottomRight = [
            Math.max(point1.x, point2.x),
            Math.max(point1.y, point2.y)
        ];

        return [
            {
                x: top[0],
                y: top[1]
            },
            {
                x: bottomLeft[0],
                y: bottomLeft[1]
            },
            {
                x: bottomRight[0],
                y: bottomRight[1]
            }
        ];
    }
}

export default TriangleTool;
