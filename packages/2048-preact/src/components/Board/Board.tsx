import { type Board, Direction, mergeBoard } from '2048-logic';
import cx from 'classnames';
import {
	ChevronDown,
	ChevronLeft,
	ChevronRight,
	ChevronUp,
} from 'lucide-react';
import type { ComponentChildren, FunctionComponent } from 'preact';
import { useMemo, useRef, useState } from 'preact/hooks';
import { type SwipeEventData, useSwipeable } from 'react-swipeable';
import { usePrevious } from '../../hooks/usePrevious.js';
import getTileData, { type TileData } from '../../utils/getTileData.js';
import styles from './Board.module.css';
import { EmptyTile, Tile } from './Tile.js';

interface Props {
	boardState: Board;
	overlay: ComponentChildren;
	onSwipe?: (direction: Direction) => void;
}

export interface OngoingSwipe {
	dir: Direction;
	offsetX: string;
	offsetY: string;
	minX: string;
	minY: string;
	maxX: string;
	maxY: string;
}

const swipeDirectionMap = {
	Up: Direction.UP,
	Down: Direction.DOWN,
	Left: Direction.LEFT,
	Right: Direction.RIGHT,
};

const directionIcon = {
	[Direction.UP]: <ChevronUp />,
	[Direction.DOWN]: <ChevronDown />,
	[Direction.LEFT]: <ChevronLeft />,
	[Direction.RIGHT]: <ChevronRight />,
};

export const BoardComponent: FunctionComponent<Props> = ({
	boardState,
	overlay,
	onSwipe,
}) => {
	const ref = useRef<HTMLDivElement>(null);
	const [currentSwipeDir, setCurrentSwipeDir] = useState<Direction>();
	const [currentSwipe, setCurrentSwipe] = useState<SwipeEventData>();
	const previousBoardState = usePrevious(boardState);
	const tileData = getTileData(boardState, previousBoardState);

	const rows = boardState.length;
	const cols = boardState[0].length;
	const tileWidth = `${100 / cols}%`;
	const tileHeight = `${100 / rows}%`;

	const currentSwipeMergedBoardData = useMemo(() => {
		if (currentSwipeDir) {
			const mergedBoard = mergeBoard(boardState, currentSwipeDir)[0];
			return getTileData(mergedBoard, boardState);
		}
	}, [currentSwipeDir, boardState]);

	const swipeHandlers = useSwipeable({
		onSwipeStart: (eventData) => {
			setCurrentSwipeDir(swipeDirectionMap[eventData.dir]);
			setCurrentSwipe(eventData);
		},
		onSwiping: (eventData) => {
			setCurrentSwipe(eventData);
		},
		onTouchEndOrOnMouseUp: () => {
			if (
				currentSwipe &&
				onSwipe &&
				(currentSwipe.velocity > 0.5 ||
					(currentSwipeDir === Direction.UP && currentSwipe.deltaY < -50) ||
					(currentSwipeDir === Direction.DOWN && currentSwipe.deltaY > 50) ||
					(currentSwipeDir === Direction.LEFT && currentSwipe.deltaX < -50) ||
					(currentSwipeDir === Direction.RIGHT && currentSwipe.deltaX > 50))
			) {
				if (currentSwipeDir) {
					onSwipe(currentSwipeDir);
				}
			}
			setCurrentSwipeDir(undefined);
			setCurrentSwipe(undefined);
		},
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
			{currentSwipe &&
				((currentSwipeDir === Direction.UP && currentSwipe.deltaY < -50) ||
					(currentSwipeDir === Direction.DOWN && currentSwipe.deltaY > 50) ||
					(currentSwipeDir === Direction.LEFT && currentSwipe.deltaX < -50) ||
					(currentSwipeDir === Direction.RIGHT &&
						currentSwipe.deltaX > 50)) && (
					<div className={cx(styles.overlay, styles.swipeHintOverlay)}>
						<div className={styles.swipeHint}>
							{directionIcon[currentSwipeDir]}
						</div>
					</div>
				)}
			<div ref={ref} className={styles.board}>
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
						ongoingSwipe={
							currentSwipeDir &&
							currentSwipe &&
							currentSwipeMergedBoardData &&
							calculateOngoingSwipeData(
								currentSwipeDir,
								currentSwipe,
								tile,
								currentSwipeMergedBoardData.find((t) => t.id === tile.id),
								rows,
								cols,
								ref.current?.clientWidth || 0,
								ref.current?.clientHeight || 0,
								tileWidth,
								tileHeight,
							)
						}
					/>
				))}
			</div>
		</div>
	);
};

const calculateOngoingSwipeData = (
	currentSwipeDir: Direction,
	currentSwipe: SwipeEventData,
	tile: TileData,
	tileAfterMerge: TileData | undefined,
	rows: number,
	cols: number,
	boardWidth: number,
	boardHeight: number,
	tileWidth: string,
	tileHeight: string,
): OngoingSwipe | undefined => {
	let maxRow = tile.position.row,
		minRow = tile.position.row,
		maxCol = tile.position.col,
		minCol = tile.position.col;

	switch (currentSwipeDir) {
		case Direction.UP: {
			minRow = tileAfterMerge?.position.row ?? tile.position.row;
			break;
		}
		case Direction.DOWN: {
			maxRow = tileAfterMerge?.position.row ?? tile.position.row;
			break;
		}
		case Direction.LEFT: {
			minCol = tileAfterMerge?.position.col ?? tile.position.col;
			break;
		}
		case Direction.RIGHT: {
			maxCol = tileAfterMerge?.position.col ?? tile.position.col;
			break;
		}
	}

	const offsetY = `${(currentSwipe.deltaY * 100) / boardHeight}%`;
	const offsetX = `${(currentSwipe.deltaX * 100) / boardWidth}%`;

	const minY = `calc(${minRow} * ${tileHeight})`;
	const maxY = `calc(100% - ${tileHeight} * ${rows - maxRow})`;
	const minX = `calc(${minCol} * ${tileWidth})`;
	const maxX = `calc(100% - ${tileWidth} * ${cols - maxCol})`;

	return {
		dir: currentSwipeDir,
		offsetX,
		offsetY,
		minX,
		minY,
		maxX,
		maxY,
	};
};
