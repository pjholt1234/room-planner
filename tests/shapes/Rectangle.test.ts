import { expect, test } from 'vitest'
import Rectangle from '../../src/canvas/shapes/Rectangle';
import RectanglePoints from "../../src/canvas/RectanglePoints";

test('Point is not inside rectangle', () => {
    const points: RectanglePoints = [
        {
            x: 0,
            y: 0,
        },
        {
            x: 4,
            y: 0,
        },
        {
            x: 0,
            y: 4,
        },
        {
            x: 4,
            y: 4,
        },
    ];

    const rectangle = new Rectangle(points);

    expect(rectangle.isPointInside(11,11)).toBe(false);
});

test('Point is inside rectangle', () => {
    const points: RectanglePoints = [
        {
            x: 0,
            y: 0,
        },
        {
            x: 10,
            y: 0,
        },
        {
            x: 0,
            y: 10,
        },
        {
            x: 10,
            y: 10,
        },
    ];

    const rectangle = new Rectangle(points);

    expect(rectangle.isPointInside(5,1)).toBe(true);
})

test('class name is rectangle', () => {
    const points: RectanglePoints = [
        {
            x: 0,
            y: 0,
        },
        {
            x: 10,
            y: 0,
        },
        {
            x: 0,
            y: 10,
        },
        {
            x: 10,
            y: 10,
        },
    ];

    const rectangle = new Rectangle(points);

    expect(rectangle.name).toBe("Rectangle");
})