console.log('------');
console.log('Day 05');
console.log('------');

type Point = `${number},${number}`
type Line = `${Point} -> ${Point}`;
type Coordinates = { x: number; y: number; };
type LineCoordinates = [Coordinates, Coordinates];
type Plot = number;
type VentMap = Plot[][];

const data5: Line[] = require('fs').readFileSync('data/05.txt').toString().trim().split('\n');
const compose5 = require('compose-function');

console.log('There are %d lines to plot', data5.length);

const createMap = (size: number): VentMap => (
    [...Array(size)]
        .map(() => [...Array(size)].map(_ => 0))
);

const renderMapSection = (map: VentMap) => (
    console.log(`
        ${map.slice(450, 550).map(row => row.slice(450, 550).map(cell => cell ? cell : '.').join('')).join('\n')}
    `)
)

const getCoordinates = (line: Line): [Coordinates, Coordinates] => {
    const [start, end] = line.split(' -> ');
    const [startX, startY] = start.split(',');
    const [endX, endY] = end.split(',');
    return [
        { x: parseInt(startX, 10), y: parseInt(startY, 10) },
        { x: parseInt(endX, 10), y: parseInt(endY, 10) },
    ];
}

const isHorzLine = ([ start, end ]: LineCoordinates): boolean => start.y === end.y;
const isVertLine = ([ start, end ]: LineCoordinates): boolean => start.x === end.x;

const getPointsFromDiff = (start: number, end: number): number[] => {
    const isNegative = end - start < 0;
    const distance = Math.abs(end - start) + 1;
    return [...Array(distance)].map((_, i) => isNegative ? start - i : start + i)
}

const plotPoint = ({ x, y }: Coordinates, map: VentMap) => {
    map[y][x] += 1;
    return map;
}

const plotLine = (line: Line) => (map: VentMap) => {
    const lineCoords = getCoordinates(line);

    if(isHorzLine(lineCoords)) {
        const [{ x: start, y }, { x: end }] = lineCoords;
        for(let point of getPointsFromDiff(start, end)) {
            plotPoint({ x: point, y}, map);
        }
    }
    if(isVertLine(lineCoords)) {
        const [{ x, y: start }, { y: end }] = lineCoords;
        for(let point of getPointsFromDiff(start, end)) {
            plotPoint({ x, y: point }, map);
        }
    }
    return map;
}

const countRowOverlaps = (sumAll: number, row: number[]) =>
    sumAll += row.reduce((sum: number, pointValue) => sum += pointValue > 1 ? 1 : 0, 0);

const countOverlaps = (map: VentMap) => map.reduce(countRowOverlaps, 0)

console.log('\n\n');
console.time('Part 1');

const map = createMap(1000);
const lines = data5.slice();

for(let line of lines) {
    const process = compose5(
        plotLine(line)
    )

    process(map)
}

// renderMapSection(map)
console.log('Part 1 Solution: %d', countOverlaps(map));


console.timeEnd('Part 1');
console.log('\n\n');

