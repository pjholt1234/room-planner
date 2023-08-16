import Canvas from '../Canvas';
import GridMode from '../enums/GridMode';
import enumToArray from '../helpers/enumToArray';

class Grid {
    public gridEnabled: boolean = false;

    private _gridSize: number = 16;

    private _mode: GridMode = GridMode.LINES;

    set mode(mode: GridMode) {
        this._mode = mode;
    }

    get mode(): GridMode {
        return this._mode;
    }

    public toggleGridMode(): void {
        const modes = enumToArray(GridMode);
        const currentModeIndex = modes.findIndex(
            (obj) => obj['value'] === this.mode
        );

        let newModeKey: string = modes[0].key;

        if (currentModeIndex !== modes.length - 1) {
            newModeKey = modes[currentModeIndex + 1].key;
        }

        //@ts-ignore
        this._mode = GridMode[newModeKey];
    }

    public draw(context: CanvasRenderingContext2D, canvas: Canvas): void {
        if (!this.gridEnabled) return;

        switch (this._mode) {
            case GridMode.DOTTED:
                this.drawDotGrid(context, canvas);
                break;
            case GridMode.LINES:
                this.drawStraightLines(context, canvas);
                break;
            case GridMode.DOTTED_LINES:
                this.drawDottedLines(context, canvas);
                break;
        }
    }

    public increaseGridSize() {
        this._gridSize += 16;
    }

    public decreaseGridSize() {
        if (this._gridSize <= 16) return;

        this._gridSize -= 16;
    }

    private drawStraightLines(
        context: CanvasRenderingContext2D,
        canvas: Canvas
    ) {
        for (let x = 0; x < canvas.canvas.width; x += this._gridSize) {
            context.strokeStyle = 'lightgrey';
            context.beginPath();
            context.moveTo(x, 0);
            context.lineTo(x, canvas.canvas.height);
            context.stroke();
        }

        // Draw horizontal lines
        for (let y = 0; y < canvas.canvas.height; y += this._gridSize) {
            context.strokeStyle = 'lightgrey';
            context.beginPath();
            context.moveTo(0, y);
            context.lineTo(canvas.canvas.width, y);
            context.stroke();
        }
    }

    private drawDottedLines(context: CanvasRenderingContext2D, canvas: Canvas) {
        const dotSpacing = 4;
        const dotArray = [dotSpacing, dotSpacing];

        for (let x = 0; x < canvas.canvas.width; x += this._gridSize) {
            context.strokeStyle = 'lightgrey';
            context.beginPath();
            context.moveTo(x, 0);
            context.lineTo(x, canvas.canvas.height);
            context.setLineDash(dotArray);
            context.stroke();
            context.setLineDash([]);
        }

        for (let y = 0; y < canvas.canvas.height; y += this._gridSize) {
            context.strokeStyle = 'lightgrey';
            context.beginPath();
            context.moveTo(0, y);
            context.lineTo(canvas.canvas.width, y);
            context.setLineDash(dotArray);
            context.stroke();
            context.setLineDash([]);
        }
    }

    private drawDotGrid(context: CanvasRenderingContext2D, canvas: Canvas) {
        const dotRadius = 2; // Adjust this value to control the size of the dots

        for (let x = 0; x < canvas.canvas.width; x += this._gridSize) {
            for (let y = 0; y < canvas.canvas.height; y += this._gridSize) {
                context.fillStyle = 'lightgrey';
                context.beginPath();
                context.arc(x, y, dotRadius, 0, Math.PI * 2);
                context.fill();
            }
        }
    }
}

export default Grid;
