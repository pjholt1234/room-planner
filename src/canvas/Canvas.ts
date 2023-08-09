import CanvasToolInterface from './tools/CanvasToolInterface';
import RectangleTool from "./tools/RectangleTool";
import SelectionTool from "./tools/SelectionTool";

class Canvas {
    private _selectedTool: CanvasToolInterface;
    public canvasObjects: ShapeInterface[] = [];
    public canvas: HTMLCanvasElement;
    public ctx: CanvasRenderingContext2D;

    private _tools: CanvasToolInterface[] = [];

    constructor(canvasId: string) {
        this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;

        this._tools = [
            new RectangleTool(),
            new SelectionTool()
        ]

        this.initCanvas();
        this.selectedTool = new RectangleTool();
    }

    set selectedTool(tool: CanvasToolInterface)
    {
        this._selectedTool = tool;
        this.setMouseDownListener();
        this.setMouseUpListener();
        this.setMouseMoveListener()
        this.setModeClickListener();
    }
    get selectedTool(): CanvasToolInterface
    {
        return this._selectedTool;
    }

    public clearCanvas(): void
    {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    public redrawCanvas(): void
    {
        this.clearCanvas();
        this.canvasObjects.forEach((canvasObject: ShapeInterface) => {
            canvasObject.draw(this.ctx);
        });
    }

    private initCanvas(): void
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

    private setMouseMoveListener(): void
    {
        this.canvas?.removeEventListener('mousemove', () => {});
        this.canvas?.addEventListener('mousemove', (event) => {
            this._selectedTool.mouseMove(event, this);
        });
    }

    private setModeClickListener(): void
    {
        document.addEventListener("keydown", (event) =>{
            if (event.key === "m" || event.key === "M") {
                this._selectedTool = this._tools[1];
                console.log('Selection mode');
            }

            if (event.key === "r" || event.key === "R") {
                this._selectedTool = this._tools[0];
                console.log('Rectangle mode');
            }
        });
    }
}

export default Canvas;
