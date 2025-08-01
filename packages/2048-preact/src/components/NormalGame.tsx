import cx from 'classnames';
import { useEffect, useState } from 'preact/hooks';
import useGame from '../hooks/useGame.js';
import useKeydownDirectionListener from '../hooks/useKeydownDirectionListener.js';
import { useLocalStorageState } from '../hooks/useLocalStorageState.js';
import { BoardComponent } from './Board/Board.js';
import Button from './Button/index.js';
import GameHeader from './GameHeader/index.js';
import styles from './NormalGame.module.css';

export const NormalGame = () => {
	const [gameId, setGameId] = useState(0);
	const [keepPlaying, setKeepPlaying] = useState(false);
	const [highScore, setHighScore] = useLocalStorageState('2048-high-score', 0);

	const game = useGame();
	useKeydownDirectionListener((direction) => game.move(direction));
	const resetGame = () => {
		setGameId(gameId + 1);
		setKeepPlaying(false);
		game.reset();
	};

	useEffect(() => {
		if (game.currentState.score > highScore) {
			setHighScore(game.currentState.score);
		}
	}, [game.currentState.score, highScore, setHighScore]);

	return (
		<div>
			<GameHeader
				score={game.currentState.score}
				highScore={highScore}
				controls={<Button onClick={resetGame}>New Game</Button>}
			/>
			<BoardComponent
				key={gameId}
				boardState={game.currentState.board}
				overlay={
					game.currentState.status.isWon && !keepPlaying ? (
						<WinOverlay
							resetGame={resetGame}
							keepPlaying={() => setKeepPlaying(true)}
						/>
					) : !game.currentState.status.hasPossibleMoves ? (
						<LoseOverlay resetGame={resetGame} />
					) : undefined
				}
				onSwipe={game.move}
			/>
		</div>
	);
};

const WinOverlay = ({
	resetGame,
	keepPlaying,
}: {
	resetGame: () => void;
	keepPlaying: () => void;
}) => {
	return (
		<div className={cx(styles.overlay, styles.win)}>
			<h1>Congratulations!</h1>
			<p>You reached 2048!</p>
			<Button variant="yellow" onClick={keepPlaying}>
				Keep Playing
			</Button>
			<Button variant="secondary" onClick={resetGame}>
				Restart
			</Button>
		</div>
	);
};

const LoseOverlay = ({ resetGame }: { resetGame: () => void }) => {
	return (
		<div className={cx(styles.overlay, styles.lose)}>
			<h1>Game Over</h1>
			<p>No more moves available.</p>
			<Button onClick={resetGame}>New Game</Button>
		</div>
	);
};
