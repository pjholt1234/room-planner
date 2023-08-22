import ShapeInterface from '../shapes/ShapeInterface';
import Canvas from '../Canvas';
import CursorStyle from '../enums/CursorStyle';
import CanvasToolInterface from './CanvasToolInterface';

class FillTool implements CanvasToolInterface {
    public fillColour: string = 'red';

    public cursorStyle(): CursorStyle {
        return CursorStyle.Pointer;
    }

    public keyDown(event: any, canvas: Canvas): void {
        if (event.key === 'f' || event.key === 'F') {
            console.log('Fill mode');
            canvas.selectedTool = this;
        }
    }

    public mouseDown(event: any, canvas: Canvas): void {
        const selectedPoint = { x: event.clientX, y: event.clientY };

        canvas.canvasObjects.reverse().every((canvasObject: ShapeInterface) => {
            console.log(canvasObject.isPointInside(selectedPoint));
            if (canvasObject.isPointInside(selectedPoint)) {
                canvasObject.setFillColour(this.fillColour);
                canvasObject.draw(canvas.ctx);
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
