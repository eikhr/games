import createGame from './createGame.js';
import mergeBoard from './utils/mergeBoard.js';

export type {
	Board,
	Game,
	GameData,
	GameState,
	Move,
	Tile,
} from './types.js';
export { Direction } from './types.js';

export { createGame, mergeBoard };
