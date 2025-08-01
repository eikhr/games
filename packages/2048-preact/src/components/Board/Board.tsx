import type { Board } from '2048-logic';
import type { ComponentChildren, FunctionComponent } from 'preact';
import { usePrevious } from '../../hooks/usePrevious.js';
import getTileData from '../../utils/getTileData.js';
import styles from './Board.module.css';
import { EmptyTile, Tile } from './Tile.js';

interface Props {
	boardState: Board;
	overlay: ComponentChildren;
}

export const BoardComponent: FunctionComponent<Props> = ({
	boardState,
	overlay,
}) => {
	const previousBoardState = usePrevious(boardState);
	const tileData = getTileData(boardState, previousBoardState);

	const rows = boardState.length;
	const cols = boardState[0].length;
	const tileWidth = `${100 / cols}%`;
	const tileHeight = `${100 / rows}%`;

	return (
		<div
			className={styles.container}
			style={{
				aspectRatio: `${rows} / ${cols}`,
				'--tile-width': tileWidth,
				'--tile-height': tileHeight,
			}}
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
