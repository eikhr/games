import type { Direction, GameStateModifier } from '../types.js';
import mergeBoard from '../utils/mergeBoard.js';

const shiftAndMerge =
	(direction: Direction): GameStateModifier =>
	(gameState) => {
		const [newBoard, earnedScore] = mergeBoard(gameState.board, direction);
		return {
			...gameState,
			board: newBoard,
			score: gameState.score + earnedScore,
		};
	};

export default shiftAndMerge;
