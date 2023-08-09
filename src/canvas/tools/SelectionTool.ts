import CanvasToolInterface from "./CanvasToolInterface";
import Canvas from "../Canvas";

class SelectionTool implements CanvasToolInterface {
    mouseDown(event: any, canvas: Canvas): void {
        canvas.canvasObjects.reverse().every((canvasObject: ShapeInterface) => {
            if(canvasObject.isPointInside(event.clientX, event.clientY)) {
                console.log('Clicked on object ' + canvasObject);
            }

            return;
        });
    }

    // @ts-ignore
    mouseMove(event: any, canvas: Canvas): void {
    }

    // @ts-ignore
    mouseUp(event: any, canvas: Canvas): void {
    }

}

export default SelectionTool;