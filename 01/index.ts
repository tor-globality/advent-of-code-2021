console.log('------');
console.log('Day 01');
console.log('------');

const data: number[] = require('fs').readFileSync('data/01.txt').toString().split('\n').map(Number);

console.log('There are %d entries in the data', data.length);

console.log('\n\n');
console.time('Part 1');

const values = data.reduce((aggregate, next, i) => {
    if (next > data[i - 1]) return ++aggregate;
    return aggregate;
}, 0);

console.log('Part 1 Solution: %d', values);
console.timeEnd('Part 1');

// console.time('forLoop')
// let count = 0;
// for(let i = 0; i < data.length; i++) {
//     if (data[i] > data[i - 1]) count++;
// }

// console.log('for loop', count)
// console.timeEnd('forLoop')

// console.time('while')
// let _count = 0;
// let arr = Array.from(data);
// while(arr.length) {
//     const current = arr.pop();
//     if(current && current > arr[arr.length - 1]) ++_count;
// }
// console.log('while loop', _count)
// console.timeEnd('while')

console.log('\n\n');
console.time('Part 2');

const result = data
    .reduce((agg: number[], curr, i, original) => {
        if (i + 2 < original.length) {
            agg.push(curr + original[i + 1] + original[i + 2]);
        }
        return agg;
    }, [])
    .reduce((agg: number, curr, i, original) => {
        if (curr > original[i - 1]) {
            return ++agg;
        }
        return agg;
    }, 0);

console.log('Part 2 Solution: %d', result);
console.timeEnd('Part 2');

console.log('\n\n');

export {};
