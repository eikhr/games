import type { Board } from '2048-logic';
import type { TileData } from '../boardTypes.js';
import getBasicTileDataMap from './getBasicTileDataMap.js';

const getTileData = (board: Board, prevBoard?: Board): TileData[] => {
	const prevTileDataMap = prevBoard
		? getBasicTileDataMap(prevBoard)
		: new Map();

	const tileData: TileData[] = [];
	for (let row = 0; row < board.length; row++) {
		for (let col = 0; col < board[row].length; col++) {
			const tile = board[row][col];
			if (tile) {
				const prevTileData = prevTileDataMap.get(tile.id);
				tileData.push({
					ghost: false,
					id: tile.id,
					value: tile.value,
					position: { row, col },
					previousValue: prevTileData?.value,
					previousPosition: prevTileData?.position,
				});
				if (tile.mergedId) {
					const ghostPrevData = prevTileDataMap.get(tile.mergedId);
					if (ghostPrevData) {
						tileData.push({
							ghost: true,
							id: tile.mergedId,
							value: ghostPrevData.value,
							previousValue: ghostPrevData.value,
							position: { row, col },
							previousPosition: ghostPrevData.position,
						});
					}
				}
			}
		}
	}

	return tileData;
};

export default getTileData;
