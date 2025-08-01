import { describe, expect, it } from 'vitest';
import mergeRow from './mergeRow.js';

describe('mergeRow', () => {
	it('moves tiles to beginning of row', () => {
		const tile = { id: 1, value: 2 };

		const row = [null, null, tile, null];

		const [newRow, score] = mergeRow(row);

		expect(row).toEqual([null, null, tile, null]);
		expect(newRow).toEqual([tile, null, null, null]);
		expect(score).toEqual(0);
	});

	it('should merge two tiles', () => {
		const tile1 = { id: 1, value: 2 };
		const tile2 = { id: 2, value: 2 };

		const row = [null, null, tile1, tile2];

		const [newRow, score] = mergeRow(row);

		expect(row).toEqual([null, null, tile1, tile2]);
		expect(newRow).toEqual([
			{ id: 1, mergedId: 2, value: 4 },
			null,
			null,
			null,
		]);
		expect(score).toEqual(4);
	});

	it('should merge two tiles and move another', () => {
		const tile1 = { id: 1, value: 2 };
		const tile2 = { id: 2, value: 2 };
		const tile3 = { id: 3, value: 16 };

		const row = [null, tile1, tile2, tile3];

		const [newRow, score] = mergeRow(row);

		expect(row).toEqual([null, tile1, tile2, tile3]);
		expect(newRow).toEqual([
			{ id: 1, mergedId: 2, value: 4 },
			tile3,
			null,
			null,
		]);
		expect(score).toEqual(4);
	});

	it('should merge two sets of two tiles', () => {
		const tile1 = { id: 1, value: 2 };
		const tile2 = { id: 2, value: 2 };
		const tile3 = { id: 3, value: 16 };
		const tile4 = { id: 4, value: 16 };

		const row = [tile1, tile2, tile3, tile4];

		const [newRow, score] = mergeRow(row);

		expect(row).toEqual([tile1, tile2, tile3, tile4]);
		expect(newRow).toEqual([
			{ id: 1, mergedId: 2, value: 4 },
			{ id: 3, mergedId: 4, value: 32 },
			null,
			null,
		]);
		expect(score).toEqual(36);
	});

	it('should not merge tile into newly created (merged) tile', () => {
		const tile1 = { id: 1, value: 8 };
		const tile2 = { id: 2, value: 8 };
		const tile3 = { id: 3, value: 16 };

		const row = [tile1, tile2, tile3, null];

		const [newRow, score] = mergeRow(row);

		expect(row).toEqual([tile1, tile2, tile3, null]);
		expect(newRow).toEqual([
			{ id: 1, mergedId: 2, value: 16 },
			{ id: 3, value: 16 },
			null,
			null,
		]);
		expect(score).toEqual(16);
	});

	it('should merge four equal tiles', () => {
		const tile1 = { id: 1, value: 2 };
		const tile2 = { id: 2, value: 2 };
		const tile3 = { id: 3, value: 2 };
		const tile4 = { id: 4, value: 2 };

		const row = [tile1, tile2, tile3, tile4];

		const [newRow, score] = mergeRow(row);

		expect(row).toEqual([tile1, tile2, tile3, tile4]);
		expect(newRow).toEqual([
			{ id: 1, mergedId: 2, value: 4 },
			{ id: 3, mergedId: 4, value: 4 },
			null,
			null,
		]);
		expect(score).toEqual(8);
	});

	it('should not merge the same tile twice', () => {
		const tile1 = { id: 1, value: 4 };
		const tile2 = { id: 2, value: 2 };
		const tile3 = { id: 3, value: 2 };

		const row = [tile1, tile2, tile3, null];

		const [newRow, score] = mergeRow(row);

		expect(row).toEqual([tile1, tile2, tile3, null]);
		expect(newRow).toEqual([
			{ id: 1, value: 4 },
			{ id: 2, mergedId: 3, value: 4 },
			null,
			null,
		]);
		expect(score).toEqual(4);
	});
});
