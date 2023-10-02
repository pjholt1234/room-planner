import { expect, test } from 'vitest';
import Line from '../../src/canvas/shapes/Line';
import Point from '../../src/canvas/shapes/point-types/Point';

test('Point is not inside line', () => {
    const points: Point[] = [
        {
            x: 0,
            y: 0
        },
        {
            x: 10,
            y: 10
        }
    ];

    const line = new Line(points);

    expect(line.isPointInside({ x: 100, y: 100 })).toBe(false);
});

test('Point is inside line', () => {
    const points: Point[] = [
        {
            x: 0,
            y: 0
        },
        {
            x: 10,
            y: 0
        }
    ];

    const line = new Line(points);

    expect(line.isPointInside({ x: 5, y: 1 })).toBe(true);
});

test('Point is inside line', () => {
    const points: Point[] = [
        {
            x: 0,
            y: 0
        },
        {
            x: 10,
            y: 0
        }
    ];

    const line = new Line(points);

    expect(line.isPointInside({ x: 5, y: 2 })).toBe(true);
});

test('class name is line', () => {
    const points: Point[] = [
        {
            x: 0,
            y: 0
        },
        {
            x: 10,
            y: 0
        }
    ];

    const line = new Line(points);

    expect(line.name).toBe('Line');
});
