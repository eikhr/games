import type { GameState } from '../types.js';
import getHighestTileValue from '../utils/getHighestTileValue.js';

const updateWonStatus = ({ status, ...gameState }: GameState): GameState => ({
	...gameState,
	status: {
		...status,
		isWon: getHighestTileValue(gameState.board) >= 2048,
	},
});

export default updateWonStatus;
