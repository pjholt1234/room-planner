import Canvas from '../Canvas';
import Point from '../shapes/point-types/Point';
import AbstractTool from './AbstractTool';
import CursorStyle from '../enums/CursorStyle';
import CustomShape from '../shapes/CustomShape';
import Line from '../shapes/Line';

class CustomShapeTool extends AbstractTool {
    protected cursorStyle: CursorStyle = CursorStyle.Crosshair;
    protected eventName: string = 'custom-shape';
    protected toolName: string = 'custom-shape';

    private _selectedPoints: Point[] = [];
    private _isDrawing: boolean = false;

    public mouseDown(event: any): void {
        this._selectedPoints.push({ x: event.clientX, y: event.clientY });
        this._isDrawing = true;
    }

    public mouseUp(event: any, canvas: Canvas): void {
        const currentPointIndex = this._selectedPoints.length;

        this._selectedPoints[currentPointIndex] = {
            x: event.clientX,
            y: event.clientY
        };

        this.draw(event, canvas);
    }

    public mouseMove(event: any, canvas: Canvas): void {
        this.draw(event, canvas);
    }

    public keyDown(event: any, canvas: Canvas): void {
        if (event.key === 'k' || event.key === 'K') {
            this.enableTool(canvas);
        }

        if (event.key === 'Shift') {
            this.completeShape(canvas);
        }

        if (event.key == 'Escape') {
            this.cancelShape(canvas);
        }
    }

    // @ts-ignore
    public keyUp(event: any, canvas: Canvas): void {}

    private draw(event: any, canvas: Canvas): CustomShape | undefined {
        if (!this._isDrawing) return;
        canvas.redrawCanvas();

        this.drawSetCustomShape(canvas);

        const previewPoints = this._selectedPoints.slice(-1);

        previewPoints.push({ x: event.clientX, y: event.clientY });
        const previewLine = new Line(previewPoints);

        previewLine.draw(canvas.ctx, 'blue');
    }

    private drawSetCustomShape(canvas: Canvas): CustomShape {
        const customShape = new CustomShape(this._selectedPoints);
        customShape.strokeColour = canvas.strokeColour;

        customShape.draw(canvas.ctx);

        return customShape;
    }

    private completeShape(canvas: Canvas): void {
        if (this._selectedPoints.length <= 2) return;
        this._selectedPoints.push(this._selectedPoints[0]);
        const customShape = this.drawSetCustomShape(canvas);

        this._isDrawing = false;
        this._selectedPoints = [];

        canvas.canvasObjects.push(customShape);
        canvas.redrawCanvas();
    }

    private cancelShape(canvas: Canvas): void {
        this._isDrawing = false;
        this._selectedPoints = [];
        canvas.redrawCanvas();
    }
}

export default CustomShapeTool;
