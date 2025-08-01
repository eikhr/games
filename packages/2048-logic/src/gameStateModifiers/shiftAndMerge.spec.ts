import { describe, expect, it } from 'vitest';
import { Direction, type GameState } from '../types.js';
import { fromNumberMatrix, toNumberMatrix } from '../utils/numberMatrix.js';
import shiftAndMerge from './shiftAndMerge.js';

describe('shiftAndMerge', () => {
	const board = fromNumberMatrix([
		[2, 0, 4, 0],
		[2, 0, 4, 0],
		[0, 0, 0, 0],
		[2, 0, 0, 0],
	]);

	const initialState: GameState = {
		status: {
			hasPossibleMoves: true,
			isWon: false,
		},
		score: 4,
		board,
	};

	it('should shift and merge tiles', () => {
		const { board } = shiftAndMerge(Direction.UP)(initialState);

		expect(toNumberMatrix(board)).toEqual([
			[4, 0, 8, 0],
			[2, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
		]);
	});

	it('should update score', () => {
		const { score } = shiftAndMerge(Direction.UP)(initialState);

		expect(score).toEqual(16);
	});
});
