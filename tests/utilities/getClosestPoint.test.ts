import {expect, test} from "vitest";
import RectanglePoints from "../../src/canvas/shapes/point-types/RectanglePoints";
import Rectangle from "../../src/canvas/shapes/Rectangle";
import getClosestPoint from "../../src/canvas/shapes/shape-utilities/getClosestPoint";
import TrianglePoints from "../../src/canvas/shapes/point-types/TrianglePoints";
import Triangle from "../../src/canvas/shapes/Triangle";

test('Return closest rectangle point', () => {
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
    expect(getClosestPoint(rectangle.points, 3,4)).toBe(3);
});

test('Return closest triangle point', () => {
    const points: TrianglePoints = [
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
    ];

    const triangle = new Triangle(points);
    expect(getClosestPoint(triangle.points, 0,3)).toBe(2);
});