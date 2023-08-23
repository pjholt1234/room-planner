import CanvasToolInterface from './CanvasToolInterface';
import Canvas from '../Canvas';
import CursorStyle from '../enums/CursorStyle';

abstract class AbstractTool implements CanvasToolInterface {
    protected cursorStyle: CursorStyle = CursorStyle.Default;
    protected eventName: string;
    protected toolName: string;

    public abstract keyDown(event: any, canvas: Canvas): void;

    public abstract mouseDown(event: any, canvas: Canvas): void;

    public abstract mouseMove(event: any, canvas: Canvas): void;

    public abstract mouseUp(event: any, canvas: Canvas): void;

    public getCursorStyle(): CursorStyle {
        return this.cursorStyle;
    }

    public addCustomEventListeners(canvas: Canvas): void {
        document.addEventListener(this.eventName, () =>
            this.enableTool(canvas)
        );
    }

    protected enableTool(canvas: Canvas): void {
        console.log(this.toolName + ' enabled');
        canvas.selectedTool = this;
    }
}

export default AbstractTool;
