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
import PlanManager from '../data-access/PlanManager';
import * as cursors from '../assets/index.ts';
import LineTool from './tools/LineTool';
import CustomShapeTool from './tools/CustomShapeTool';
import RoomTool from './tools/RoomTool';
import Room from './shapes/Room';

class Canvas {
    public canvas: HTMLCanvasElement;
    public ctx: CanvasRenderingContext2D;
    public canvasObjects: ShapeInterface[] = [];
    public room: Room | null = null;
    public grid: Grid;
    public fillColour: string = '#FFFFFF';
    public strokeColour: string = '#000000';
    private _tools: CanvasToolInterface[] = [];
    private _selectedTool: CanvasToolInterface;
    private planManager: PlanManager;

    constructor(canvasId: string, planManager: PlanManager) {
        this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
        this.planManager = planManager;

        this.grid = new Grid();

        this._tools = [
            new RectangleTool(),
            new SelectionTool(),
            new TriangleTool(),
            new CircleTool(),
            new TextTool(),
            new FillTool(),
            new GridTool(),
            new DeleteTool(),
            new LineTool(),
            new CustomShapeTool(),
            new RoomTool()
        ];

        this.selectedTool = new LineTool();
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

        if (this.room) {
            this.room.draw(this.ctx, 'white');
        }

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

        document.removeEventListener('keyup', () => {});
        document.addEventListener('keyup', (event) => {
            this._tools.forEach((tool: CanvasToolInterface) => {
                tool.keyUp(event, this);
            });
        });

        this._tools.forEach((tool: CanvasToolInterface) => {
            tool.addCustomEventListeners(this);
        });
    }

    private initCanvasDimensions() {
        // @ts-ignore
        this.canvas.width = this.canvas.clientWidth;
        // @ts-ignore
        this.canvas.height = this.canvas.clientHeight;
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

        const cursorImage = this.getCursorImage();
        const centerX = gridAlignedX - cursorImage.width / 2;
        const centerY = gridAlignedY - cursorImage.height / 2;

        this.ctx.drawImage(this.getCursorImage(), centerX, centerY);

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

        const handlePlanLoad = () => {
            this.canvasObjects = this.planManager.currentPlan.canvasObjects;
            this.room = this.planManager.currentPlan.room;
            this.redrawCanvas();
        };

        this.planManager.addObserver('loading', handlePlanLoad);

        const handlePlanDeleted = () => {
            this.canvasObjects = [];
            this.room = null;
            this.redrawCanvas();
        };

        this.planManager.addObserver('deleted', handlePlanDeleted);

        this.planManager.addObserver('saving', () => {
            //if (!this.room) return; placeholder
            this.room = new Room([
                { x: 0, y: 0 },
                { x: this.canvas.width, y: 0 },
                { x: this.canvas.width, y: this.canvas.height },
                { x: 0, y: this.canvas.height }
            ]);

            this.planManager.savePlan(this.canvasObjects, this.room);
        });
    }

    private getCursorImage(): any {
        const cursor = new Image();
        console.log(this.selectedTool.getCursorStyle());
        switch (this.selectedTool.getCursorStyle()) {
            case 'crosshair':
                cursor.src = cursors.crosshair;
                break;
            case 'move':
                cursor.src = cursors.move;
                break;
            case 'text':
                cursor.src = cursors.text;
                break;
            default:
                cursor.src = cursors.defaultCursor;
                break;
        }

        return cursor;
    }
}

export default Canvas;
