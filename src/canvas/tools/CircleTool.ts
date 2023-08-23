import CursorStyle from '../enums/CursorStyle';
import Canvas from '../Canvas';
import Point from '../shapes/point-types/Point';
import Circle from '../shapes/Circle';
import AbstractTool from './AbstractTool';

class CircleTool extends AbstractTool {
    private _isDrawing: boolean = false;
    private _selectedPoint: Point | null = null;

    protected cursorStyle: CursorStyle = CursorStyle.Crosshair;
    protected eventName: string = 'circle';
    protected toolName: string = 'circle';

    public keyDown(event: any, canvas: Canvas): void {
        if (event.key === 'c' || event.key === 'C') {
            this.enableTool(canvas);
        }
    }

    // @ts-ignore
    public mouseDown(event: any, canvas: Canvas): void {
        this._isDrawing = true;
        this._selectedPoint = { x: event.clientX, y: event.clientY };
    }

    public mouseMove(event: any, canvas: Canvas): void {
        this.draw(event, canvas, true);
    }

    public mouseUp(event: any, canvas: Canvas): void {
        const circle = this.draw(event, canvas);
        if (!circle) return;

        canvas.canvasObjects.push(circle);
        this._isDrawing = false;
    }

    private draw(
        event: any,
        canvas: Canvas,
        preview: boolean = false
    ): Circle | undefined {
        if (!this._isDrawing || !this._selectedPoint) return;
        canvas.redrawCanvas();

        const circle = new Circle(this._selectedPoint, {
            x: event.clientX,
            y: event.clientY
        });

        let color = 'black';
        if (preview) color = 'blue';

        circle.draw(canvas.ctx, color);

        return circle;
    }
}

export default CircleTool;
