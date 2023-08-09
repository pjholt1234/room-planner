import CanvasActionInterface from './actions/CanvasActionInterface';
import Rectangle from "./actions/Rectange";

class Canvas {
    private _currentAction: CanvasActionInterface;

    public canvas: HTMLCanvasElement;
    public ctx: CanvasRenderingContext2D;

    constructor(canvasId: string) {
        this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;

        this.initCanvas();
        this.currentAction = new Rectangle();
    }

    set currentAction(action: CanvasActionInterface)
    {
        this._currentAction = action;
        this.setMouseDownListener();
        this.setMouseUpListener();
    }
    get currentAction(): CanvasActionInterface
    {
        return this._currentAction;
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
            this._currentAction.mouseDown(event, this);
        });
    }

    private setMouseUpListener(): void
    {
        this.canvas?.removeEventListener('mouseup', () => {});
        this.canvas?.addEventListener('mouseup', (event) => {
            this._currentAction.mouseUp(event, this);
        });
    }
    public drawLine(context: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number) {
        context.beginPath();
        context.strokeStyle = 'black';
        context.lineWidth = 1;
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.stroke();
        context.closePath();
    }
}

export default Canvas;
