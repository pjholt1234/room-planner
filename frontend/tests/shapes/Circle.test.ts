import { expect, test } from 'vitest';
import Circle from '../../src/canvas/shapes/Circle';
import Point from '../../src/canvas/shapes/point-types/Point';

test('Point is not inside circle', () => {
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

    const circle = new Circle(points);

    expect(circle.isPointInside({ x: 100, y: 100 })).toBe(false);
});

test('Point is inside circle', () => {
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

    const circle = new Circle(points);

    expect(circle.isPointInside({ x: 5, y: 1 })).toBe(true);
});

test('class name is circle', () => {
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

    const circle = new Circle(points);

    expect(circle.name).toBe('Circle');
});
