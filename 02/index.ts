console.log('------');
console.log('Day 02');
console.log('------');

const data: string[] = require('fs').readFileSync('data/02.txt').toString().split('\n');

console.log('There are %d entries in the data', data.length);

console.log('\n\n');

type Position = { horizontalPos: number; verticalPos: number; aim: number };

const initialPosition: Position = {
    horizontalPos: 0,
    verticalPos: 0,
    aim: 0,
};

let { horizontalPos: horz, verticalPos: vert, aim } = initialPosition;

console.time('Part 1');
for (let i = 0; i < data.length; i++) {
    const [direction, strValue] = data[i].split(' ');
    const value = parseInt(strValue, 10);

    switch (direction) {
        case 'forward':
            horz += value;
            break;

        case 'up':
            vert -= value;
            break;

        case 'down':
            vert += value;
            break;
    }
}

console.log('Part 1 Solution: %d', horz * vert);
console.timeEnd('Part 1');

console.log('\n\n');

console.time('Part 2');

horz = initialPosition.horizontalPos;
vert = initialPosition.verticalPos;

for (let i = 0; i < data.length; i++) {
    const [direction, strValue] = data[i].split(' ');
    const value = parseInt(strValue, 10);

    switch (direction) {
        case 'forward':
            horz += value;
            vert += value * aim;
            break;

        case 'up':
            aim -= value;
            break;

        case 'down':
            aim += value;
            break;
    }
}

console.log('Part 2 Solution: %d', horz * vert);
console.timeEnd('Part 2');

console.log('\n\n');

export {};
