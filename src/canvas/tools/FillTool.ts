import ShapeInterface from '../shapes/ShapeInterface';
import Canvas from '../Canvas';
import CursorStyle from '../enums/CursorStyle';
import AbstractTool from './AbstractTool';

class FillTool extends AbstractTool {
    protected cursorStyle: CursorStyle = CursorStyle.Default;
    protected eventName: string = 'fill';
    protected toolName: string = 'fill';

    public keyDown(event: any, canvas: Canvas): void {
        if (event.key === 'f' || event.key === 'F') {
            this.enableTool(canvas);
        }
    }

    public mouseDown(event: any, canvas: Canvas): void {
        const selectedPoint = { x: event.clientX, y: event.clientY };

        canvas.canvasObjects.reverse().some((canvasObject: ShapeInterface) => {
            if (canvasObject.isPointInside(selectedPoint)) {
                canvasObject.setFillColour(canvas.fillColour);
                canvasObject.draw(canvas.ctx);
                canvas.redrawCanvas();
                return;
            }
        });
    }

    // @ts-ignore
    public mouseMove(event: any, canvas: Canvas): void {}

    // @ts-ignore
    public mouseUp(event: any, canvas: Canvas): void {}
}

export default FillTool;
