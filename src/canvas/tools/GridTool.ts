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
            this.increaseGridSize(canvas);
        }

        if (canvas.grid.gridEnabled && event.key === 'ArrowDown') {
            this.decreaseGridSize(canvas);
        }

        if (canvas.grid.gridEnabled && event.key === 'ArrowLeft') {
            this.toggleGridMode(canvas);
        }
    }

    //Overrides
    protected enableTool(canvas: Canvas): void {
        canvas.grid.gridEnabled = !canvas.grid.gridEnabled;

        canvas.redrawCanvas();
        console.log('Grid enabled: ', canvas.grid.gridEnabled);
    }

    public addCustomEventListeners(canvas: Canvas): void {
        document.addEventListener(this.eventName, () =>
            this.enableTool(canvas)
        );

        document.addEventListener('increase-grid-size', () => {
            this.increaseGridSize(canvas);
        });

        document.addEventListener('decrease-grid-size', () => {
            this.decreaseGridSize(canvas);
        });

        document.addEventListener('toggle-grid-mode', () => {
            this.toggleGridMode(canvas);
        });
    }

    private increaseGridSize(canvas: Canvas): void {
        if (!canvas.grid.gridEnabled) return;

        canvas.grid.increaseGridSize();
        canvas.redrawCanvas();
    }

    private decreaseGridSize(canvas: Canvas): void {
        if (!canvas.grid.gridEnabled) return;

        canvas.grid.decreaseGridSize();
        canvas.redrawCanvas();
    }

    private toggleGridMode(canvas: Canvas): void {
        if (!canvas.grid.gridEnabled) return;

        canvas.grid.toggleGridMode();
        canvas.redrawCanvas();
    }
}

export default GridTool;
