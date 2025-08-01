import type { BoardMeta, Position } from '../../boardTypes.js';

const setTilePosition = (
	tile: HTMLElement,
	position: Position,
	boardMeta: BoardMeta,
): void => {
	tile.style.top = `${(position.row * 100) / boardMeta.rows}%`;
	tile.style.left = `${(position.col * 100) / boardMeta.cols}%`;
};

export default setTilePosition;
