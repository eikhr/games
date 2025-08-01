import addRandomTile from './gameStateModifiers/addRandomTile.js';
import shiftAndMerge from './gameStateModifiers/shiftAndMerge.js';
import updatePossibleMoves from './gameStateModifiers/updatePossibleMoves.js';
import updateWonStatus from './gameStateModifiers/updateWonStatus.js';
import { type Game, type GameState, type Move, MoveType } from './types.js';
import compareBoards from './utils/compareBoards.js';
import pipe from './utils/pipe.js';

const updateStatus = pipe(updatePossibleMoves, updateWonStatus);

// executes a move in the game, returns the new state and updates game.currentState
const dispatchMove = (game: Game, move: Move): GameState => {
	let newState: GameState;

	switch (move.type) {
		case MoveType.STANDARD: {
			const { direction } = move;

			const intermediateState = shiftAndMerge(direction)(game.currentState);
			if (compareBoards(intermediateState.board, game.currentState.board)) {
				return game.currentState;
			}

			newState = addRandomTile(intermediateState);
			break;
		}
		case MoveType.BONUS: {
			throw new Error('Bonus moves are not implemented yet');
		}
	}

	newState = updateStatus(newState);

	game.moveLog.push(move);
	game.currentState = newState;
	return newState;
};

export default dispatchMove;
