console.log('------');
console.log('Day 06');
console.log('------');

type Fish = number;
type School = Fish[];

const data: School = require('fs').readFileSync('data/06.txt').toString().split(',').map(Number);

console.log('There are %d fish in the school', data.length);

const categorizeSchool = (school: School, fish: Fish) => {
    school[fish]++;
    return school;
};

const cycleSchool = (school: School): School =>
    school.map((_fish, i, original) => {
        // prettier-ignore
        return i === (original.length - 1)
            ? original[0]
            : i === 6
                ? original[i + 1] + original[0]
                : original[i + 1];
    });

const countSchool = (sum: number, age: number) => sum + age;

console.log('\n\n');
console.time('Part 1');

const PART_1_DAYS = 80;

const school = data.reduce(categorizeSchool, Array(9).fill(0));

const result = [...Array(PART_1_DAYS)].reduce(cycleSchool, school).reduce(countSchool, 0);

console.log('Part 1 Solution: %d', result);
console.timeEnd('Part 1');

console.log('\n\n');
console.time('Part 2');

const PART_2_DAYS = 256;

const school2 = data.reduce(categorizeSchool, Array(9).fill(0));

const result2 = [...Array(PART_2_DAYS)].reduce(cycleSchool, school2).reduce(countSchool, 0);

console.log('Part 2 Solution: %d', result2);
console.timeEnd('Part 2');

console.log('\n\n');

export {};
