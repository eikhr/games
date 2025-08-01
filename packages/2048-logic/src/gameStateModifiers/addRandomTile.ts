import type { GameStateModifier } from '../types.js';
import createRandomTile from '../utils/createRandomTile.js';
import deepCopyGameState from '../utils/deepCopyGameState.js';
import getEmptyTileCoords from '../utils/getEmptyTileCoords.js';
import getRng from '../utils/getRng.js';

const addRandomTile: GameStateModifier = (gameState) => {
	const newState = deepCopyGameState(gameState);

	const emptyTileCoords = getEmptyTileCoords(newState.board);

	if (!emptyTileCoords.length) throw new Error('No empty tiles');

	const rng = getRng(newState);
	const randomCoordinate =
		emptyTileCoords[rng.intBetween(0, emptyTileCoords.length - 1)];

	newState.board[randomCoordinate[0]][randomCoordinate[1]] =
		createRandomTile(newState);

	return newState;
};

export default addRandomTile;
