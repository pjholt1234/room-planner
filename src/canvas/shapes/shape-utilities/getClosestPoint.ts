import Point from "../point-types/Point";

const findClosestPoint = (points: Point[], searchPoint: Point): number =>
{
    let closestPointIndex = 0;
    let minDistance: number | null = null;

    points.forEach((point: Point, index: number) => {
        const distance = calculateDistance(searchPoint, point);

        if (minDistance === null || distance < minDistance) {
            minDistance = distance;
            closestPointIndex = index;
        }
    });

    return closestPointIndex;
}

const calculateDistance = (point1: Point, point2: Point): number => {
    const dx = point2.x - point1.x;
    const dy = point2.y - point1.y;
    return Math.sqrt(dx * dx + dy * dy);
}

export default findClosestPoint;