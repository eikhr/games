import { useState } from 'preact/hooks';
import useGame from '../hooks/useGame.js';
import useKeydownDirectionListener from '../hooks/useKeydownDirectionListener.js';
import Board from './Board.js';
import Button from './Button/index.js';
import GameHeader from './GameHeader/index.js';

export const NormalGame = () => {
	const [gameId, setGameId] = useState(0);

	const game = useGame();
	useKeydownDirectionListener((direction) => game.move(direction));

	return (
		<div>
			{`${game.currentState.status.hasPossibleMoves}`}
			<GameHeader
				score={game.currentState.score}
				controls={
					<Button
						onClick={() => {
							setGameId(gameId + 1);
							game.reset();
						}}
					>
						New Game
					</Button>
				}
			/>
			<Board key={gameId} boardState={game.currentState.board} />
		</div>
	);
};
