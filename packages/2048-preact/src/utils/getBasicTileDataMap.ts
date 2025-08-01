import type { Board } from '2048-logic';
import type { BaseTileData } from './getTileData.js';

const getBasicTileDataMap = (board: Board): Map<number, BaseTileData> => {
	const tileDataMap = new Map<number, BaseTileData>();

	for (let row = 0; row < board.length; row++) {
		for (let col = 0; col < board[row].length; col++) {
			const tile = board[row][col];
			if (tile !== null) {
				tileDataMap.set(tile.id, {
					value: tile.value,
					position: { row, col },
				});
			}
		}
	}

	return tileDataMap;
};

export default getBasicTileDataMap;
