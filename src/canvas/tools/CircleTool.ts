import CanvasToolInterface from './CanvasToolInterface';
import CursorStyle from '../enums/CursorStyle';
import Canvas from '../Canvas';
import Point from '../shapes/point-types/Point';
import Circle from '../shapes/Circle';

class CircleTool implements CanvasToolInterface {
    private _isDrawing: boolean = false;
    private _selectedPoint: Point | null = null;

    cursorStyle(): CursorStyle {
        return CursorStyle.Crosshair;
    }

    keyDown(event: any, canvas: Canvas): void {
        if (event.key === 'o' || event.key === 'O') {
            console.log('Circle mode');
            canvas.selectedTool = this;
        }
    }

    //@ts-ignore
    mouseDown(event: any, canvas: Canvas): void {
        this._isDrawing = true;

        this._selectedPoint = { x: event.clientX, y: event.clientY };
    }

    //@ts-ignore
    mouseMove(event: any, canvas: Canvas): void {
        if (!this._isDrawing || !this._selectedPoint) return;
        canvas.redrawCanvas();

        const circle = new Circle(this._selectedPoint, {
            x: event.clientX,
            y: event.clientY
        });

        circle.draw(canvas.ctx, 'blue');
    }

    mouseUp(event: any, canvas: Canvas): void {
        if (!this._isDrawing || !this._selectedPoint) return;
        this._isDrawing = false;

        const circle = new Circle(this._selectedPoint, {
            x: event.clientX,
            y: event.clientY
        });

        circle.draw(canvas.ctx);
        canvas.canvasObjects.push(circle);
    }
}

export default CircleTool;
