import Canvas from '../Canvas';
import CanvasToolInterface from './CanvasToolInterface';
import CursorStyle from '../enums/CursorStyle';

class GridTool implements CanvasToolInterface {
    // @ts-ignore
    public mouseDown(event: any): void {}

    // @ts-ignore
    public mouseUp(event: any, canvas: Canvas): void {}

    // @ts-ignore
    public mouseMove(event: any, canvas: Canvas): void {}

    public keyDown(event: any, canvas: Canvas): void {
        if (event.key === 'g' || event.key === 'G') {
            this.enable(canvas);
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

    public cursorStyle(): CursorStyle {
        return CursorStyle.Default;
    }

    public addCustomEventListeners(canvas: Canvas): void {
        document.addEventListener('grid', () => this.enable(canvas));
    }

    private enable(canvas: Canvas): void {
        canvas.grid.gridEnabled = !canvas.grid.gridEnabled;

        canvas.redrawCanvas();
        console.log('Grid enabled: ', canvas.grid.gridEnabled);
    }
}

export default GridTool;
