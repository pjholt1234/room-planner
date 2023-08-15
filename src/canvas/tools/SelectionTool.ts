import CanvasToolInterface from "./CanvasToolInterface";
import ShapeInterface from "../shapes/ShapeInterface";
import Canvas from "../Canvas";

class SelectionTool implements CanvasToolInterface {
    public selectedObject: ShapeInterface | null = null;
    private _mode: number = 0;
    private _modes: string[] = ['move', 'resize'];
    private _x: number = 0;
    private _y: number = 0;

    public mouseDown(event: any, canvas: Canvas): void
    {
        if(this.selectedObject !== null) {
            this.deselectObject(canvas);
            return;
        }

        canvas.canvasObjects.reverse().every((canvasObject: ShapeInterface) => {
            if(canvasObject.isPointInside(event.clientX, event.clientY)) {
                this._x = event.clientX;
                this._y = event.clientY;

                this.selectedObject = canvasObject;

                const index = canvas.canvasObjects.indexOf(canvasObject);
                canvas.canvasObjects.splice(index, 1);

                this.selectedObject.draw(canvas.ctx, 'blue');
                return;
            }
        });
    }

    // @ts-ignore
    public mouseMove(event: any, canvas: Canvas): void
    {
        if(this.selectedObject === null) return;

        if(this._modes[this._mode] === 'move') {
            this.moveObject(event, canvas);
        }

        if(this._modes[this._mode] === 'resize') {
            this.resizeObject(event, canvas);
        }
    }

    // @ts-ignore
    public mouseUp(event: any, canvas: Canvas): void
    {}

    public keyDown(event: any, canvas: Canvas): void
    {
        if (event.key === "s" || event.key === "S") {
            console.log('Selection tool selected');
            canvas.selectedTool = this;
        }

        if (event.key === "m" || event.key === "M" ) {
            this.switchMode();
        }
    }

    private deselectObject(canvas: Canvas): void
    {
        if(this.selectedObject !== null) {
            this.selectedObject.draw(canvas.ctx);
            canvas.canvasObjects.push(this.selectedObject);
            this.selectedObject = null;
        }
    }

    private moveObject(event: any, canvas: Canvas): void
    {
        if(this.selectedObject !== null) {
            this.selectedObject.setPosition(event.clientX, event.clientY);
            canvas.redrawCanvas();
            this.selectedObject.draw(canvas.ctx, 'blue');
        }
    }

    // @ts-ignore
    private resizeObject(event: any, canvas: Canvas): void
    {
        if(this.selectedObject === null) return;

        this.selectedObject.resize(this._x, this._y, event.clientX, event.clientY);

        canvas.redrawCanvas();
        this.selectedObject.draw(canvas.ctx, 'blue');
    }

    private switchMode(): void
    {
        if(this.selectedObject !== null) {
            console.log('Cannot switch mode while object is selected');
            return;
        }

        if(this._mode + 1 > this._modes.length - 1) {
            this._mode = 0;
        } else {
            this._mode++;
        }

        console.log('Mode changed to: ' + this._modes[this._mode]);
    }
}

export default SelectionTool;