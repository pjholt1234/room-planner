import abstractTool from './AbstractTool';
import Canvas from '../Canvas';
import ShapeInterface from '../shapes/ShapeInterface';
import CursorStyle from '../enums/CursorStyle';

class DeleteTool extends abstractTool {
    protected eventName: string = 'delete-tool';
    protected toolName: string = 'delete';

    protected cursorStyle: CursorStyle = CursorStyle.Pointer;

    public keyDown(event: any, canvas: Canvas): void {
        if (event.key === 'd' || event.key === 'D') {
            this.enableTool(canvas);
        }
    }

    public mouseDown(event: any, canvas: Canvas): void {
        const selectedPoint = { x: event.clientX, y: event.clientY };

        canvas.canvasObjects.some((canvasObject: ShapeInterface) => {
            if (canvasObject.isPointInside(selectedPoint)) {
                const reply = confirm(
                    'Are you sure you want to delete this object?'
                );
                if (!reply) {
                    return;
                }

                const index = canvas.canvasObjects.indexOf(canvasObject);
                canvas.canvasObjects.splice(index, 1);
                canvas.redrawCanvas();
                return;
            }
        });
    }

    //@ts-ignore
    public mouseMove(event: any, canvas: Canvas): void {}

    //@ts-ignore
    public mouseUp(event: any, canvas: Canvas): void {}

    // @ts-ignore
    public keyUp(event: any, canvas: Canvas): void {}
}

export default DeleteTool;
