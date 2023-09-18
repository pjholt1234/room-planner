import Canvas from '../Canvas';
import Point from '../shapes/point-types/Point';
import AbstractTool from './AbstractTool';
import CursorStyle from '../enums/CursorStyle';
import Line from '../shapes/Line';

class LineTool extends AbstractTool {
    protected cursorStyle: CursorStyle = CursorStyle.Crosshair;
    protected eventName: string = 'line';
    protected toolName: string = 'line';

    private _selectedPoint: Point | null = null;
    private _isDrawing: boolean = false;

    public mouseDown(event: any): void {
        this._selectedPoint = { x: event.clientX, y: event.clientY };
        this._isDrawing = true;
    }

    public mouseUp(event: any, canvas: Canvas): void {
        const line = this.draw(event, canvas, false);
        if (!line) return;

        canvas.canvasObjects.push(line);
        this._isDrawing = false;
    }

    public mouseMove(event: any, canvas: Canvas): void {
        this.draw(event, canvas, true);
    }

    public keyDown(event: any, canvas: Canvas): void {
        if (event.key === 'l' || event.key === 'L') {
            this.enableTool(canvas);
        }
    }

    // @ts-ignore
    public keyUp(event: any, canvas: Canvas): void {}

    private draw(
        event: any,
        canvas: Canvas,
        preview: boolean = false
    ): Line | undefined {
        if (!this._isDrawing || !this._selectedPoint) return;
        canvas.redrawCanvas();

        const points = [
            this._selectedPoint,
            { x: event.clientX, y: event.clientY }
        ];

        const line = new Line(points);

        line.strokeColour = canvas.strokeColour;
        let color = canvas.strokeColour;

        if (preview) color = 'blue';

        line.draw(canvas.ctx, color);

        return line;
    }
}

export default LineTool;
