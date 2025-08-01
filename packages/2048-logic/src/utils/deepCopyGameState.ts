import type { GameState, MutableGameState } from '../types.js';

const deepCopyGameState = (gameState: GameState): MutableGameState => {
	return {
		...gameState,
		score: gameState.score,
		board: gameState.board.map((row) => row.slice()),
		rngNumber: gameState.rngNumber,
	};
};

export default deepCopyGameState;
