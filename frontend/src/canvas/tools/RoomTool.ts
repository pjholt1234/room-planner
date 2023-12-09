import Canvas from '../Canvas';
import Point from '../shapes/point-types/Point';
import AbstractTool from './AbstractTool';
import CursorStyle from '../enums/CursorStyle';
import CustomShape from '../shapes/CustomShape';
import Line from '../shapes/Line';
import Room from '../shapes/Room';

class RoomTool extends AbstractTool {
    protected cursorStyle: CursorStyle = CursorStyle.Crosshair;
    protected eventName: string = 'room-tool';
    protected toolName: string = 'room-tool';

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
        if (event.key === 'Shift') {
            this.completeShape(canvas);
        }

        if (event.key == 'Escape') {
            this.cancelShape(canvas);
        }
    }

    // @ts-ignore
    public keyUp(event: any, canvas: Canvas): void {}

    private draw(event: any, canvas: Canvas): Room | undefined {
        if (!this._isDrawing) return;
        canvas.redrawCanvas();

        this.drawRoom(canvas);

        const previewPoints = this._selectedPoints.slice(-1);
        console.log('test');
        previewPoints.push({ x: event.clientX, y: event.clientY });
        const previewLine = new Line(previewPoints);

        previewLine.draw(canvas.ctx, 'blue');
    }

    private drawRoom(canvas: Canvas): CustomShape {
        const room = new Room(this._selectedPoints);
        room.strokeColour = canvas.strokeColour;

        room.draw(canvas.ctx);

        return room;
    }

    private completeShape(canvas: Canvas): void {
        if (this._selectedPoints.length <= 2) return;
        this._selectedPoints.push(this._selectedPoints[0]);

        const room = this.drawRoom(canvas);
        this._isDrawing = false;
        this._selectedPoints = [];

        canvas.room = room;
        canvas.redrawCanvas();
    }

    private cancelShape(canvas: Canvas): void {
        this._isDrawing = false;
        this._selectedPoints = [];
        canvas.redrawCanvas();
    }
}

export default RoomTool;
