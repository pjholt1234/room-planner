import { expect, test } from 'vitest';
import CustomShape from '../../src/canvas/shapes/CustomShape';
import Point from '../../src/canvas/shapes/point-types/Point';

test('Point is not inside customShape', () => {
    const points: Point[] = [
        {
            x: 0,
            y: 0
        },
        {
            x: 1,
            y: 11
        },
        {
            x: 11,
            y: 1
        }
    ];

    const customShape = new CustomShape(points);

    expect(customShape.isPointInside({ x: 11, y: 11 })).toBe(false);
});

test('Point is inside customShape', () => {
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

    const customShape = new CustomShape(points);

    expect(customShape.isPointInside({ x: 5, y: 1 })).toBe(true);
});

test('Point is inside customShape', () => {
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
            x: 10,
            y: 10
        },
        {
            x: 0,
            y: 10
        }
    ];

    const customShape = new CustomShape(points);

    expect(customShape.isPointInside({ x: 5, y: 1 })).toBe(true);
});

test('class name is customShape', () => {
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

    const customShape = new CustomShape(points);

    expect(customShape.name).toBe('CustomShape');
});
