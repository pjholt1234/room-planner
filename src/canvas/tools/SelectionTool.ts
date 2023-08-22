import CanvasToolInterface from './CanvasToolInterface';
import ShapeInterface from '../shapes/ShapeInterface';
import Canvas from '../Canvas';
import CursorStyle from '../enums/CursorStyle';

class SelectionTool implements CanvasToolInterface {
    public selectedObject: ShapeInterface | null = null;
    private _mode: number = 0;
    private _modes: string[] = ['move', 'resize'];

    public mouseDown(event: any, canvas: Canvas): void {
        if (this.selectedObject !== null) {
            this.deselectObject(canvas);
            return;
        }

        const selectedPoint = { x: event.clientX, y: event.clientY };

        canvas.canvasObjects.reverse().every((canvasObject: ShapeInterface) => {
            if (canvasObject.isPointInside(selectedPoint)) {
                if (this._modes[this._mode] === 'resize') {
                    canvasObject.setPivotPoint(selectedPoint);
                }

                if (this._modes[this._mode] === 'move') {
                    canvasObject.setClickOffsets(selectedPoint);
                }

                this.selectedObject = canvasObject;

                const index = canvas.canvasObjects.indexOf(canvasObject);
                canvas.canvasObjects.splice(index, 1);

                this.selectedObject.draw(canvas.ctx, 'blue');
                return;
            }
        });
    }

    public mouseMove(event: any, canvas: Canvas): void {
        if (this.selectedObject === null) return;

        if (this._modes[this._mode] === 'move') {
            this.moveObject(event, canvas);
        }

        if (this._modes[this._mode] === 'resize') {
            this.resizeObject(event, canvas);
        }
    }

    // @ts-ignore
    public mouseUp(event: any, canvas: Canvas): void {}

    public keyDown(event: any, canvas: Canvas): void {
        if (event.key === 's' || event.key === 'S') {
            console.log('Selection tool selected');
            canvas.selectedTool = this;
        }

        if (
            canvas.selectedTool === this &&
            (event.key === 'm' || event.key === 'M')
        ) {
            this.switchMode();
        }

        if (canvas.selectedTool === this && event.key === 'Delete') {
            this.deleteObject(canvas);
        }

        if (canvas.selectedTool === this && event.key === 'Escape') {
            this.deselectObject(canvas);
        }
    }

    public cursorStyle(): CursorStyle {
        return CursorStyle.Move;
    }

    private deselectObject(canvas: Canvas): void {
        if (this.selectedObject === null) return;

        this.selectedObject.draw(canvas.ctx);
        canvas.canvasObjects.push(this.selectedObject);
        this.selectedObject = null;
    }

    private deleteObject(canvas: Canvas): void {
        if (this.selectedObject === null) return;

        const index = canvas.canvasObjects.indexOf(this.selectedObject);
        canvas.canvasObjects.splice(index, 1);
        this.selectedObject = null;
        canvas.redrawCanvas();
    }

    private moveObject(event: any, canvas: Canvas): void {
        if (this.selectedObject !== null) {
            this.selectedObject.setPosition({
                x: event.clientX,
                y: event.clientY
            });

            canvas.redrawCanvas();
            this.selectedObject.draw(canvas.ctx, 'blue');
        }
    }

    private resizeObject(event: any, canvas: Canvas): void {
        if (this.selectedObject === null) return;

        this.selectedObject.resize({ x: event.clientX, y: event.clientY });

        canvas.redrawCanvas();
        this.selectedObject.draw(canvas.ctx, 'blue');
    }

    private switchMode(): void {
        if (this.selectedObject !== null) {
            console.log('Cannot switch mode while object is selected');
            return;
        }

        if (this._mode + 1 > this._modes.length - 1) {
            this._mode = 0;
        } else {
            this._mode++;
        }

        console.log('Mode changed to: ' + this._modes[this._mode]);
    }
}

export default SelectionTool;
