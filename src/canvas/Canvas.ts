import CanvasToolInterface from './tools/CanvasToolInterface';
import RectangleTool from "./tools/RectangeTool";

class Canvas {
    private _selectedTool: CanvasToolInterface;
    public canvas: HTMLCanvasElement;
    public ctx: CanvasRenderingContext2D;

    constructor(canvasId: string) {
        this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;

        this.initCanvas();
        this.selectedTool = new RectangleTool();
    }

    set selectedTool(tool: CanvasToolInterface)
    {
        this._selectedTool = tool;
        this.setMouseDownListener();
        this.setMouseUpListener();
    }
    get selectedTool(): CanvasToolInterface
    {
        return this._selectedTool;
    }

    initCanvas(): void
    {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        this.canvas.width = windowWidth;
        this.canvas.height = windowHeight;
    }

    private setMouseDownListener(): void
    {
        this.canvas?.removeEventListener('mousedown', () => {});
        this.canvas?.addEventListener('mousedown', (event) => {
            this._selectedTool.mouseDown(event, this);
        });
    }

    private setMouseUpListener(): void
    {
        this.canvas?.removeEventListener('mouseup', () => {});
        this.canvas?.addEventListener('mouseup', (event) => {
            this._selectedTool.mouseUp(event, this);
        });
    }
}

export default Canvas;
