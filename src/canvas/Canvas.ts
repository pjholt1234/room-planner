import CanvasToolInterface from './tools/CanvasToolInterface';
import RectangleTool from './tools/RectangleTool';
import SelectionTool from './tools/SelectionTool';
import TriangleTool from './tools/TriangleTool';
import ShapeInterface from './shapes/ShapeInterface';
import GridTool from './tools/GridTool';
import Grid from './utilities/Grid';
import CircleTool from './tools/CircleTool';

class Canvas {
    public canvas: HTMLCanvasElement;
    public ctx: CanvasRenderingContext2D;
    public canvasObjects: ShapeInterface[] = [];
    public grid: Grid;

    private _tools: CanvasToolInterface[] = [];
    private _selectedTool: CanvasToolInterface;

    constructor(canvasId: string) {
        this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;

        this.grid = new Grid();

        this._tools = [
            new RectangleTool(),
            new SelectionTool(),
            new TriangleTool(),
            new CircleTool(),
            new GridTool()
        ];

        this.initCanvas();
        this.selectedTool = new RectangleTool();

        this.setModeClickListener();

        this.redrawCanvas();
    }

    set selectedTool(tool: CanvasToolInterface) {
        this._selectedTool = tool;
        this.canvas.style.cursor = this._selectedTool.cursorStyle();
        this.setMouseDownListener();
        this.setMouseUpListener();
        this.setMouseMoveListener();
    }

    get selectedTool(): CanvasToolInterface {
        return this._selectedTool;
    }

    public clearCanvas(): void {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    public redrawCanvas(): void {
        this.clearCanvas();

        this.grid.draw(this.ctx, this);

        this.canvasObjects.forEach((canvasObject: ShapeInterface) => {
            canvasObject.draw(this.ctx);
        });
    }

    private initCanvas(): void {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        this.canvas.width = windowWidth;
        this.canvas.height = windowHeight;
    }

    private setMouseDownListener(): void {
        this.canvas?.removeEventListener('mousedown', this.handleMouseDown);
        this.canvas?.addEventListener('mousedown', this.handleMouseDown);
    }

    private handleMouseDown = (event: MouseEvent) => {
        this._selectedTool.mouseDown(event, this);
    };

    private setMouseUpListener(): void {
        this.canvas?.removeEventListener('mouseup', this.handleMouseUp);
        this.canvas?.addEventListener('mouseup', this.handleMouseUp);
    }

    private handleMouseUp = (event: MouseEvent) => {
        this._selectedTool.mouseUp(event, this);
    };

    private setMouseMoveListener(): void {
        this.canvas?.removeEventListener('mousemove', this.handleMouseMove);
        this.canvas?.addEventListener('mousemove', this.handleMouseMove);
    }

    private handleMouseMove = (event: MouseEvent) => {
        this._selectedTool.mouseMove(event, this);
    };

    private setModeClickListener(): void {
        document.removeEventListener('keydown', () => {});
        document.addEventListener('keydown', (event) => {
            this._tools.forEach((tool: CanvasToolInterface) => {
                tool.keyDown(event, this);
            });
        });
    }
}

export default Canvas;
