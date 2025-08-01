import { describe, expect, it } from 'vitest';
import getHighestTileValue from './getHighestTileValue.js';
import { fromNumberMatrix } from './numberMatrix.js';

describe('getHighestTileValue', () => {
	it('should return the highest tile value', () => {
		const board = fromNumberMatrix([
			[2, 0, 4, 0],
			[2, 32, 4, 0],
			[0, 0, 128, 0],
			[2, 4, 0, 0],
		]);

		const highestTileValue = getHighestTileValue(board);

		expect(highestTileValue).toBe(128);
	});

	it('should return 0 if no tiles exist', () => {
		const board = fromNumberMatrix([
			[0, 0],
			[0, 0],
		]);

		const highestTileValue = getHighestTileValue(board);

		expect(highestTileValue).toBe(0);
	});
});
