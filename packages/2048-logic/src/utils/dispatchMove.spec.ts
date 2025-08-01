import { describe, expect, it } from 'vitest';
import createGame from '../createGame.js';
import dispatchMove from '../dispatchMove.js';
import { Direction, MoveType } from '../types.js';
import { toNumberMatrix } from './numberMatrix.js';

describe('dispatchMove', () => {
	it('should execute a dispatched move', () => {
		const game = createGame({
			randomSeed: 1,
		});

		// initial board is
		//   [0, 0, 2, 0],
		//   [0, 0, 0, 0],
		//   [0, 0, 0, 0],
		//   [0, 0, 0, 4],

		const move = {
			type: MoveType.STANDARD,
			direction: Direction.LEFT,
		};
		const { board, score } = dispatchMove(game, move);

		expect(toNumberMatrix(board)).toEqual([
			[2, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 2, 0, 0],
			[4, 0, 0, 0],
		]);

		expect(score).toBe(0);
		expect(game.moveLog).toEqual([move]);
	});

	it('should ignore an invalid standard move', () => {
		const game = createGame({
			randomSeed: 2,
		});

		// initial board is
		//   [0, 0, 0, 0],
		//   [0, 0, 0, 4],
		//   [0, 0, 0, 2],
		//   [0, 0, 0, 0],

		const move = {
			type: MoveType.STANDARD,
			direction: Direction.RIGHT,
		};
		const { board, score } = dispatchMove(game, move);

		expect(toNumberMatrix(board)).toEqual([
			[0, 0, 0, 0],
			[0, 0, 0, 4],
			[0, 0, 0, 2],
			[0, 0, 0, 0],
		]);

		expect(score).toBe(0);
		expect(game.moveLog).toEqual([]);
	});
});
