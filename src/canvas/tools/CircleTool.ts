import CanvasToolInterface from './CanvasToolInterface';
import CursorStyle from '../enums/CursorStyle';
import Canvas from '../Canvas';
import Point from '../shapes/point-types/Point';
import Circle from '../shapes/Circle';

class CircleTool implements CanvasToolInterface {
    private _isDrawing: boolean = false;
    private _selectedPoint: Point | null = null;

    public keyDown(event: any, canvas: Canvas): void {
        if (event.key === 'c' || event.key === 'C') {
            this.enable(canvas);
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

    public cursorStyle(): CursorStyle {
        return CursorStyle.Crosshair;
    }

    public addCustomEventListeners(canvas: Canvas): void {
        document.addEventListener('circle', () => this.enable(canvas));
    }

    private enable(canvas: Canvas): void {
        console.log('Circle mode');
        canvas.selectedTool = this;
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
