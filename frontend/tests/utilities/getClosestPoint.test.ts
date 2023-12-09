import { expect, test } from 'vitest';
import Point from '../../src/canvas/shapes/point-types/Point';
import Rectangle from '../../src/canvas/shapes/Rectangle';
import getClosestPoint from '../../src/canvas/shapes/shape-helpers/getClosestPoint';
import Triangle from '../../src/canvas/shapes/Triangle';

test('Return closest rectangle point', () => {
    const points: Point[] = [
        {
            x: 0,
            y: 0
        },
        {
            x: 4,
            y: 0
        },
        {
            x: 0,
            y: 4
        },
        {
            x: 4,
            y: 4
        }
    ];

    const rectangle = new Rectangle(points);
    expect(getClosestPoint(rectangle.points, { x: 3, y: 4 })).toBe(3);
});

test('Return closest triangle point', () => {
    const points: Point[] = [
        {
            x: 0,
            y: 0
        },
        {
            x: 4,
            y: 0
        },
        {
            x: 0,
            y: 4
        }
    ];

    const triangle = new Triangle(points);
    expect(getClosestPoint(triangle.points, { x: 0, y: 3 })).toBe(2);
});
