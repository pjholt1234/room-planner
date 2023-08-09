import Canvas from "../Canvas";
import CanvasToolInterface from "./CanvasToolInterface";

class RectangleTool implements CanvasToolInterface {
    private x: number = 0;
    private y: number = 0;

    public mouseDown(event: any){
        this.x = event.clientX;
        this.y = event.clientY;
    }

    public mouseUp(event: any, canvas: Canvas){
        this.drawLine(canvas.ctx, this.x, this.y, event.clientX, this.y);
        this.drawLine(canvas.ctx, this.x, this.y, this.x, event.clientY);
        this.drawLine(canvas.ctx, event.clientX, event.clientY, this.x, event.clientY);
        this.drawLine(canvas.ctx, event.clientX, event.clientY, event.clientX, this.y);
    }

    private drawLine(context: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number) {
        context.beginPath();
        context.strokeStyle = 'black';
        context.lineWidth = 1;
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.stroke();
        context.closePath();
    }
}

export default RectangleTool;