import Canvas from '../Canvas';
import CursorStyle from '../enums/CursorStyle';

interface CanvasToolInterface {
    mouseDown(event: any, canvas: Canvas): void;

    mouseUp(event: any, canvas: Canvas): void;

    mouseMove(event: any, canvas: Canvas): void;

    keyDown(event: any, canvas: Canvas): void;

    cursorStyle(): CursorStyle;

    addCustomEventListeners(canvas: Canvas): void;
}

export default CanvasToolInterface;
