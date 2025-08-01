import type { BoardMeta, Position } from '../../boardTypes.js';
import baseTileElements from './baseTileElements.js';

const newBackgroundTile = (
	position: Position,
	boardMeta: BoardMeta,
): HTMLElement => {
	const { tileContainer, tileElement } = baseTileElements(position, boardMeta);

	tileElement.style.backgroundColor = 'rgba(238, 228, 218, 0.35)';

	return tileContainer;
};

export default newBackgroundTile;
