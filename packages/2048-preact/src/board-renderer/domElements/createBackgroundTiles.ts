import type { BoardMeta } from '../boardTypes.js';
import newBackgroundTile from './tile/newBackgroundTile.js';

const createBackgroundTiles = (boardMeta: BoardMeta): HTMLElement[] => {
	const tiles = [];

	for (let row = 0; row < boardMeta.rows; row++) {
		for (let col = 0; col < boardMeta.cols; col++) {
			tiles.push(newBackgroundTile({ row, col }, boardMeta));
		}
	}

	return tiles;
};

export default createBackgroundTiles;
