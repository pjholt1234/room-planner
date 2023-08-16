import Canvas from '../Canvas';

interface CanvasToolInterface {
    mouseDown(event: any, canvas: Canvas): void;

    mouseUp(event: any, canvas: Canvas): void;

    mouseMove(event: any, canvas: Canvas): void;

    keyDown(event: any, canvas: Canvas): void;

    cursorStyle(): CursorStyle;
}

export default CanvasToolInterface;
