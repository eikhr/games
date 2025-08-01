import type { MutableGameState, Tile } from '../types.js';
import getRng from './getRng.js';

const createRandomTile = (gameState: MutableGameState): Tile => {
	if (!gameState.totalTileCount) {
		gameState.totalTileCount = 0;
	}

	const rng = getRng(gameState);

	return {
		value: rng.intBetween(1, 2) * 2,
		id: gameState.totalTileCount++,
	};
};

export default createRandomTile;
