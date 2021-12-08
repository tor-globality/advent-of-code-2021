const data3: string[] = require('fs').readFileSync('data/03.txt').toString().split('\n');

console.log('------');
console.log('Day 03');
console.log('------');

console.log('There are %d entries in the data', data3.length);

console.log('\n\n');

type Counts = number[];

console.time('Part 1');

const getCounts = (data: string[]) =>
    data.reduce((counts: Counts, curr) => {
        const bits = curr.split('').forEach((bit, i) => {
            if (counts[i] === undefined) {
                counts[i] = 0;
            }
            if (bit === '1') counts[i]++;
        });
        return counts;
    }, []);

const { gamma, epsilon } = getCounts(data3).reduce(
    ({ gamma, epsilon }, curr) => {
        if (curr >= 500) {
            gamma += '1';
            epsilon += '0';
        } else {
            gamma += '0';
            epsilon += '1';
        }
        return { gamma, epsilon };
    },
    { gamma: '', epsilon: '' }
);

console.log('Gamma: %d\nEpsilon: %d', parseInt(gamma, 2), parseInt(epsilon, 2));
console.log('Part 1 Solution: %d', parseInt(gamma, 2) * parseInt(epsilon, 2));
console.timeEnd('Part 1');

console.log('\n\n');

console.time('Part 2');

const { o2Rating, co2Rating } = getCounts(data3).reduce(
    ({ o2Rating, co2Rating }, curr, i) => {
        if (o2Rating.length > 1) {
            if (getCounts(o2Rating)[i] >= o2Rating.length / 2) {
                o2Rating = o2Rating.filter((entry) => entry[i] === '1');
            } else {
                o2Rating = o2Rating.filter((entry) => entry[i] === '0');
            }
        }
        if (co2Rating.length > 1) {
            if (getCounts(co2Rating)[i] >= co2Rating.length / 2) {
                co2Rating = co2Rating.filter((entry) => entry[i] === '0');
            } else {
                co2Rating = co2Rating.filter((entry) => entry[i] === '1');
            }
        }
        return { o2Rating, co2Rating };
    },
    { o2Rating: data3, co2Rating: data3 }
);

console.log('O2 rating: %o\nC02 rating: %o', parseInt(o2Rating[0], 2), parseInt(co2Rating[0], 2));
console.log('Part 2 Solution: %d', parseInt(o2Rating[0], 2) * parseInt(co2Rating[0], 2));
console.timeEnd('Part 2');

console.log('\n\n');
