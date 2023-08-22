import CanvasToolInterface from './CanvasToolInterface';
import Canvas from '../Canvas';
import CursorStyle from '../enums/CursorStyle';
import Text from '../utilities/Text';

class TextTool implements CanvasToolInterface {
    public cursorStyle(): CursorStyle {
        return CursorStyle.Text;
    }

    public keyDown(event: any, canvas: Canvas): void {
        if (event.key === 't' || event.key === 'T') {
            console.log('Text mode');
            canvas.selectedTool = this;
        }
    }

    public mouseDown(event: any, canvas: Canvas): void {
        const body = prompt('Enter text');
        if (!body) return;

        const text = new Text({ x: event.x, y: event.y }, body);
        text.draw(canvas.ctx, 'black');

        canvas.canvasObjects.push(text);
    }

    // @ts-ignore
    public mouseMove(event: any, canvas: Canvas): void {}

    // @ts-ignore
    public mouseUp(event: any, canvas: Canvas): void {}
}

export default TextTool;
