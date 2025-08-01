import type { Board } from '2048-logic';
import type { BoardMeta } from './boardTypes.js';
import newGameContainer from './domElements/newGameContainer.js';
import createTiles from './utils/createTiles.js';

interface GameBoard {
	htmlElement: HTMLElement;
	update: (newBoard: Board) => void;
}

const createBoard = (board: Board): GameBoard => {
	const boardMeta: BoardMeta = {
		rows: board.length,
		cols: board[0].length,
	};

	const gameContainer = newGameContainer(boardMeta);
	gameContainer.addTiles(createTiles(boardMeta, board));

	let currentBoard = board;

	const update = (newBoard: Board) => {
		gameContainer.clearTiles();
		gameContainer.addTiles(createTiles(boardMeta, newBoard, currentBoard));
		currentBoard = newBoard;
	};

	return { htmlElement: gameContainer.rootElement, update };
};

export default createBoard;
