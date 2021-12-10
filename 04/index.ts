import compose from 'compose-function';

const data: string[] = require('fs').readFileSync('data/04.txt').toString().split('\n\n');

console.log('------');
console.log('Day 04');
console.log('------');

type Board = { id: number; values: string[][] };
type Winners = Map<number, { board: Board; call: string }>;

const getBoards = (data: string[]) =>
    data.slice(1).map(
        (board, i): Board => ({
            id: i,
            values: [
                ...board
                    .split('\n')
                    .filter((str) => str.trim())
                    .map((row) => row.trim().split(/\s+/)),
            ],
        })
    );

const calls = data[0].split(',');
const boards = getBoards(data);
let winners: Winners = new Map();

console.log('There are %d numbers to be called', calls.length);
console.log('There are %d boards to be played', boards.length);

const checkBingo = ({ id, values }: Board): [boolean, Board] => {
    return [
        values.reduce((hasBingo: boolean, row, index, rows) => {
            if (hasBingo) return true;
            if (row.every((space) => space === 'X')) return true;
            if (rows.every((row) => row[index] === 'X')) return true;
            return false;
        }, false),
        { id, values },
    ];
};

const filterWinningBoards =
    (winners: Winners) =>
    ({ id }: Board): boolean =>
        !winners.has(id);

const markCalled =
    (call: string) =>
    ({ id, values }: Board): Board => {
        return {
            id,
            values: values.map((row) => {
                if (row.includes(call)) {
                    row.splice(row.indexOf(call), 1, 'X');
                }
                return row;
            }),
        };
    };

const markWinner =
    (call: string) =>
    ([isWinner, board]: [boolean, Board]): void => {
        if (isWinner) {
            winners.set(board.id, { board, call });
        }
    };

const sumUnmarked = ({ values }: Board) =>
    values.reduce((sum, row) => {
        sum += row
            .filter((space) => space !== 'X')
            .reduce((sum, curr) => {
                sum += parseInt(curr, 10);
                return sum;
            }, 0);
        return sum;
    }, 0);

console.log('\n\n');
console.time('Part 1');

for (let call of calls) {
    const processBoard = compose(markWinner(call), checkBingo, markCalled(call));
    boards.filter(filterWinningBoards(winners)).forEach(processBoard);

    if (winners.size) {
        const winner = [...winners.values()].shift()!;
        const { call, board } = winner;
        const winnerSumUnmarked = sumUnmarked(winner.board);
        console.log('Winning call: %d', winner.call);
        console.log('Winning board:', winner.board.values);
        console.log('Part 1 Solution: %d', winnerSumUnmarked * parseInt(call, 10));
        break;
    }
}

console.timeEnd('Part 1');
console.log('\n\n');

console.time('Part 2');

for (let call of calls) {
    const processBoard = compose(markWinner(call), checkBingo, markCalled(call));

    boards.filter(filterWinningBoards(winners)).forEach(processBoard);
}

const lastWin = [...winners.values()].pop()!;
const lastWinBoardSum = sumUnmarked(lastWin.board);

console.log('Last Winning call: %d', lastWin.call);
console.log('Last Winning board:', lastWin.board.values);
console.log('Part 2 Solution: %d', lastWinBoardSum * parseInt(lastWin.call, 10));

console.timeEnd('Part 2');
console.log('\n\n');

export {};
