import Canvas from '../Canvas';
import CursorStyle from '../enums/CursorStyle';
import Text from '../utilities/Text';
import abstractTool from './AbstractTool';

class TextTool extends abstractTool {
    protected cursorStyle: CursorStyle = CursorStyle.Text;
    protected eventName: string = 'text';
    protected toolName: string = 'text';

    public keyDown(event: any, canvas: Canvas): void {
        if (event.key === 'w' || event.key === 'W') {
            this.enableTool(canvas);
        }
    }

    public mouseDown(event: any, canvas: Canvas): void {
        const body = prompt('Enter text');
        if (!body) return;

        const text = new Text({ x: event.x, y: event.y }, body);
        text.draw(canvas.ctx, canvas.strokeColour);

        canvas.canvasObjects.push(text);
    }

    // @ts-ignore
    public mouseMove(event: any, canvas: Canvas): void {}

    // @ts-ignore
    public mouseUp(event: any, canvas: Canvas): void {}
}

export default TextTool;
