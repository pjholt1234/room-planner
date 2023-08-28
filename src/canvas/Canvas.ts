import CanvasToolInterface from './tools/CanvasToolInterface';
import RectangleTool from './tools/RectangleTool';
import SelectionTool from './tools/SelectionTool';
import TriangleTool from './tools/TriangleTool';
import ShapeInterface from './shapes/ShapeInterface';
import GridTool from './tools/GridTool';
import Grid from './utilities/Grid';
import CircleTool from './tools/CircleTool';
import TextTool from './tools/TextTool';
import FillTool from './tools/FillTool';
import DeleteTool from './tools/DeleteTool';
import PlanRepository from '../data-access/PlanRepository';
import ApiClient from '../data-access/ApiClient';

class Canvas {
    public canvas: HTMLCanvasElement;
    public ctx: CanvasRenderingContext2D;
    public canvasObjects: ShapeInterface[] = [];
    public grid: Grid;
    public fillColour: string = '#FFFFFF';
    public strokeColour: string = '#000000';

    private planRepository: PlanRepository;
    private planId: string = '';
    private _tools: CanvasToolInterface[] = [];
    private _selectedTool: CanvasToolInterface;

    constructor(canvasId: string) {
        this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
        this.planRepository = new PlanRepository(new ApiClient());

        this.grid = new Grid();

        this._tools = [
            new RectangleTool(),
            new SelectionTool(),
            new TriangleTool(),
            new CircleTool(),
            new TextTool(),
            new FillTool(),
            new GridTool(),
            new DeleteTool()
        ];

        this.selectedTool = new RectangleTool();
        this.initCanvasDimensions();
        this.setModeClickListener();
        this.redrawCanvas();
        this.setUpGlobalEventListeners();
    }

    set selectedTool(tool: CanvasToolInterface) {
        this._selectedTool = tool;
        this.canvas.style.cursor = this._selectedTool.getCursorStyle();
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

    public resetCursorStyle(): void {
        this.canvas.style.cursor = this._selectedTool.getCursorStyle();
    }

    private setMouseDownListener(): void {
        this.canvas?.removeEventListener('mousedown', this.handleMouseDown);
        this.canvas?.addEventListener('mousedown', this.handleMouseDown);
    }

    private handleMouseDown = (event: MouseEvent) => {
        this._selectedTool.mouseDown(this.cursorGridSnapping(event), this);
    };

    private setMouseUpListener(): void {
        this.canvas?.removeEventListener('mouseup', this.handleMouseUp);
        this.canvas?.addEventListener('mouseup', this.handleMouseUp);
    }

    private handleMouseUp = (event: MouseEvent) => {
        this._selectedTool.mouseUp(this.cursorGridSnapping(event), this);
    };

    private setMouseMoveListener(): void {
        this.canvas?.removeEventListener('mousemove', this.handleMouseMove);
        this.canvas?.addEventListener('mousemove', this.handleMouseMove);
    }

    private handleMouseMove = (event: any) => {
        this._selectedTool.mouseMove(this.cursorGridSnapping(event), this);
    };

    private setModeClickListener(): void {
        document.removeEventListener('keydown', () => {});
        document.addEventListener('keydown', (event) => {
            this._tools.forEach((tool: CanvasToolInterface) => {
                tool.keyDown(event, this);
            });
        });

        this._tools.forEach((tool: CanvasToolInterface) => {
            tool.addCustomEventListeners(this);
        });
    }

    private initCanvasDimensions() {
        const container = document.getElementById('myCanvas');
        // @ts-ignore
        this.canvas.width = container.clientWidth;
        // @ts-ignore
        this.canvas.height = container.clientHeight;
    }

    private cursorGridSnapping(event: MouseEvent): any {
        if (!this.grid.gridSnap) {
            return event;
        }

        this.canvas.style.cursor = 'none';
        this.redrawCanvas();

        const gridSize = this.grid.gridSize;

        const gridAlignedX = Math.round(event.x / gridSize) * gridSize;
        const gridAlignedY = Math.round(event.y / gridSize) * gridSize;

        this.ctx.fillStyle = '#000000';
        this.ctx.fillRect(gridAlignedX, gridAlignedY, 2, 2);

        return {
            clientX: gridAlignedX,
            clientY: gridAlignedY
        };
    }

    private setUpGlobalEventListeners(): void {
        //@ts-ignore
        document.addEventListener(
            'fill-colour-changed',
            (event: CustomEvent) => {
                this.fillColour = event.detail;
            }
        );

        //@ts-ignore
        document.addEventListener(
            'stroke-colour-changed',
            (event: CustomEvent) => {
                this.strokeColour = event.detail;
            }
        );

        //@ts-ignore
        document.addEventListener('load-plan', (event: CustomEvent) => {
            this.planId = event.detail;
            this.loadPlan();
        });

        //@ts-ignore
        document.addEventListener('save-plan', (event: CustomEvent) => {
            this.savePlan();
        });
    }

    private async loadPlan() {
        if (!this.planId) {
            return;
        }

        await this.planRepository
            .loadPlan(this.planId)
            .then((response: any) => {
                this.canvasObjects = response.canvasObjects;
                this.redrawCanvas();
            });
    }

    private async savePlan() {
        await this.planRepository
            .savePlan(this.planId, 'test', this.canvasObjects)
            .then((response: any) => {
                this.planId = response._id;
            });
    }
}

export default Canvas;
