import { expect, test } from 'vitest'
import Triangle from '../../src/canvas/shapes/Triangle';
import TrianglePoints from "../../src/canvas/TrianglePoints";

test('Point is not inside triangle', () => {
    let points: TrianglePoints = {
        x1: 0,
        y1: 0,
        x2: 10,
        y2: 0,
        x3: 0,
        y3: 10
    };

    const triangle = new Triangle(points);

    expect(triangle.isPointInside(11,11)).toBe(false);
});

test('Point is inside triangle', () => {
    let points: TrianglePoints = {
        x1: 0,
        y1: 0,
        x2: 10,
        y2: 0,
        x3: 0,
        y3: 10
    };

    const triangle = new Triangle(points);

    expect(triangle.isPointInside(5,1)).toBe(true);
})

test('class name is triangle', () => {
    let points: TrianglePoints = {
        x1: 0,
        y1: 0,
        x2: 10,
        y2: 0,
        x3: 0,
        y3: 10
    };

    const triangle = new Triangle(points);

    expect(triangle.name).toBe("Triangle");
})