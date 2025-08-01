import { describe, expect, it } from 'vitest';
import createGame from './createGame.js';
import { Direction, type GameData, MoveType } from './types.js';
import { toNumberMatrix } from './utils/numberMatrix.js';

describe('createGame', () => {
	it('initializes game with expected values', () => {
		const game = createGame();

		expect(game.moveLog).toEqual([]);
		expect(game.randomSeed).not.toBeUndefined();
		expect(
			game.currentState.board
				.flat()
				.reduce((num, tile) => (tile ? num + 1 : num), 0),
		).toBe(2);
		expect(game.currentState.score).toBe(0);
		expect(game.currentState.totalTileCount).toBe(2);
	});

	it('move function executes move', () => {
		const game = createGame({ randomSeed: 1 });

		game.move(Direction.UP);

		expect(game.moveLog).toEqual([
			{ type: MoveType.STANDARD, direction: Direction.UP },
		]);
	});

	it('can create a game with non-standard board size', () => {
		const game = createGame({ boardMeta: { rows: 2, cols: 8 } });

		expect(game.currentState.board.length).toEqual(2);
		expect(game.currentState.board[0].length).toEqual(8);
	});

	it('creating a game with supplied game data (incl. move log) results in correct state', () => {
		const game = createGame(testGameData);

		expect(game.currentState.score).toEqual(1660);

		expect(game.currentState.totalTileCount).toEqual(92);

		expect(toNumberMatrix(game.currentState.board)).toEqual(
			testGameNumberMatrix,
		);

		expect(game.randomSeed).toEqual(testGameData.randomSeed);
		expect(game.moveLog).toEqual(testGameData.moveLog);
	});
});

export const testGameNumberMatrix = [
	[4, 0, 4, 0],
	[4, 0, 0, 0],
	[16, 256, 0, 0],
	[4, 16, 4, 0],
];

const testGameData: GameData = {
	boardMeta: { rows: 4, cols: 4 },
	randomSeed: 537805,
	moveLog: [
		{
			type: MoveType.STANDARD,
			direction: Direction.LEFT,
		},
		{
			type: MoveType.STANDARD,
			direction: Direction.LEFT,
		},
		{
			type: MoveType.STANDARD,
			direction: Direction.LEFT,
		},
		{
			type: MoveType.STANDARD,
			direction: Direction.LEFT,
		},
		{
			type: MoveType.STANDARD,
			direction: Direction.LEFT,
		},
		{
			type: MoveType.STANDARD,
			direction: Direction.UP,
		},
		{
			type: MoveType.STANDARD,
			direction: Direction.LEFT,
		},
		{
			type: MoveType.STANDARD,
			direction: Direction.UP,
		},
		{
			type: MoveType.STANDARD,
			direction: Direction.LEFT,
		},
		{
			type: MoveType.STANDARD,
			direction: Direction.UP,
		},
		{
			type: MoveType.STANDARD,
			direction: Direction.LEFT,
		},
		{
			type: MoveType.STANDARD,
			direction: Direction.UP,
		},
		{
			type: MoveType.STANDARD,
			direction: Direction.LEFT,
		},
		{
			type: MoveType.STANDARD,
			direction: Direction.UP,
		},
		{
			type: MoveType.STANDARD,
			direction: Direction.UP,
		},
		{
			type: MoveType.STANDARD,
			direction: Direction.LEFT,
		},
		{
			type: MoveType.STANDARD,
			direction: Direction.UP,
		},
		{
			type: MoveType.STANDARD,
			direction: Direction.LEFT,
		},
		{
			type: MoveType.STANDARD,
			direction: Direction.RIGHT,
		},
		{
			type: MoveType.STANDARD,
			direction: Direction.LEFT,
		},
		{
			type: MoveType.STANDARD,
			direction: Direction.LEFT,
		},
		{
			type: MoveType.STANDARD,
			direction: Direction.LEFT,
		},
		{
			type: MoveType.STANDARD,
			direction: Direction.LEFT,
		},
		{
			type: MoveType.STANDARD,
			direction: Direction.UP,
		},
		{
			type: MoveType.STANDARD,
			direction: Direction.UP,
		},
		{
			type: MoveType.STANDARD,
			direction: Direction.UP,
		},
		{
			type: MoveType.STANDARD,
			direction: Direction.LEFT,
		},
		{
			type: MoveType.STANDARD,
			direction: Direction.UP,
		},
		{
			type: MoveType.STANDARD,
			direction: Direction.LEFT,
		},
		{
			type: MoveType.STANDARD,
			direction: Direction.UP,
		},
		{
			type: MoveType.STANDARD,
			direction: Direction.LEFT,
		},
		{
			type: MoveType.STANDARD,
			direction: Direction.LEFT,
		},
		{
			type: MoveType.STANDARD,
			direction: Direction.UP,
		},
		{
			type: MoveType.STANDARD,
			direction: Direction.RIGHT,
		},
		{
			type: MoveType.STANDARD,
			direction: Direction.LEFT,
		},
		{
			type: MoveType.STANDARD,
			direction: Direction.RIGHT,
		},
		{
			type: MoveType.STANDARD,
			direction: Direction.LEFT,
		},
		{
			type: MoveType.STANDARD,
			direction: Direction.RIGHT,
		},
		{
			type: MoveType.STANDARD,
			direction: Direction.LEFT,
		},
		{
			type: MoveType.STANDARD,
			direction: Direction.RIGHT,
		},
		{
			type: MoveType.STANDARD,
			direction: Direction.LEFT,
		},
		{
			type: MoveType.STANDARD,
			direction: Direction.RIGHT,
		},
		{
			type: MoveType.STANDARD,
			direction: Direction.UP,
		},
		{
			type: MoveType.STANDARD,
			direction: Direction.LEFT,
		},
		{
			type: MoveType.STANDARD,
			direction: Direction.DOWN,
		},
		{
			type: MoveType.STANDARD,
			direction: Direction.RIGHT,
		},
		{
			type: MoveType.STANDARD,
			direction: Direction.LEFT,
		},
		{
			type: MoveType.STANDARD,
			direction: Direction.UP,
		},
		{
			type: MoveType.STANDARD,
			direction: Direction.RIGHT,
		},
		{
			type: MoveType.STANDARD,
			direction: Direction.DOWN,
		},
		{
			type: MoveType.STANDARD,
			direction: Direction.LEFT,
		},
		{
			type: MoveType.STANDARD,
			direction: Direction.UP,
		},
		{
			type: MoveType.STANDARD,
			direction: Direction.RIGHT,
		},
		{
			type: MoveType.STANDARD,
			direction: Direction.DOWN,
		},
		{
			type: MoveType.STANDARD,
			direction: Direction.LEFT,
		},
		{
			type: MoveType.STANDARD,
			direction: Direction.RIGHT,
		},
		{
			type: MoveType.STANDARD,
			direction: Direction.UP,
		},
		{
			type: MoveType.STANDARD,
			direction: Direction.LEFT,
		},
		{
			type: MoveType.STANDARD,
			direction: Direction.DOWN,
		},
		{
			type: MoveType.STANDARD,
			direction: Direction.UP,
		},
		{
			type: MoveType.STANDARD,
			direction: Direction.LEFT,
		},
		{
			type: MoveType.STANDARD,
			direction: Direction.RIGHT,
		},
		{
			type: MoveType.STANDARD,
			direction: Direction.UP,
		},
		{
			type: MoveType.STANDARD,
			direction: Direction.DOWN,
		},
		{
			type: MoveType.STANDARD,
			direction: Direction.LEFT,
		},
		{
			type: MoveType.STANDARD,
			direction: Direction.RIGHT,
		},
		{
			type: MoveType.STANDARD,
			direction: Direction.LEFT,
		},
		{
			type: MoveType.STANDARD,
			direction: Direction.RIGHT,
		},
		{
			type: MoveType.STANDARD,
			direction: Direction.LEFT,
		},
		{
			type: MoveType.STANDARD,
			direction: Direction.RIGHT,
		},
		{
			type: MoveType.STANDARD,
			direction: Direction.UP,
		},
		{
			type: MoveType.STANDARD,
			direction: Direction.LEFT,
		},
		{
			type: MoveType.STANDARD,
			direction: Direction.UP,
		},
		{
			type: MoveType.STANDARD,
			direction: Direction.RIGHT,
		},
		{
			type: MoveType.STANDARD,
			direction: Direction.LEFT,
		},
		{
			type: MoveType.STANDARD,
			direction: Direction.DOWN,
		},
		{
			type: MoveType.STANDARD,
			direction: Direction.RIGHT,
		},
		{
			type: MoveType.STANDARD,
			direction: Direction.UP,
		},
		{
			type: MoveType.STANDARD,
			direction: Direction.RIGHT,
		},
		{
			type: MoveType.STANDARD,
			direction: Direction.DOWN,
		},
		{
			type: MoveType.STANDARD,
			direction: Direction.LEFT,
		},
		{
			type: MoveType.STANDARD,
			direction: Direction.LEFT,
		},
		{
			type: MoveType.STANDARD,
			direction: Direction.UP,
		},
		{
			type: MoveType.STANDARD,
			direction: Direction.RIGHT,
		},
		{
			type: MoveType.STANDARD,
			direction: Direction.DOWN,
		},
		{
			type: MoveType.STANDARD,
			direction: Direction.LEFT,
		},
		{
			type: MoveType.STANDARD,
			direction: Direction.UP,
		},
		{
			type: MoveType.STANDARD,
			direction: Direction.RIGHT,
		},
		{
			type: MoveType.STANDARD,
			direction: Direction.DOWN,
		},
		{
			type: MoveType.STANDARD,
			direction: Direction.LEFT,
		},
	],
};
