import { expect, test } from 'vitest';
import Triangle from '../../src/canvas/shapes/Triangle';
import Point from '../../src/canvas/shapes/point-types/Point';

test('Point is not inside triangle', () => {
    const points: Point[] = [
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

    expect(triangle.isPointInside({ x: 11, y: 11 })).toBe(false);
});

test('Point is inside triangle', () => {
    const points: Point[] = [
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

    expect(triangle.isPointInside({ x: 5, y: 1 })).toBe(true);
});

test('class name is triangle', () => {
    const points: Point[] = [
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

    expect(triangle.name).toBe('Triangle');
});
