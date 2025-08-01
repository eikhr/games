import { type Board, Direction } from '2048-logic';
import type { ComponentChildren, FunctionComponent } from 'preact';
import { useSwipeable } from 'react-swipeable';
import { usePrevious } from '../../hooks/usePrevious.js';
import getTileData from '../../utils/getTileData.js';
import styles from './Board.module.css';
import { EmptyTile, Tile } from './Tile.js';

interface Props {
	boardState: Board;
	overlay: ComponentChildren;
	onSwipe?: (direction: Direction) => void;
}

const swipeDirectionMap = {
	Up: Direction.UP,
	Down: Direction.DOWN,
	Left: Direction.LEFT,
	Right: Direction.RIGHT,
};

export const BoardComponent: FunctionComponent<Props> = ({
	boardState,
	overlay,
	onSwipe,
}) => {
	const previousBoardState = usePrevious(boardState);
	const tileData = getTileData(boardState, previousBoardState);

	const rows = boardState.length;
	const cols = boardState[0].length;
	const tileWidth = `${100 / cols}%`;
	const tileHeight = `${100 / rows}%`;

	const swipeHandlers = useSwipeable({
		onSwiping: (eventData) => onSwipe?.(swipeDirectionMap[eventData.dir]),
		preventScrollOnSwipe: true,
	});

	return (
		<div
			className={styles.container}
			style={{
				aspectRatio: `${rows} / ${cols}`,
				'--tile-width': tileWidth,
				'--tile-height': tileHeight,
			}}
			{...swipeHandlers}
		>
			{overlay && <div className={styles.overlay}>{overlay}</div>}
			<div className={styles.board}>
				{
					/* Render empty tiles for the board */
					Array.from({ length: rows }).flatMap((_, rowIndex) =>
						Array.from({ length: cols }).map((_, colIndex) => (
							<EmptyTile
								key={`empty-${rowIndex}-${
									// biome-ignore lint/suspicious/noArrayIndexKey: these will never change
									colIndex
								}`}
								row={rowIndex}
								col={colIndex}
								tileHeight={tileHeight}
								tileWidth={tileWidth}
							/>
						)),
					)
				}
				{tileData.map((tile) => (
					<Tile
						key={tile.id}
						data={tile}
						tileHeight={tileHeight}
						tileWidth={tileWidth}
					/>
				))}
			</div>
		</div>
	);
};
