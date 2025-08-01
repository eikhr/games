import type { GameState } from '../types.js';
import hasPossibleMoves from '../utils/hasPossibleMoves.js';

const updatePossibleMoves = ({
	status,
	...gameState
}: GameState): GameState => ({
	...gameState,
	status: {
		...status,
		hasPossibleMoves: hasPossibleMoves(gameState.board),
	},
});

export default updatePossibleMoves;
