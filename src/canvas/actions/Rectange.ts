import Canvas from "../Canvas";
import CanvasActionInterface from "./CanvasActionInterface";

class Rectangle implements CanvasActionInterface {
    private x: number = 0;
    private y: number = 0;

    mouseDown(event: any){
        this.x = event.clientX;
        this.y = event.clientY;
    }

    mouseUp(event: any, canvas: Canvas){
        canvas.drawLine(canvas.ctx, this.x, this.y, event.clientX, this.y);
        canvas.drawLine(canvas.ctx, this.x, this.y, this.x, event.clientY);
        canvas.drawLine(canvas.ctx, event.clientX, event.clientY, this.x, event.clientY);
        canvas.drawLine(canvas.ctx, event.clientX, event.clientY, event.clientX, this.y);
    }
}

export default Rectangle;