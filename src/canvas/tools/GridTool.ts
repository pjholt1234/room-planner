import Canvas from '../Canvas';
import CursorStyle from '../enums/CursorStyle';
import AbstractTool from './AbstractTool';

class GridTool extends AbstractTool {
    protected cursorStyle: CursorStyle = CursorStyle.Default;
    protected eventName: string = 'grid';
    protected toolName: string = 'grid';

    // @ts-ignore
    public mouseDown(event: any): void {}

    // @ts-ignore
    public mouseUp(event: any, canvas: Canvas): void {}

    // @ts-ignore
    public mouseMove(event: any, canvas: Canvas): void {}

    public keyDown(event: any, canvas: Canvas): void {
        if (event.key === 'g' || event.key === 'G') {
            this.enableTool(canvas);
        }

        if (canvas.grid.gridEnabled && event.key === 'ArrowUp') {
            canvas.grid.increaseGridSize();
            canvas.redrawCanvas();
        }

        if (canvas.grid.gridEnabled && event.key === 'ArrowDown') {
            console.log('Decreasing grid size');
            canvas.grid.decreaseGridSize();
            canvas.redrawCanvas();
        }

        if (canvas.grid.gridEnabled && event.key === 'ArrowLeft') {
            canvas.grid.toggleGridMode();
            canvas.redrawCanvas();
        }
    }

    //Overrides
    protected enableTool(canvas: Canvas): void {
        canvas.grid.gridEnabled = !canvas.grid.gridEnabled;

        canvas.redrawCanvas();
        console.log('Grid enabled: ', canvas.grid.gridEnabled);
    }
}

export default GridTool;
