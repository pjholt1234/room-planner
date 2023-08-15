import { expect, test } from 'vitest'
import Triangle from '../../src/canvas/shapes/Triangle';
import TrianglePoints from "../../src/canvas/shapes/point-types/TrianglePoints";

test('Point is not inside triangle', () => {
    const points: TrianglePoints = [
        {
            x: 0,
            y: 0
        },
        {
            x: 0,
            y: 0
        },
        {
            x: 0,
            y: 0
        }
    ];

    const triangle = new Triangle(points);

    expect(triangle.isPointInside(11,11)).toBe(false);
});

test('Point is inside triangle', () => {
    const points: TrianglePoints = [
        {
            x: 0,
            y: 0
        },
        {
            x: 10,
            y: 0
        },
        {
            x: 0,
            y: 10
        }
    ];

    const triangle = new Triangle(points);

    expect(triangle.isPointInside(5,1)).toBe(true);
})

test('class name is triangle', () => {
    const points: TrianglePoints = [
        {
            x: 0,
            y: 0
        },
        {
            x: 10,
            y: 0
        },
        {
            x: 0,
            y: 10
        }
    ];

    const triangle = new Triangle(points);

    expect(triangle.name).toBe("Triangle");
})