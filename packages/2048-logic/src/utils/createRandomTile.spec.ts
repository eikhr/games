import { describe, expect, it } from 'vitest';
import type { GameState } from '../types.js';
import createRandomTile from './createRandomTile.js';
import deepCopyGameState from './deepCopyGameState.js';
import { fromNumberMatrix } from './numberMatrix.js';

describe('createRandomTile', () => {
	const gameState: GameState = {
		status: {
			hasPossibleMoves: true,
			isWon: false,
		},
		board: fromNumberMatrix([
			[2, 0],
			[0, 0],
		]),
		score: 0,
		totalTileCount: 0,
	};

	it('returns a valid tile', () => {
		const state = deepCopyGameState(gameState);

		const tile = createRandomTile(state);

		expect([2, 4]).toContain(tile.value);
		expect(tile.id).toBe(0);
	});

	it('gives each tile a unique id', () => {
		const state = deepCopyGameState(gameState);

		const ids = [];
		for (let i = 0; i < 10; i++) {
			const tile = createRandomTile(state);
			expect(ids).not.toContain(tile.id);
			ids.push(tile.id);
		}
	});

	it('is deterministic given a random-seed', () => {
		const state = deepCopyGameState(gameState);

		state.rngNumber = 1000;

		const assertNextTileValue = (expectedValue: number) => {
			const tile = createRandomTile(state);

			expect(tile.value).toBe(expectedValue);
		};

		assertNextTileValue(2);
		assertNextTileValue(2);
		assertNextTileValue(2);
		assertNextTileValue(4);
		assertNextTileValue(2);
		assertNextTileValue(4);
		assertNextTileValue(4);
		assertNextTileValue(2);
		assertNextTileValue(4);
	});
});
