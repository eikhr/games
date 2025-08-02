import cx from 'classnames';
import type { JSX } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import type { TileData } from '../../utils/getTileData.js';
import type { OngoingSwipe } from './Board.js';
import styles from './Board.module.css';

type Props = {
	data: TileData;
	tileHeight: string;
	tileWidth: string;
	ongoingSwipe?: OngoingSwipe;
};

export const Tile = ({ data, tileHeight, tileWidth, ongoingSwipe }: Props) => {
	const [animating, setAnimating] = useState(false);
	const prevTop = `calc(${tileHeight} * ${(data.previousPosition ?? data.position).row})`;
	const prevLeft = `calc(${tileWidth} * ${(data.previousPosition ?? data.position).col})`;
	const currentTop = `calc(${tileHeight} * ${data.position.row})`;
	const currentLeft = `calc(${tileWidth} * ${data.position.col})`;
	const isNew = !data.previousPosition;

	const ref = useRef<HTMLDivElement>(null);
	const [shownValue, setShownValue] = useState(
		data.previousValue ?? data.value,
	);
	const [style, setStyle] = useState<JSX.HTMLAttributes['style']>({
		animation: isNew ? undefined : 'none',
		transition: '',
		top: prevTop,
		left: prevLeft,
	});

	useEffect(() => {
		if (!ongoingSwipe) {
			setStyle({
				transition: 'top 0.2s ease, left 0.2s ease',
				top: currentTop,
				left: currentLeft,
			});
			return;
		}
		setStyle({
			animation: 'none',
			top: `clamp(${ongoingSwipe.minY}, calc(${currentTop} + ${ongoingSwipe.offsetY ?? '0'}), ${ongoingSwipe.maxY})`,
			left: `clamp(${ongoingSwipe.minX}, calc(${currentLeft} + ${ongoingSwipe.offsetX ?? '0'}), ${ongoingSwipe.maxX})`,
		});
	}, [
		ongoingSwipe?.minY,
		ongoingSwipe?.minX,
		ongoingSwipe?.maxY,
		ongoingSwipe?.maxX,
		ongoingSwipe?.offsetY,
		ongoingSwipe?.offsetX,
		prevTop,
		prevLeft,
	]);

	useEffect(() => {
		// snap to the previous position if old animation is still running
		if (animating) {
			setAnimating(false);
			setStyle({
				animation: isNew ? undefined : 'none',
				transition: '',
				top: prevTop,
				left: prevLeft,
			});
		}

		// then animate to the new position
		requestAnimationFrame(() => {
			setAnimating(true);
			setStyle({
				transition: 'top 0.2s ease, left 0.2s ease',
				top: currentTop,
				left: currentLeft,
			});
		});

		const timeout = setTimeout(() => {
			setAnimating(false);
		}, 300);
		return () => clearTimeout(timeout);
	}, [data.position.col, data.position.row]);

	useEffect(() => {
		setTimeout(() => {
			setShownValue(data.value);
		}, 100);
	}, [data.value]);

	return (
		<div
			ref={ref}
			className={cx(
				styles.tile,
				styles[`value_${shownValue}` as 'value_2048'],
				data.ghost && styles.ghost,
				isNew && styles.new,
				data.previousValue &&
					data.value !== data.previousValue &&
					styles.merged,
			)}
			style={style}
		>
			<div>{shownValue}</div>
		</div>
	);
};

type EmptyTileProps = {
	row: number;
	col: number;
	tileHeight: string;
	tileWidth: string;
};

export const EmptyTile = ({
	row,
	col,
	tileHeight,
	tileWidth,
}: EmptyTileProps) => (
	<div
		className={cx(styles.tile, styles.empty)}
		style={{
			top: `calc(${tileHeight} * ${row})`,
			left: `calc(${tileWidth} * ${col})`,
		}}
	>
		<div />
	</div>
);
