const data4: string[] = require('fs').readFileSync('data/04.txt').toString().split('\n\n');

console.log('------');
console.log('Day 04');
console.log('------');

type Board = string[][];

const calls = data4[0].split(',');
const boards = data4.slice(1).map((board) => [...board.split('\n').map((row) => row.trim().split(/\s+/))]);

console.log('There are %d numbers to be called', calls.length);
console.log('There are %d boards to be played', boards.length);

let winner: Board | null = null;

const checkBingo = (board: Board) => {
    return board.reduce((hasBingo: boolean, row, index, rows) => {
        if (hasBingo) return true;
        if (row.every((space) => space === 'X')) return true;
        if (rows.every((row) => row[index] === 'X')) return true;
        return false;
    }, false);
};

const markCalled = (called: string) => (board: Board) => {
    const updatedBoard = board.map((row) => {
        if (row.includes(called)) {
            row.splice(row.indexOf(called), 1, 'X');
        }
        return row;
    }) as Board;
    if (!winner && checkBingo(updatedBoard)) {
        winner = updatedBoard;
    }
};

console.log('\n\n');
console.time('Part 1');

for(let call of calls) {
    boards.forEach(markCalled(call));
    if(winner) {
        const sumUnmarked = (winner as Board).reduce((sum, row) => {
            sum += row.filter((space: string) => space !== 'X')
                .reduce((sum: number, curr: string) => {
                    sum += parseInt(curr, 10);
                    return sum;
                }, 0)
            return sum;
        }, 0);
        console.log('Winning call: %d', call);
        console.log('Winning board:', winner);
        console.log('Part 1 Solution: %d', sumUnmarked * parseInt(call, 10));
        break;
    };
}

console.timeEnd('Part 1');

console.log('\n\n');
