import CanvasToolInterface from "./CanvasToolInterface";
import Canvas from "../Canvas";

class SelectionTool implements CanvasToolInterface {

    public selectedObject: ShapeInterface | null = null;
    mouseDown(event: any, canvas: Canvas): void
    {
        if(this.selectedObject !== null) {
            this.selectedObject.draw(canvas.ctx);
            canvas.canvasObjects.push(this.selectedObject);
            this.selectedObject = null;

            return;
        }


        canvas.canvasObjects.reverse().every((canvasObject: ShapeInterface) => {
            if(canvasObject.isPointInside(event.clientX, event.clientY)) {
                console.log('Clicked on object ' + canvasObject);

                this.selectedObject = canvasObject;

                const index = canvas.canvasObjects.indexOf(canvasObject);
                canvas.canvasObjects.splice(index, 1);

                this.selectedObject.draw(canvas.ctx, 'blue');
            }

            return;
        });
    }

    // @ts-ignore
    mouseMove(event: any, canvas: Canvas): void
    {
        if(this.selectedObject !== null) {
            this.selectedObject.setPosition(event.clientX, event.clientY);
            canvas.redrawCanvas();
            this.selectedObject.draw(canvas.ctx, 'blue');
        }
    }

    // @ts-ignore
    mouseUp(event: any, canvas: Canvas): void
    {}

    keyDown(event: any, canvas: Canvas): void
    {
        if (event.key === "m" || event.key === "M") {
            console.log('Selection mode');
            canvas.selectedTool = this;
        }
    }
}

export default SelectionTool;