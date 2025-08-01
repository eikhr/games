import type { Board } from '2048-logic';
import type { BoardMeta } from '../boardTypes.js';
import newTileElement from '../domElements/tile/newTileElement.js';
import getTileData from './getTileData.js';

const createTiles = (
	boardMeta: BoardMeta,
	board: Board,
	prevBoard?: Board,
): HTMLElement[] =>
	getTileData(board, prevBoard).map((tile) => newTileElement(tile, boardMeta));

export default createTiles;
